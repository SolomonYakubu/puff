const chatbotToggler = document.querySelector(".chatbot-toggler"),
  closeBtn = document.querySelector(".close-btn"),
  chatbox = document.querySelector(".chatbox"),
  chatInput = document.querySelector(".chat-input textarea"),
  sendChatBtn = document.querySelector(".chat-input span"),
  botMainContainer = document.querySelector(".bot-main-container"),
  chatbot = document.querySelector(".chatbot");
let userMessage = null;
const API_KEY = "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",
  inputInitHeight = chatInput.scrollHeight,
  createChatLi = (e, t) => {
    const n = document.createElement("li");
    n.classList.add("chat", `${t}`);
    let o =
      "outgoing" === t
        ? "<p></p>"
        : '<img src="./assets.website-files.com/64cbeb4e2977e5505e32289c/logo.webp"><p></p>';
    return (n.innerHTML = o), (n.querySelector("p").textContent = e), n;
  },
  generateResponse = (e) => {
    const t = e.querySelector("p"),
      n = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. Your name is Forginu5.0 AI",
            },
            { role: "user", content: userMessage },
          ],
        }),
      };
    fetch("https://api.openai.com/v1/chat/completions", n)
      .then((e) => e.json())
      .then((e) => {
        t.textContent = e.choices[0].message.content.trim();
      })
      .catch(() => {
        t.classList.add("error"),
          (t.textContent = "Oops! Something went wrong. Please try again.");
      })
      .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
  },
  handleChat = () => {
    (userMessage = chatInput.value.trim()),
      userMessage &&
        ((chatInput.value = ""),
        chatbox.appendChild(createChatLi(userMessage, "outgoing")),
        chatbox.scrollTo(0, chatbox.scrollHeight),
        setTimeout(() => {
          const e = createChatLi("Typing...", "incoming");
          chatbox.appendChild(e),
            chatbox.scrollTo(0, chatbox.scrollHeight),
            generateResponse(e);
        }, 600));
  };
chatInput.addEventListener("keydown", (e) => {
  "Enter" === e.key &&
    !e.shiftKey &&
    window.innerWidth > 200 &&
    (e.preventDefault(), handleChat());
}),
  sendChatBtn.addEventListener("click", handleChat),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelector(".chatbot-toggler"),
      t = document.querySelector(".chatbot"),
      n = document.getElementById("mode_comment"),
      o = document.getElementById("close");
    let c = !1;
    e.addEventListener("click", function () {
      c
        ? ((t.style.display = "none"),
          (n.style.display = "block"),
          (o.style.display = "none"))
        : ((t.style.display = "block"),
          (n.style.display = "none"),
          (o.style.display = "inline")),
        (c = !c);
    });
  });
