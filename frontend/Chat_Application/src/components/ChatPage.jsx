import React, { useEffect, useRef, useState } from "react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  //page init:

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        // console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected && roomId) {
      loadMessages();
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  //scroll down

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  

  useEffect(() => {
      const connectWebSocket = () => {
 
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      // var url = "ws://localhost:61614/stomp";
      // var client = Stomp.client(url);


      client.connect({}, () => {
        setStompClient(client);

        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    //stomp client
   
  }, [roomId]);

  //send message handle

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }

  };

  function handleLogout() {
    if (stompClient) {
      stompClient.disconnect();
    }
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="">
      {/* this is a header */}
      <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        {/* room name container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        {/* username container */}

        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* button: leave room */}
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-20 px-10  w-2/3 dark:bg-gray-300 mx-auto h-screen overflow-auto "
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start" } `}>
            <div
              className={`my-2 ${message.sender === currentUser ? "bg-green-800" : "bg-gray-600"} p-2 max-w-xs rounded`}>
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/84"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400">
                    {message.timeStamp ? timeAgo(message.timeStamp) : "Just now"}
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* input message container */}
      <div className=" fixed bottom-4 w-full h-16 ">
        <div className="h-full  pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              (e.key === "Enter") &&
                sendMessage();

            }}
            type="text"
            placeholder="Type your message here..."
            className=" w-full  dark:border-gray-600 b dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none  "
          />

          <div className="flex gap-1">

            <button
              onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10  flex justify-center items-center rounded-full"
            >
              <img
                  className="h-6 w-6"
                  src={"https://img.icons8.com/?size=100&id=86032&format=png&color=000000"}
                  alt=""
                />
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;