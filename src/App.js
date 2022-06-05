import * as React from "react";
import extensible from "./ExtensibleHOC";
import Extensible from "./Extensible";

const Title = extensible(({ children }) => <h1>{children}</h1>);

function Message({ onRenderMessage, customMessage }) {
  // Method 1 - HOC
  return (
    <Title onRenderItems={onRenderMessage}>{customMessage || "World"}.</Title>
  );

  // Method 2 - Wrapper
  // return (
  //   <h1>
  //     <Extensible onRenderItems={onRenderMessage}>World</Extensible>
  //   </h1>
  // );
}

export default function App() {
  const onRenderMessage = ({ items }) => {
    const [message, ...rest] = items;
    return [
      "Hello ",
      message.toUpperCase() + "!",
      <span role="img" aria-label="hello-world">
        👋🌎
      </span>,
      ...rest
    ];

    //Different way to return the same (jsx):
    // return (
    //   <>
    //     {"Hello "}
    //     {message.toUpperCase() + "!"}
    //     <span role="img" aria-label="hello-world">
    //       👋🌎
    //     </span>{" "}
    //     {[...rest]}
    //   </>
    // );
  };
  return <Message onRenderMessage={onRenderMessage} customMessage="Earth" />;
}
