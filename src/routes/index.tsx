import HomeTemplate from '@/components/modules/home/templates'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HomeTemplate />
}
