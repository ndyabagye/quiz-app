// services/authService.ts
import axios from "@/lib/axios"
import { LoginDto, RegisterDTO } from "@/types"

// Sign up a new user
// export const signup = async (credentials: RegisterDTO) => {
// 	const response = await axios.post("/auth/signup", credentials)
// 	return response.data
// }

// Mock sign up
export const signup = async (data: RegisterDTO) => {
	// Simulate delay
	await new Promise(resolve => setTimeout(resolve, 500))

	const dummyToken = 'dummy-signup-token-456'

	localStorage.setItem('auth_token', dummyToken)
	axios.defaults.headers.common['Authorization'] = `Bearer ${dummyToken}`

	return {
		token: dummyToken,
		user: {
			id: 'user_2',
			email: data.email,
			username: data.username || 'New User',
			role: 'user'
		}
	}
}

// Log in a user
// export const login = async (credentials: LoginDto) => {
// 	const response = await axios.post("/auth/login", credentials)
// 	const token = response.data?.token // assume response has a token
// 	if (token) {
// 		localStorage.setItem('auth_token', token)
// 		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// 	}

// 	return response.data
// }

// Mock login
export const login = async (credentials: LoginDto) => {
	// Simulate an API delay
	await new Promise(resolve => setTimeout(resolve, 500))

	const dummyToken = 'dummy-dev-token-123'

	// Set token to localStorage and Axios headers
	localStorage.setItem('auth_token', dummyToken)
	axios.defaults.headers.common['Authorization'] = `Bearer ${dummyToken}`

	return {
		token: dummyToken,
		user: {
			id: 'user_1',
			email: credentials.email,
			username: 'Dev User',
		}
	}
}

// Start Google OAuth
export const googleAuth = async () => {
	const response = await axios.get("/auth/google")
	return response.data
}

// Callback after Google login
export const googleCallback = async (payload: any) => {
	const response = await axios.post("/auth/google/callback", payload)
	return response.data
}

// Log out a user
export const logout = async () => {
	const response = await axios.get("/auth/logout")
	return response.data
}

// Get current logged-in user
export const getProfile = async () => {
	const response = await axios.get("/auth/me")
	return response.data
}

// Send a verification email
export const sendVerificationEmail = async (payload: any) => {
	const response = await axios.post("/auth/verify/email/send", payload)
	return response.data
}

// Verify email
export const verifyEmail = async (payload: any) => {
	const response = await axios.post("/auth/verify/email", payload)
	return response.data
}

// Request a password reset
export const requestPasswordReset = async (payload: any) => {
	const response = await axios.post("/auth/password/reset", payload)
	return response.data
}

// Create a new password
export const createNewPassword = async (payload: any) => {
	const response = await axios.post("/auth/password/create", payload)
	return response.data
}

// Update the password
export const updatePassword = async (payload: any) => {
	const response = await axios.post("/auth/password/update", payload)
	return response.data
}
