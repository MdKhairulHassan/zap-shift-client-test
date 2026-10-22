import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'https://zap-shift-server-eight-pied.vercel.app',
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async config => {
        const token = await user?.getIdToken();
        // config.headers.Authorization = `Bearer ${user?.accessToken}`;
        config.headers.Authorization = `Bearer ${token}`;

        // Do something before request is sent
        return config;
      },
    );

    // intercept response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log(error);
        // Handle error response
        // For example, you can log the user out or show an error message
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          logOut()
            .then(() => {
              navigate('/login');
            })
            .catch(err => console.log(err));
        }
        return Promise.reject(error);
      },
    );

    return () => {
      // Eject the interceptor when the component unmounts
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
