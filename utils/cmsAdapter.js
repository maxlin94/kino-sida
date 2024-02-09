const cmsAdapter = {
    get: async (url, filter = false) => {
        const response = await fetch(url);
        const data = await response.json();
        if (filter) {
            return filter(data);
        }
        return data;
    },
    post: async (url, payload) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    }
}

export default cmsAdapter;