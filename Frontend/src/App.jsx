import { useEffect, useState, useRef } from "react";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import MessageList from "./Components/MessageList/MessageList";
import Sidebar from "./Components/Sidebar/Sidebar";
import axios from "axios";
import ChatInput from "./Components/ChatInput/ChatInput";

const API_BASE_URL = "http://localhost:5000/api";


function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chat/conversation`);
        if (response.data.success) {
          setConversations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, isLoading]);


  const handleSendMessage = async (Question) => {
    // Optimistically add user message
    const tempUserMessage = {
      id: Date.now(),
      role: "user",
      content: Question,
    };
    setConversations((prev) => [...prev, tempUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat/conversation`, {
        Question,
      });
      if (response.data.success) {
        const { userConversation, assistantConversation } = response.data.data;
        // Replace temp message with real ones
        setConversations((prev) => {
          const filtered = prev.filter((msg) => msg.id !== tempUserMessage.id);
          return [...filtered, userConversation, assistantConversation];
        });
      }
    } catch (error) {
      console.error("Error posting conversation:", error);

      // Extract error message from backend response or use a realistic fallback
      const errorMessage =
        error.response?.data?.message ||
        "There was an error generating a response.";

      // Add error message to chat
      const errorConversation = {
        id: Date.now() + 1,
        role: "assistant",
        content: errorMessage,
      };

      setConversations((prev) => [...prev, errorConversation]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="chat">
        <ChatHeader />
        <MessageList conversations={conversations} />
        <ChatInput
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
