import { useState } from "react";
import reactLogo from "./assets/react.svg";
import webLogo from "./assets/logo.png";
import chatLogo from "./assets/chat.png";
import userLogo from "./assets/user.png";
import "./App.css";
import { useRef } from "react";
import axios from "axios";

const YOU = "you";
const AI = "ai";
function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([
    // { from: YOU, value: "FROM ME" },
    // { from: AI, value: ["1 MESSG FROM AI", "2 MESSG FROM AI"] },
  ]);
  const [loading, setLoading] = useState(false);
  const updateQna = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };
  const handleSend = () => {
    const question = inputRef.current.value;
    updateQna(YOU, question);
    // setQna([...qna, { from: YOU, value: question }]);
    // console.log({question})
    setLoading(true);
    axios
      .post("https://chatbot-server-ohtt.onrender.com/chat", {
        question,
      })
      .then((response) => {
        updateQna(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderContent = (qna) => {
    const value = qna.value;
    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }
    return <p className="message-text">{value}</p>;
  };
  return (
    <main class="main-container">
      {/* <div >
        <h2 class="example-title">Search Ideas</h2>
        <p class="example-prompt">What is chatgpt and what functionalities it can perform</p>
        <p class="example-prompt">What is chatgpt</p>
        <p class="example-prompt">What is chatgpt</p>
        <p class="example-prompt">What is chatgpt</p>
        <p class="example-prompt">What is chatgpt</p>
        <p class="example-prompt">What is chatgpt</p>
      </div> */}
      <div class="container">
        <div>
          <h2>ChatBot</h2>
          {/* <img
          src={webLogo}
          alt=""
          width="200px"
          height="50px"
          // class="avtar"
        /> */}
          <div class="chats">
            {qna.map((qna) => {
              if (qna.from == YOU) {
                return (
                  <div class="send chat">
                    <img src={userLogo} alt="" class="avtar" />
                    <p>{renderContent(qna)}</p>
                  </div>
                );
              }
              return (
                <div class="recieve chat">
                  <img src={chatLogo} alt="" class="avtar" />
                  <p>{renderContent(qna)}</p>
                </div>
              );
            })}

            {loading && (
              <div class="recieve chat">
                <img src={chatLogo} alt="" class="avtar" />
                <p>Typing...</p>
              </div>
            )}
          </div>
        </div>

        <div class="chat-input">
          <input
            type="text"
            ref={inputRef}
            class="form-control col"
            placeholder="Type Something"
          />
          <button disabled={loading} class="btn" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
