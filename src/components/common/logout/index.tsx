import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { useNavigate, useRouter } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

export const LogoutButton = () => {
	const auth = useAuth()
	const router = useRouter()
	const navigate = useNavigate()


	const handleLogout = () => {
		auth.logout().then(() => {
			router.invalidate().finally(() => {
				navigate({ to: '/' })
			})
		})
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			className="rounded-full"
			onClick={() => handleLogout()}
		>
			<LogOut />

			<span className="sr-only">Logout</span>
		</Button>
	)
}