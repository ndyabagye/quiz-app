import { ThemeToggle } from '@/components/common/theme-toggle'
import { Outlet } from '@tanstack/react-router'

const Layout = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-svh bg-gradient-to-b from-indigo-100 to-indigo-400 dark:from-indigo-950 dark:to-indigo-700 px-4 py-8 relative">
			{/* Theme toggle in top-right corner */}
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>

			<main className="w-full max-w-2xl mx-auto">
				<Outlet />
			</main>
		</div>
	)
}

export default Layout