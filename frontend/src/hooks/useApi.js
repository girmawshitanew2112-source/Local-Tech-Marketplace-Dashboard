import { useEffect, useState } from 'react';

export function useApi(request, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    request().then((response) => mounted && setData(response.data)).catch((err) => mounted && setError(err.response?.data?.message || err.message)).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, deps);
  return { data, loading, error, setData };
}
