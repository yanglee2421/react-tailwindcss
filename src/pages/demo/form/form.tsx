// React Imports
import React from "react";

export function Form() {
  const [showForm, setShowForm] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <>
        <h1>谢谢使用我们的服务！</h1>
        <button
          onClick={() => {
            setMessage("");
            setShowForm(true);
          }}
        >
          打开聊天
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="消息"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button type="submit" disabled={message === ""}>
        发送
      </button>
    </form>
  );
}

function sendMessage(message: string) {
  console.log("发送的消息：" + message);
}
