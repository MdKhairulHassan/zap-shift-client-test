import axios from 'axios';

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://zap-shift-server-eight-pied.vercel.app',
  });

  return axiosInstance;
};

export default useAxios;
