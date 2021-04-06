import { useEffect, useRef } from 'react';

const useUserPage = () => {
  const urlRef = useRef();

  useEffect(() => {
    urlRef.current = `${window.location.protocol}//${window.location.host}`;
  }, []);

  const fetchUri = (slug) => {
    if (slug) {
      fetch(`${urlRef.current}/${slug}`);
    }
  };
  const getUri = (slug) => {
    if (slug) {
      return `${urlRef.current}/${slug}`;
    }
    return urlRef.current;
  };

  return {
    getUri,
    fetchUri,
  };
};

export default useUserPage;
