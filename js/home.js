console.log("RWANDA Me&You Home JS loaded");

// =====================================
// CHAT ITEMS CLICK -> OPEN CHAT
// =====================================

const chatItems = document.querySelectorAll(".chat-item");

chatItems.forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.querySelector("h4").innerText;

    // Save selected user
    localStorage.setItem("chatUser", name);

    // Redirect to chat page (next we will create chat.html)
    window.location.href = "chat.html";
  });
});


// =====================================
// SEARCH FUNCTION (basic)
// =====================================

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  chatItems.forEach((item) => {
    const name = item.querySelector("h4").innerText.toLowerCase();
    const msg = item.querySelector("p").innerText.toLowerCase();

    if (name.includes(value) || msg.includes(value)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});


// =====================================
// FUTURE FIREBASE HOOK (READY)
// =====================================

// Here later we will:
// - load users from Firestore
// - show real chats
// - update in real time
