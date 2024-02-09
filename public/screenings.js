const container = document.querySelector(".screenings");
const movieId = window.location.pathname.split("/").pop();
const screenings = await getScreenings(movieId);

async function getScreenings(id) {
    const response = await fetch(`/api/screenings/${id}`);
    const data = await response.json();
    return data;
}


screenings.forEach(screening => {
    const template = document.querySelector("#screening-template").content.cloneNode(true);
    const date = formatDate(screening.attributes.start_time);
    template.querySelector(".room").textContent = screening.attributes.room;
    template.querySelector(".date").textContent = `Datum: ${date.split(" ")[0]} Tid: ${date.split(" ")[1]}`
    container.appendChild(template);
});

function formatDate(date) {
    return new Date(date).toLocaleString();
}