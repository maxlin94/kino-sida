const container = document.querySelector(".reviews");
const movieId = window.location.pathname.split("/").pop();
const nextBtn = document.querySelector("#next-page");
const prevBtn = document.querySelector("#prev-page");
const pageSize = 5;
const reviews = await getReviews(movieId);
let page = 0;

async function getReviews(id) {
    const response = await fetch(`/api/movies/${id}/reviews`);
    const data = await response.json();
    return data;
}

async function renderReviews(reviews) {
    for(let i = page * pageSize; i < page * pageSize + pageSize; i++) {
        const review = reviews[i];
        if (review) {
            const template = document.querySelector("#review-template").content.cloneNode(true);
            template.querySelector(".author").textContent = review.attributes.author;
            template.querySelector(".rating").textContent = review.attributes.rating;
            template.querySelector(".comment").textContent = review.attributes.comment;
            container.appendChild(template);
        } else {
            return;
        }
    }
}

async function updateButtons() {
    if (reviews.length <= (page + 1) * pageSize) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = '';
    }
    if (page === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = '';
    }
}

function nextPage() {
    page++;
    container.innerHTML = "";
    renderReviews(reviews);
    updateButtons();
}

function prevPage() {
    page--;
    container.innerHTML = "";
    renderReviews(reviews);
    updateButtons();
}

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);

renderReviews(reviews);
updateButtons();