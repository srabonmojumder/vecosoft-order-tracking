import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Clock, CheckCheck, Sparkles } from "lucide-react";
import "./SupportChatModal.css";

export default function SupportChatModal({ order, isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: `Hello Srabon! I'm Veco Assistant. I see you're tracking Order #${order?.orderNumber}. How can I assist you right now?`,
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    order?.status === "delayed"
      ? "Why is my delivery delayed?"
      : order?.status === "not-received"
      ? "I cannot find my delivered package"
      : "When will tracking be available?",
    "Can I change my delivery address?",
    "Speak with a human agent",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "";
      const lower = text.toLowerCase();

      if (lower.includes("delay") || lower.includes("why")) {
        botReply = `Due to ${
          order?.delayReason || "regional transit weather disruptions"
        }, courier transit is operating with caution. Your current estimated delivery window has been updated to ${new Date(
          order?.revisedDelivery || Date.now()
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}. We monitor this route continuously!`;
      } else if (lower.includes("find") || lower.includes("not received") || lower.includes("missing")) {
        botReply = `I understand how frustrating that is! Please use our 'Report Missing Package' button to automatically file an instant expedited replacement claim or full refund under the Vecosoft Protection Guarantee.`;
      } else if (lower.includes("tracking") || lower.includes("when")) {
        botReply = `Your order is confirmed and our fulfillment team is packaging your items. As soon as courier barcode scanning completes, you will receive an automated SMS & email with the tracking ID.`;
      } else if (lower.includes("human") || lower.includes("agent")) {
        botReply = `I've queued an escalated callback for you! Priority Agent Sarah is reviewing your case and will ring you at your registered phone within 15 minutes.`;
      } else {
        botReply = `Thanks for reaching out! I've logged your request regarding Order #${order?.orderNumber} with priority escalation. Our team is actively on it.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botReply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="chat-backdrop" onClick={onClose}>
      <div
        className="chat-drawer animate-chat-slide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Customer Support Chat"
      >
        <div className="chat-header">
          <div className="chat-avatar-group">
            <div className="chat-bot-avatar">
              <Bot size={20} />
              <span className="online-indicator" />
            </div>
            <div>
              <div className="chat-bot-name">
                <span>Veco Support AI</span>
                <span className="ai-badge">
                  <Sparkles size={10} /> Concierge
                </span>
              </div>
              <div className="chat-bot-status">Typically replies in seconds</div>
            </div>
          </div>
          <button className="chat-close-btn" onClick={onClose} aria-label="Close chat">
            <X size={18} />
          </button>
        </div>

        <div className="chat-messages-container">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble-row ${
                msg.sender === "user" ? "row-user" : "row-bot"
              } animate-fade-in`}
            >
              {msg.sender === "bot" && (
                <div className="bubble-avatar bot-bubble-avatar">
                  <Bot size={14} />
                </div>
              )}
              <div className={`chat-bubble ${msg.sender === "user" ? "bubble-user" : "bubble-bot"}`}>
                <p>{msg.text}</p>
                <div className="bubble-meta">
                  <span className="bubble-time">{msg.time}</span>
                  {msg.sender === "user" && <CheckCheck size={12} className="check-read" />}
                </div>
              </div>
              {msg.sender === "user" && (
                <div className="bubble-avatar user-bubble-avatar">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row row-bot animate-fade">
              <div className="bubble-avatar bot-bubble-avatar">
                <Bot size={14} />
              </div>
              <div className="chat-bubble bubble-bot typing-bubble">
                <div className="typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="quick-chips-wrapper">
          <div className="quick-chips-scroll">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="chip-btn"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!inputText.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
