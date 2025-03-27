import AboutTemplate from '@/components/modules/about/templates'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AboutTemplate />
}
