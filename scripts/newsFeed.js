// scripts/newsFeed.js
// Fetches and displays the latest tech news using NewsAPI

const NEWS_API_KEY = '1fafae0a869447e1823fbb0b2ff2307a'; // Replace with your NewsAPI key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=3&apiKey=${NEWS_API_KEY}`;

export async function renderNewsFeedCard(section) {
  section.innerHTML = '';

  const list = document.createElement('ul');
  list.className = 'news-feed-list';
  section.appendChild(list);

  const loading = document.createElement('div');
  loading.textContent = 'Loading...';
  loading.className = 'news-feed-loading';
  section.appendChild(loading);

  try {
    const res = await fetch(NEWS_API_URL);
    const data = await res.json();
    loading.remove();
    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        // Create a card for each news item
        const card = document.createElement('li');
        card.className = 'news-feed-item news-feed-card';
        card.style.cursor = 'pointer';
        card.onclick = (e) => {
          window.open(article.url, '_blank');
        };
        // Card layout: image left, content right
        const imgDiv = document.createElement('div');
        imgDiv.className = 'news-feed-img-wrapper';
        if (article.urlToImage) {
          const img = document.createElement('img');
          img.src = article.urlToImage;
          img.alt = article.title;
          img.className = 'news-feed-img';
          img.onerror = function() { this.style.display = 'none'; };
          imgDiv.appendChild(img);
        }
        card.appendChild(imgDiv);
        const contentDiv = document.createElement('div');
        contentDiv.className = 'news-feed-content';
        // Title as plain text (not a link)
        const titleSpan = document.createElement('span');
        titleSpan.textContent = article.title;
        titleSpan.className = 'news-feed-title-text';
        contentDiv.appendChild(titleSpan);
        if (article.source && article.source.name) {
          const source = document.createElement('span');
          source.className = 'news-feed-source';
          source.textContent = ` (${article.source.name})`;
          contentDiv.appendChild(source);
        }
        card.appendChild(contentDiv);
        list.appendChild(card);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'No news found.';
      list.appendChild(li);
    }
  } catch (err) {
    loading.remove();
    const li = document.createElement('li');
    li.textContent = 'Failed to load news.';
    list.appendChild(li);
  }

  section.appendChild(container);
}

// Auto-init if loaded as module
if (typeof window !== 'undefined') {
  window.renderNewsFeedCard = renderNewsFeedCard;
}
