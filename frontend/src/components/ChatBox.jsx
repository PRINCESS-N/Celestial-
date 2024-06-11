import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import { ChatContext } from "../context/ChatContex";
import { usefetchRecipient } from "../hooks/fetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, messagesLoading, createMessage } =
    useContext(ChatContext);
  const { recipientUser } = usefetchRecipient(currentChat, user);
  const [textMessages, setTextMessages] = useState("");
  console.log("Text is", textMessages);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser) {
    return (
      <div style={{ textAlign: "center", width: "100%" }}>
        No conversation selected ...
      </div>
    );
  }

  if (messagesLoading) {
    return (
      <div style={{ textAlign: "center", width: "100%" }}>
        Retrieving your messages ...
      </div>
    );
  }

  return (
    <Stack className="chat-box" gap={4}>
      <div className="chat-header">
        <strong>{recipientUser?.username}</strong>
      </div>
      <Stack gap={3} className="messages">
        <div>
          {messages &&
            messages.map((single, index) => (
              <div
                key={index}
                className={`d-flex ${
                  single.senderId === user._id
                    ? "justify-content-end "
                    : "justify-content-start "
                }`}
                ref={scroll}
              >
                <Stack
                  className={`message ${
                    single.senderId === user._id
                      ? "message self mb-3"
                      : "message mb-3"
                  }  flex-grow-0`}
                  gap={3}
                >
                  <span>{single?.message}</span>
                  <span className="message-footer text-muted small">
                    {moment(single.createdAt).calendar()}
                  </span>
                </Stack>
              </div>
            ))}
        </div>
      </Stack>

      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji value={textMessages} onChange={setTextMessages} />
        <button
          className="send-btn"
          type="submit"
          onClick={() =>
            createMessage(textMessages, user, currentChat._id, setTextMessages)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13.854.146a.5.5 0 0 1 .113.534l-5 13a.5.5 0 0 1-.922.027l-2.091-4.6L9.03 6.03a.75.75 0 0 0-1.06-1.06L4.893 8.046l-4.6-2.09a.5.5 0 0 1 .028-.923l13-5a.5.5 0 0 1 .533.113"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
