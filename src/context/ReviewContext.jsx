import PropTypes from 'prop-types';
import { createContext } from 'react';

const ReviewContext = createContext(null);

const VITE_BACK_URL =
  import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api';

const ReviewProvider = ({ children }) => {
  const addReview = async (review, idCv) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(`${VITE_BACK_URL}/cv/${idCv}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const data = await response.json();
      console.log('Review added:', data);
      return data;
    } catch (error) {
      console.error('Add review error:', error);
    }
  };
  return (
    <ReviewContext.Provider value={{ addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

ReviewProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ReviewContext, ReviewProvider };
