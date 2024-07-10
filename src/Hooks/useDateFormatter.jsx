import { useState } from 'react';

const useDateFormatter = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return {
    formatDate,
  };
};

export default useDateFormatter;
