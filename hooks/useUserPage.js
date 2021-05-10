import { useEffect, useState } from 'react';
import { useProfile } from '../store/contexts/profileContext';

const useUserPage = () => {
  const profile = useProfile();
  const [url, setUrl] = useState();

  useEffect(() => {
    setUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const fetchUri = (slug) => {
    if (slug) {
      if (profile?.user?.publicProfile || !profile) {
        fetch(`${url}/${slug}`);
      }
    }
  };
  const getUri = (slug) => {
    if (slug) {
      return `${url}/${slug}`;
    }
    return url;
  };

  return {
    getUri,
    fetchUri,
  };
};

export default useUserPage;
