import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/loading';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.post('http://192.168.1.5:5555/login/tokenIsValid', null, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) {
            setIsAuthenticated(true);
            const userResponse = await axios.get('http://192.168.1.5:5555/login/current', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setUser(userResponse.data.user);
          } else {
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
          }
        } catch {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    window.localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    axios.get('http://192.168.1.5:5555/login/current', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      setUser(response.data.user);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
