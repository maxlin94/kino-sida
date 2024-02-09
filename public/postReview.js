const submitBtn = document.getElementById('submit-review');
const form = document.getElementById('review-form');

function getCurrentDate() {
    return new Date().toISOString();
}

async function handleSubmit(e) {
    e.preventDefault();
    const movieId = window.location.pathname.split("/").pop();
    const author = document.getElementById('review-name').value;
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('review-comment').value;
    const response = await fetch(`/api/movies/${movieId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "data": {
              "comment": comment,
              "rating": rating,
              "author": author,
              "verified": true,
              "movie": movieId,
              "createdAt": getCurrentDate(),
              "updatedAt": getCurrentDate(),
              "createdBy": author,
              "updatedBy": author
            }
          })
    });
    form.reset();
}

submitBtn.addEventListener('click', (e) => {
    handleSubmit(e);
});