import { cn } from '@/lib/utils'

interface WelcomeHeaderProps {
  title: string
  subtitle: string
  className?: string
}

export const WelcomeHeader = ({ title, subtitle, className }: WelcomeHeaderProps) => {
  return (
    <div className={cn('text-center space-y-2', className)}>
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-950 dark:text-indigo-50">
        {title}
      </h1>
      <p className="text-lg text-indigo-800/80 dark:text-indigo-200/80">
        {subtitle}
      </p>
    </div>
  )
}