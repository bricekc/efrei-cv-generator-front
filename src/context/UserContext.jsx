import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

const VITE_BACK_URL =
  import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await fetch(`${VITE_BACK_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('ça va la');
        const data = await response.json();
        if (data?.message?.name === 'TokenExpiredError') {
          localStorage.removeItem('token');
          navigate('/');
        } else if (!response.ok) {
          throw new Error('Failed to get user');
        } else {
          console.log('User fetched:', data);
          setUser(data);
        }
      } catch (error) {
        console.error('Get user error:', error);
      }
    };
    getUser();
  }, [navigate]);

  const register = async (user) => {
    try {
      const response = await fetch(`${VITE_BACK_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      console.log('Sign up successful:', data);
      return response.status;
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const login = async (user) => {
    try {
      const response = await fetch(`${VITE_BACK_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setUser(data.user);
      localStorage.setItem('token', data.user.token);
      return response.status;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ login, logout, register, user }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
