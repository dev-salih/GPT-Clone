import styles from "./MessageList.module.css";

function MessageList({ conversations }) {
  return (
    <div className={styles.messageList}>
      {conversations.length === 0 ? (
        <div className={styles.empty}>What are you working on?</div>
      ) : (
        conversations.map((msg) => (
          // child component ChatMessage
          <h1>{msg.content}</h1>
        ))
      )}
    </div>
  );
}

export default MessageList;
