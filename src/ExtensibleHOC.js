import Extensible from "./Extensible";

export default function extensible(WrappedComponent) {
  const Extended = ({ onRenderItems, children, ...props }) => {
    return (
      <WrappedComponent {...props}>
        <Extensible onRenderItems={onRenderItems}>{children}</Extensible>
      </WrappedComponent>
    );
  };
  return Extended;
}
