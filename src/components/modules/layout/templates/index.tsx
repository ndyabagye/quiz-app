import { useAuth } from '@/auth'
import { LogoutButton } from '@/components/common/logout'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import { Link, Outlet } from '@tanstack/react-router'

const Layout = () => {
	const auth = useAuth()

	return (
		<div className="flex flex-col items-center justify-center min-h-svh bg-gradient-to-b from-indigo-100 to-indigo-400 dark:from-indigo-950 dark:to-indigo-700 relative">


			{/* Theme toggle in top-right corner */}
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>

			{auth.isAuthenticated && (
				<>
					{/* Home Button in top-left corner */}
					<div className="absolute top-4 left-4">
						<Button asChild>
							<Link to='/home'>Home</Link>
						</Button>
					</div>
					<div className="absolute top-4 right-12">
						<LogoutButton />
					</div>
				</>
			)}

			<main className="w-full max-w-6xl mx-auto">
				<Outlet />
			</main>
		</div>
	)
}

export default Layout