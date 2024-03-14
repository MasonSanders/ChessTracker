import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error.message);
            })

    }, [url]);

    return { data };
}

export default useFetch;