import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContext = createContext(null);

const VITE_BACK_URL =
  import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        const data = await response.json();
        if (data?.message?.name === 'TokenExpiredError') {
          toast.error('Please reconnect as your session is not good anymore.');
          localStorage.removeItem('token');
          if (location.pathname === '/mycv') {
            navigate('/login');
          }
        } else if (!response.ok) {
          throw new Error('Failed to get user');
        } else {
          setUser(data);
        }
      } catch (error) {
        toast.error('Get user error:', error);
      }
    };
    getUser();
  }, [navigate, location]);

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

      return response.status;
    } catch (error) {
      toast.error('Sign up error:', error);
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
      setUser(data.user);
      localStorage.setItem('token', data.user.token);
      return response.status;
    } catch (error) {
      toast.error('Login error:', error);
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
