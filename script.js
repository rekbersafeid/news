const BIN_URL = "https://api.jsonbin.io/v3/b/6994eec043b1c97be986f762";
const API_KEY = "$2a$10$CRpUuQhcfh0vNYFxICLlwO7LrdzbWhCKwXJKD44is4DkVq8SjXv8G";

async function fetchNews() {
  try {
    const res = await fetch(BIN_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });

    const json = await res.json();
    const news = json.record.news || [];

    renderHeadline(news);
    renderLatest(news);
    renderPopular(news);
    renderCategory(news, "moba", "moba-news");
    renderCategory(news, "tips", "tips-news");
    renderCategory(news, "edukasi", "edu-news");

  } catch (err) {
    console.error("Gagal load berita:", err);
  }
}

/* ================= RENDER ================= */

function renderHeadline(news) {
  const item = news.find(n => n.headline);
  if (!item) return;

  document.getElementById("headline-news").innerHTML = `
    <a href="detail.html?id=${item.id}" class="news-link">
      <img src="${item.image}" alt="${item.title}">
      <div class="headline-content">
        <h4>${item.title}</h4>
        <p>${item.excerpt}</p>
        <span>Baca Selengkapnya →</span>
      </div>
    </a>
  `;
}

function renderLatest(news) {
  document.getElementById("latest-news").innerHTML =
    [...news].sort((a,b)=>b.id-a.id).slice(0,6).map(newsCard).join("");
}

function renderPopular(news) {
  document.getElementById("popular-news").innerHTML =
    news.filter(n=>n.popular).slice(0,6).map(newsCard).join("");
}

function renderCategory(news, category, target) {
  document.getElementById(target).innerHTML =
    news.filter(n=>n.category===category).slice(0,6).map(newsCard).join("");
}

function newsCard(item) {
  return `
    <a href="detail.html?id=${item.id}" class="news-link">
      <article class="news-card">
        <img src="${item.image}" alt="${item.title}">
        <h4>${item.title}</h4>
        <p>${item.excerpt}</p>
      </article>
    </a>
  `;
}

fetchNews();
