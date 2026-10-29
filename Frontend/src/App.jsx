import { useEffect, useState } from "react";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import MessageList from "./Components/MessageList/MessageList";
import Sidebar from "./Components/Sidebar/Sidebar";
import axios from "axios";

function App() {
  const [conversations, setConversations] = useState([]);

  async function fetchConversation() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/chat/conversation",
      );
      // console.log(data);
      setConversations(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    fetchConversation();
  }, [])

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <ChatHeader />
        <MessageList conversations={conversations} />
      </main>
    </div>
  );
}

export default App;
