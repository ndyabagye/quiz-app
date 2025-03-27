import { WelcomeHeader } from '../components/quiz/welcome-header'
import { SubjectCard } from '../components/quiz/subject-card'
import { toast } from 'sonner'

const subjects = [
	{
		id: 'ancient',
		title: 'Ancient Civilizations',
		description: 'Egypt, Greece, Rome, and more',
		icon: '🏛️'
	},
	{
		id: 'medieval',
		title: 'Medieval Times',
		description: 'Knights, castles, and kingdoms',
		icon: '⚔️'
	},
	{
		id: 'modern',
		title: 'Modern History',
		description: 'World wars and revolutions',
		icon: '🌍'
	},
	{
		id: 'american',
		title: 'American History',
		description: 'From colonies to superpower',
		icon: '🇺🇸'
	}
]

const HomeTemplate = () => {
	const handleSubjectSelect = (subjectId: string) => {
		toast.info(`Selected: ${subjects.find(s => s.id === subjectId)?.title}`, {
			action: {
				label: 'Continue',
				onClick: () => console.log('Navigating to quiz...')
			}
		})
	}

	return (
		<div className="space-y-8">
			<WelcomeHeader
				title="History Quiz Challenge"
				subtitle="Test your knowledge of world history"
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{subjects.map((subject) => (
					<SubjectCard
						key={subject.id}
						icon={subject.icon}
						title={subject.title}
						description={subject.description}
						onClick={() => handleSubjectSelect(subject.id)}
					/>
				))}
			</div>
		</div>
	)
}

export default HomeTemplate