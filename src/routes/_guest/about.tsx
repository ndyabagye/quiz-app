import AboutTemplate from '@/components/modules/about/templates'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AboutTemplate />
}