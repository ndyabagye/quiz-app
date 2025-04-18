import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockQuestions } from '@/lib/mockQuestions'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { CheckCircle, XCircle } from 'lucide-react'
import { useReducer } from 'react'

// Define quiz state and actions
type QuizState = {
  currentIndex: number
  selectedIndex: number | null
  isCorrect: boolean | null
  answers: { selected: number; correct: number }[]
  completed: boolean
}

type QuizAction =
  | { type: 'SELECT_ANSWER'; selectedIndex: number; correctIndex: number }
  | { type: 'NEXT_QUESTION'; total: number }
  | { type: 'RESET' }

const initialState: QuizState = {
  currentIndex: 0,
  selectedIndex: null,
  isCorrect: null,
  answers: [],
  completed: false,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SELECT_ANSWER': {
      const isCorrect = action.selectedIndex === action.correctIndex
      return {
        ...state,
        selectedIndex: action.selectedIndex,
        isCorrect,
        answers: [
          ...state.answers,
          {
            selected: action.selectedIndex,
            correct: action.correctIndex,
          },
        ],
      }
    }
    case 'NEXT_QUESTION': {
      const nextIndex = state.currentIndex + 1
      const completed = nextIndex >= action.total
      return {
        ...state,
        currentIndex: nextIndex,
        selectedIndex: null,
        isCorrect: null,
        completed,
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const Route = createFileRoute('/_auth/quiz')({
  component: RouteComponent,
})

function RouteComponent() {
  const { subject } = useParams({ strict: false }) as {
    subject: keyof typeof mockQuestions
  }

  const questions = mockQuestions[subject] || []
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const question = questions[state.currentIndex]
  const score = state.answers.filter((a) => a.selected === a.correct).length

  if (state.completed) {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-4 min-h-full place-items-start p-6">
          <div className=" flex flex-col items-center justify-start h-full text-center gap-6 mt-8">
            <h1 className="text-4xl font-bold">Quiz Completed 🎉</h1>
            <p className="text-lg">You scored {score} out of {questions.length}</p>
          </div>
          <div className="w-full flex flex-col space-y-8">
            <Card className='bg-muted-background shadow-2xl'>
              <CardContent className='flex flex-col space-y-10 items-center justify center'>
                <span className="text-2xl font-semibold uppercase">{subject}</span>
                <p className='text-4xl'>{score}</p>
                <p className='text-2xl'>Out of {questions.length}</p>
              </CardContent>
            </Card>
            <Button
              className="w-full rounded-lg p-6"
              size="lg"
              onClick={() => dispatch({ type: 'RESET' })}
              >
              RETRY QUIZ
              {/* <Link to="/home" className='text-xl'>Play Again</Link> */}
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center h-full text-center gap-6 mt-8">
          <h1 className="text-4xl font-bold">Quiz Completed 🎉</h1>
          <p className="text-lg">You scored {score} out of {questions.length}</p>
          <Progress value={(score / questions.length) * 100} />
          <Button onClick={() => dispatch({ type: 'RESET' })}>Retry Quiz</Button>
        </div> */}
      </>
    )
  }

  return (
    <>
      <div className="flex space-x-4 items-center -mt-6 p-4">
        <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
          A
        </div>
        <span className="text-2xl font-semibold capitalize">{subject}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 min-h-full place-items-start p-6">
        <div className="mx-auto space-y-8 h-full flex flex-col md:justify-between">
          <div className="space-y-8">
            <p className="italic text-lg">
              Question {state.currentIndex + 1} of {questions.length}
            </p>
            <h2 className="text-3xl font-semibold">{question.question}</h2>
          </div>

          <Progress value={(state.currentIndex / questions.length) * 100} className='md:mb-20' />
        </div>

        <div className="p-4 space-y-6 md:col-span-2 w-full mx-auto">
          <div className="space-y-4">
            {question.options.map((option, i) => {
              const isSelected = state.selectedIndex === i
              const isAnswer = question.answer === i

              let border = 'border'
              let icon = null
              if (state.selectedIndex !== null) {
                if (isSelected && state.isCorrect) {
                  border = 'border-green-500'
                  icon = <CheckCircle className="text-green-500 w-5 h-5" />
                } else if (isSelected && !state.isCorrect) {
                  border = 'border-red-500'
                  icon = <XCircle className="text-red-500 w-5 h-5" />
                } else if (isAnswer && !state.isCorrect) {
                  border = 'border-green-500'
                  icon = <CheckCircle className="text-green-500 w-5 h-5" />
                }
              }

              return (
                <Card
                  key={i}
                  className={`cursor-pointer ${border} ${isSelected ? 'ring-2' : ''}`}
                  onClick={() =>
                    state.selectedIndex === null &&
                    dispatch({
                      type: 'SELECT_ANSWER',
                      selectedIndex: i,
                      correctIndex: question.answer,
                    })
                  }
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <span>{option}</span>
                    {icon}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button
            onClick={() => dispatch({ type: 'NEXT_QUESTION', total: questions.length })}
            disabled={state.selectedIndex === null}
          >
            {state.currentIndex >= questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </>
  )
}
