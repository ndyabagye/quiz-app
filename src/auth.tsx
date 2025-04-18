import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
// import { sleep } from "@/lib/utils";
import { LoginDto, RegisterDTO, User } from "@/types";
import { login as loginApi, logout as logoutApi, signup } from "@/services/apiService"


export interface AuthContext {
	isAuthenticated: boolean
	login: (credentials: LoginDto) => Promise<void>
	logout: () => Promise<void>
	register: (credentials: RegisterDTO) => Promise<void>
	user: User | null
}

const AuthContext = createContext<AuthContext | null>(null)

const key = 'tanstack.auth.user'

function getStoredUser() {
	const user = localStorage.getItem(key)
	return user ? JSON.parse(user) : null
}

function setStoredUser(user: User | null) {
	if (user) {
		localStorage.setItem(key, JSON.stringify(user))
	} else {
		localStorage.removeItem(key)
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(getStoredUser())
	const isAuthenticated = !!user

	const logout = useCallback(async () => {
		// await sleep(250)
		// await logoutApi()
		localStorage.removeItem("auth_token")
		setStoredUser(null)
		setUser(null)
	}, [])

	const login = useCallback(async (credentials: LoginDto) => {
		// await sleep(500)
		const data = await loginApi(credentials)
		setStoredUser(data.user)
		setUser(data.user)
	}, [])

	const register = useCallback(async (credentials: RegisterDTO) => {
		const data = await signup(credentials)
		setStoredUser(data.user)
		setUser(data.user)
	}, [])

	useEffect(() => {
		setUser(getStoredUser())
	}, [])

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be called within an AuthProvider')
	}
	return context
}