import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.post('http://192.168.1.4:5555/login/tokenIsValid', null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async (response) => {
        if (response.data) {
          setIsAuthenticated(true);
          const userResponse = await axios.get('http://192.168.1.4:5555/login/current', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(userResponse.data.user);
        } else {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
        if (response.data === false) {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    axios.get('http://192.168.1.4:5555/login/current', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      setUser(response.data.user);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
