import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const loginDemo = (role = 'admin') => {
    const demo = { name: role === 'admin' ? 'Avery Admin' : role === 'seller' ? 'Sam Seller' : 'Bianca Buyer', role };
    localStorage.setItem('user', JSON.stringify(demo));
    setUser(demo);
  };

  const value = useMemo(() => ({ theme, toggleTheme, user, setUser, loginDemo, cart, setCart, wishlist, setWishlist }), [theme, user, cart, wishlist]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
