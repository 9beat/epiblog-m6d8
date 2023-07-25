import { useState, useEffect } from 'react';

const useCachedFetch = (url, page, pageSize, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fullUrl = `${url}?page=${page}&pageSize=${pageSize}`;
      const cachedData = localStorage.getItem(fullUrl);
      if (cachedData) {
        setData(JSON.parse(cachedData));
      } else {
        const response = await fetch(fullUrl);
        const data = await response.json();
        localStorage.setItem(fullUrl, JSON.stringify(data));
        setData(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url, page, pageSize]);

  return [data, isLoading];
};

export default useCachedFetch;
