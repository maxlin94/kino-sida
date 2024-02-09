const cmsAdapter = {
    get: async (url, filter = false, pagination = false) => {
        const response = await fetch(url);
        const data = await response.json();
        if(pagination) {
            const pResponse = await fetch(`${url}?pagination[pageSize]=${data.meta.pagination.total}&pagination[limit]=${data.meta.pagination.total}&populate=movie`);
            const pData = await pResponse.json();
            return filter(pData);
        }
        if (filter) {
            return filter(data);
        }
        return data.data;
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