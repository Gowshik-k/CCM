import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAuthToken } from '../services/api';

/**
 * Component that initializes the API service with the Auth0 token.
 * It stays mounted in the App tree to sync the JWT with Axios.
 */
const AuthInitialize = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const updateToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
        } catch (error) {
          console.error("Error getting access token:", error);
          setAuthToken(null);
        }
      } else {
        setAuthToken(null);
      }
    };

    updateToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return children;
};

export default AuthInitialize;
