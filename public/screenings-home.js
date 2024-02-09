const container = document.getElementById('screenings-container');

async function getScreenings() {
    const response = await fetch('/api/screenings');
    const screenings = await response.json();
    return screenings;
}

async function renderScreenings() {
    const screenings = await getScreenings();
    screenings.forEach(screening => {
        const date = formatDate(screening.attributes.start_time).split(" ");
        const span = document.createElement('span');
        span.classList.add('text-white', 'text-lg')
        span.textContent = `${screening.attributes.movie.data.attributes.title} | ${screening.attributes.room} | Datum: ${date[0]} Tid: ${date[1].substring(0, 5)}`;
        container.appendChild(span);
    });
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

renderScreenings();