import { useEffect, useRef } from 'react';
import { useProfile } from '../store/contexts/profileContext';

const useUserPage = () => {
  const urlRef = useRef();
  const profile = useProfile();

  useEffect(() => {
    urlRef.current = `${window.location.protocol}//${window.location.host}`;
  }, []);

  const fetchUri = (slug) => {
    if (slug) {
      if (profile?.user?.publicProfile || !profile) {
        fetch(`${urlRef.current}/${slug}`);
      }
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
