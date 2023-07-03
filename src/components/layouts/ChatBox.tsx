import * as React from "react";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";
import "@yext/chat-ui-react/bundle.css";

const ChatBox = () => {
  return (
    <>
      <ChatHeadlessProvider
        config={{
          apiKey: "583871cbb80a26421961c0ed13b34350",
          botId: "chit-chat",
          saveToSessionStorage: false,
          apiDomain: "sbx-cdn.yextapis.com",
          
        }}
      >
        <ChatPopUp 
        title="How can we help you ?"
        showRestartButton={false}
        placeholder="Type Your Msg hear"
        stream={false}
        showTimestamp={false} />
      </ChatHeadlessProvider>
    </>
  );
};

export default ChatBox;
