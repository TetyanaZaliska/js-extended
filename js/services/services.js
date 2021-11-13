const postData = async (url, data) => {
    const res = await fetch(url, { 
        method: "POST", 
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }, 
        body: data
    });
    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch url: ${url}, server respond with status: ${res.status}`);
    }

    return await res.json();
};

export { postData };
export { getResource };