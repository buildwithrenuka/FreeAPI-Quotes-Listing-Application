const API = "https://api.freeapi.app/api/v1/public/quotes";

const container = document.getElementById("quotesContainer");
const loading = document.getElementById("loading");
const refreshBtn = document.getElementById("refreshBtn");

async function fetchQuotes() {
  try {
    loading.style.display = "block";
    container.innerHTML = "";

    const res = await fetch(API);
    const json = await res.json();

    console.log("API Response:", json);

    const quotes = json?.data?.data || json?.data || [];

    if (!quotes.length) {
      loading.innerText = "No quotes found";
      return;
    }

    loading.style.display = "none";

    quotes.forEach(q => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="quote">“${q.content || q.quote}”</div>
        <div class="author">— ${q.author || "Unknown"}</div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.log(err);
    loading.innerText = "Failed to load quotes";
  }
}

refreshBtn.addEventListener("click", fetchQuotes);

fetchQuotes();