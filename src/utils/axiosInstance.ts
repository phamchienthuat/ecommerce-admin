import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Hàm để làm mới token
const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axiosInstance.post('/refresh-token', { token: refreshToken });
  
      const { accessToken, refreshToken: newRefreshToken } = response.data;
  
      // Lưu access token và refresh token mới vào localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
  
      return accessToken;
    } catch (error) {
      console.log('Làm mới token thất bại:', error);
      return null;
    }
  };

// Interceptor cho phản hồi API
axiosInstance.interceptors.response.use(
    function (response) {
      // Xử lý phản hồi thành công
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
  
      // Kiểm tra nếu token hết hạn và chưa thực hiện yêu cầu làm mới token
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        // Gọi hàm làm mới token
        const newAccessToken = await refreshToken();
        
        if (newAccessToken) {
          // Cập nhật access token trong header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
          // Gọi lại yêu cầu ban đầu với token mới
          return axiosInstance(originalRequest);
        } else {
          // Nếu làm mới token thất bại, chuyển hướng người dùng đến trang đăng nhập
          localStorage.clear(); // Dọn dẹp token trước khi chuyển hướng
          window.location.href = 'auth/signin';
        }
      }
  
      return Promise.reject(error);
    }
  );