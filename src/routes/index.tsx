import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2">
      <h3>Welcome to Quizdom </h3>
      <Button asChild>
        <Link to="/home">Visit the users page</Link>
      </Button>
    </div>
  )
}
