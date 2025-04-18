import Layout from '@/components/modules/layout/templates'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Layout/>
}
