import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import { isAuthenticated } from '@/lib/authenticate';

const OPEN_ROUTES = ['/login', '/register', '/about', '/_error'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [, setFavs] = useAtom(favouritesAtom);

  const loadFavs = async () => {
    const fav = await getFavourites();
    setFavs(fav);
  };

  const verifyAccess = (route) => {
    const cleanRoute = route.split('?')[0];
    if (!isAuthenticated() && !OPEN_ROUTES.includes(cleanRoute)) {
      setAllowed(false);
      router.push('/login');
    } else {
      setAllowed(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      loadFavs();
    }

    verifyAccess(router.pathname);

    const onRouteChange = (url) => verifyAccess(url);
    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, []);

  return <>{allowed && children}</>;
}
