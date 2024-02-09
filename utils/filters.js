export function filterOldScreenings(data) {
    return data.data.filter((screening) => new Date(screening.attributes.start_time) > new Date()).sort((a, b) => new Date(a.attributes.start_time) - new Date(b.attributes.start_time));
}

export function filterReviews(data) {
    return data.data.filter((review) => {
        return (
            review.attributes.rating > 0 &&
            review.attributes.rating <= 5 &&
            review.attributes.comment &&
            review.attributes.author
        );
    });
}
