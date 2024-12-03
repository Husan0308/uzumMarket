// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api', // Update this if your Django API URL is different
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Set up a request interceptor to attach the token to every request
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// // Refresh token on 401 Unauthorized response
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
//       try {
//         const refreshToken = localStorage.getItem('refresh_token');
//         const response = await api.post('/token/refresh/', { refresh: refreshToken });
//         localStorage.setItem('access_token', response.data.access);
//         error.config.__isRetryRequest = true;
//         return api(error.config); // Retry original request with new token
//       } catch (err) {
//         console.error('Refresh token expired or invalid');
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
