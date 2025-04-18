import { Button } from '@/components/ui/button'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/quiz/$subject')({
  component: RouteComponent,
})

const mockQuestions = {
  html: [
    {
      question: "What does HTML stand for?",
      options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
      answer: 1,
    },
  ],
  css: [
    {
      question: "Which property is used to change the background color?",
      options: ["color", "background-color", "bg-color"],
      answer: 1,
    },
  ],
  javascript: [
    {
      question: "Which of these is a JavaScript data type?",
      options: ["Float", "Number", "Decimal"],
      answer: 1,
    },
  ],
  accessibility: [
    {
      question: "What does WCAG stand for?",
      options: ["Web Content Accessibility Guidelines", "Web Code Access Group", "World Committee for Accessible Graphics"],
      answer: 0,
    },
  ],
}

function RouteComponent() {
  const { subject } = useParams({ strict: false })
  const questions = mockQuestions[subject as keyof typeof mockQuestions] || []

  return (
    <>
      <div className="p-4 space-y-6">
      <h2 className="text-4xl font-bold capitalize">{subject} Quiz</h2>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((q, index) => (
          <div key={index} className="p-4 bg-muted rounded-xl space-y-4">
            <h3 className="text-xl font-semibold">
              Q{index + 1}: {q.question}
            </h3>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <Button key={i} variant="outline" className="w-full justify-start">
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </>
  )
}
