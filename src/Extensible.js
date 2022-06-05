import * as React from "react";

export default function Extensible({ onRenderItems = () => null, children }) {
  const extractComponent = React.useCallback((item, key) => {
    if (item.Component) {
      const { Component, props } = item;
      return <Component key={Component?.name || key} {...props} />;
    }
    if (!!item.type || typeof item === "string") {
      return <React.Fragment key={key}>{item}</React.Fragment>;
    }
    if (typeof item === "function") {
      const Component = item;
      return <Component key={Component?.name || key} />;
    }
    return null;
  }, []);

  const extractItems = React.useCallback(
    (items) => {
      if (!items) return null;
      if (Array.isArray(items)) {
        return items.map((item, key) => extractComponent(item, key));
      }
      if (items && typeof items === "object") {
        return items;
      }
    },
    [extractComponent]
  );

  const packItem = React.useCallback((item) => {
    if (item.type) {
      return {
        Component: item.type,
        props: item?.props || {}
      };
    }
    if (typeof item === "function") {
      return {
        Component: item,
        props: {}
      };
    }
    if (typeof item === "string") {
      return item;
    }
  }, []);

  const packItems = React.useCallback(
    (items) =>
      Array.isArray(items)
        ? items.map((item) => packItem(item))
        : [packItem(items)],
    [packItem]
  );

  const defaultItems = packItems(children);

  const renderItems = React.useCallback(
    (items) => {
      const customItems = extractItems(onRenderItems({ items: defaultItems }));
      return customItems || items;
    },
    [defaultItems, extractItems, onRenderItems]
  );

  return renderItems(children);
}
