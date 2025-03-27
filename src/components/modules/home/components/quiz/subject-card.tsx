import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SubjectCardProps {
  icon: string | ReactNode
  title: string
  description: string
  onClick: () => void
  className?: string
}

export const SubjectCard = ({
  icon,
  title,
  description,
  onClick,
  className
}: SubjectCardProps) => {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all',
        'hover:shadow-lg hover:shadow-indigo-500/10',
        'hover:border-indigo-500 hover:bg-indigo-50/20',
        'active:scale-[0.98] active:bg-indigo-50/30',
        'dark:hover:shadow-indigo-400/20 dark:hover:bg-indigo-900/20',
        'dark:hover:border-indigo-400',
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-indigo-950 dark:text-indigo-50">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-indigo-800/80 dark:text-indigo-200/80">{description}</p>
      </CardContent>
    </Card>
  )
}