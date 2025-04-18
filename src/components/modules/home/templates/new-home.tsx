import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "@tanstack/react-router"
import { Brush, Code, PersonStanding, Scroll } from "lucide-react"

const topics = [
	{ name: "HTML", icon: Code, slug: "html" },
	{ name: "CSS", icon: Brush, slug: "css" },
	{ name: "Javascript", icon: Scroll, slug: "javascript" },
	{ name: "Accessibility", icon: PersonStanding, slug: "accessibility" },
]

const NewHome = () => {
	const navigate = useNavigate()
	const handleClick = (slug: string) => {
		navigate({ to: `/quiz/${slug}`, params: { subject: slug } })
	}

	return (
		<div className="grid md:grid-cols-2 gap-6 md:gap-2 p-4">
			<div className="space-y-8">
				<h1 className="text-6xl">Welcome to</h1>
				<h1 className="text-7xl font-semibold">Quizdom</h1>
				<p className="italic text-lg">Pick a subject to get started</p>
			</div>
			<div className="space-y-4" id="topics">
				{topics.map((topic) => (
					<Card
						key={topic.slug}
						className="w-full rounded-3xl cursor-pointer hover:shadow-lg transition"
						onClick={() => handleClick(topic.slug)}
					>
						<CardContent className="flex space-x-4 items-center">
							<div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
								<topic.icon className="h-8 w-8 text-blue-500" />
							</div>
							<span className="text-2xl font-semibold">
								{topic.name}
							</span>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default NewHome