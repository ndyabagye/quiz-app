// import HomeTemplate from '@/components/modules/home/templates'
import NewHome from '@/components/modules/home/templates/new-home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NewHome />
    </>
  )
}
