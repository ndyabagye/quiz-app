import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2 mx-auto flex flex-col space-y-12 items-center justify-center min-h-svh ">
      <h3 className='text-3xl font-mono'>Welcome to Quizdom </h3>
      <Button asChild className='text-lg p-4'>
        <Link to="/home">Start the quiz</Link>
      </Button>
    </div>
  )
}
