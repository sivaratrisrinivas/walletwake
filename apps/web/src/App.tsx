import { MessageThreadFull } from "./components/tambo/message-thread-full";

export default function App() {
  return (
    <div className="ww-app">
      <MessageThreadFull className="ww-chat" contextKey="walletwake-local" />
    </div>
  );
}
