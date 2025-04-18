import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8086'

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Add token to each request if it exists
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('auth_token')
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default axiosInstance