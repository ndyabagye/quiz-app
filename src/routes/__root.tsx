import { AuthContext } from '@/auth'
import Layout from '@/components/modules/layout/templates'
import { Button } from '@/components/ui/button'
import { createRootRouteWithContext, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AlertTriangle } from 'lucide-react'

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Layout />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div className="flex min-h-screen flex-1 rounded-xl items-center justify-center bg-muted p-6 md:min-h-min">
        <div className="flex flex-col items-center text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-semibold">Page Not Found</h1>
          <p className="text-muted-foreground">The page you are looking for doesn’t exist.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }
})