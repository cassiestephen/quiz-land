import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

type Props = {};

const ChatGPTBot = (props: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [messages, setMessages] = useState<Array<MessageModel>>([
    {
      message: "Hello, I am QuizGPT! How can I help you today?",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message: MessageModel) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; // append new message to previous

    // update messages state
    setMessages(newMessages);

    // typing indicator
    setIsTyping(true);

    // send to chatGPT
    await processAPIMessage(newMessages);
  };

  async function processAPIMessage(messageList: Array<MessageModel>) {
    let translatedApiMessages = messageList.map((messageObject) => {
      let role = "user";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } 
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "Explain things like you're helping give creative advice to somebody who wants to create a BuzzFeed style Quiz for Quiz Land.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      // include system message at start
      messages: [systemMessage, ...translatedApiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    }).then((data) => {
        return data.json();
      }).then((data) => {
        setMessages([
          ...messageList,
          {
            // set message to new message
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false); // ChatGPT is done
      });
  }

  return (
    <div className="h-[630px] w-full flex items-center justify-center bg-gray-700">
      <div className="bg-white p-2 w-[500px] h-[400px] rounded-xl shadow-2xl flex flex-col">
        <ChatContainer>
          <MessageList
            typingIndicator={
              isTyping && <TypingIndicator content="QuizGPT is Typing" />
            }
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </div>
    </div>
  );
};

export default ChatGPTBot;
