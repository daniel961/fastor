import { createContext, useState } from 'react';

export const LoaderContext = createContext(false);

export const LoaderState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('בטעינה. נא להמתין.');

  const handleSetLoading = ({ isLoading, delay = 0 }) => {
    setTimeout(() => {
      setLoading(isLoading);
    }, delay);
  };

  return (
    <LoaderContext.Provider
      value={{ loading, message, setMessage, handleSetLoading }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderState;
