(function () {
  function escapeHtml(value) {
    const text = String(value ?? '');
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderStars(stars) {
    const safeStars = Math.max(0, Math.min(5, Number(stars) || 0));
    return '⭐'.repeat(safeStars) + '☆'.repeat(5 - safeStars);
  }

  function createReviewCard(review) {
    const name = escapeHtml(review.name || 'Anonymous Member');
    const text = escapeHtml(review.text || 'No review text provided.');
    const rating = Number(review.stars) || 0;
    const reviewUrl = review.reviewUrl ? String(review.reviewUrl) : '';

    return `
      <article class="review-card">
        <header class="review-header">
          <h4 class="review-name">${name}</h4>
          <span class="review-stars" aria-label="${rating} out of 5 stars">${renderStars(rating)}</span>
        </header>
        <p class="review-text">${text}</p>
        ${reviewUrl ? `<a class="review-link" href="${encodeURI(reviewUrl)}" target="_blank" rel="noopener noreferrer">Read original review</a>` : ''}
      </article>
    `;
  }

  async function loadReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    try {
      const reviewsUrl = new URL('./reviews.json', window.location.href).href;

      if (window.location.protocol === 'file:') {
        throw new Error('Reviews cannot be fetched over file://. Run the site with a local HTTP server.');
      }

      const response = await fetch(reviewsUrl, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Review request failed with status ${response.status}`);
      }

      const reviews = await response.json();

      if (!Array.isArray(reviews) || reviews.length === 0) {
        container.innerHTML = '<p class="loading-review">No reviews available right now.</p>';
        return;
      }

      const limitedReviews = reviews.slice(0, 6);
      container.innerHTML = limitedReviews.map(createReviewCard).join('');

      if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.gsap.from('.review-card', {
          opacity: 0,
          y: 28,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#reviews',
            start: 'top 75%'
          }
        });
      }
    } catch (error) {
      console.error('Unable to load reviews from reviews.json', error);
      container.innerHTML = '<p class="loading-review">Unable to load reviews. Start a local server (for example: Live Server) and reload the page.</p>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadReviews);
  } else {
    loadReviews();
  }
})();
