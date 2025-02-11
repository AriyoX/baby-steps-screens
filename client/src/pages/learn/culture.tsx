"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { motion } from "framer-motion"

interface Lesson {
  id: number
  title: string
  icon: string
  progress: number
}

const LessonCard = ({ lesson, onSelect }: { lesson: Lesson; onSelect: () => void }) => (
  <Card 
    onClick={onSelect}
    className="bg-white hover:shadow-xl transition-shadow cursor-pointer"
  >
    <CardContent className="p-6">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl">
        {lesson.icon}
      </div>
      <h3 className="font-bold text-center mb-2">{lesson.title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-600 h-2.5 rounded-full" 
          style={{ width: `${lesson.progress}%` }}
        />
      </div>
    </CardContent>
  </Card>
)

const QuizModal = ({
  isOpen,
  onClose,
  quiz,
  onComplete,
}: {
  isOpen: boolean
  onClose: () => void
  quiz: any
  onComplete: (score: number) => void
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  if (!isOpen) return null

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1)
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(score + (isCorrect ? 1 : 0))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
          {currentQuestion < quiz.questions.length ? (
            <>
              <p className="mb-4">{quiz.questions[currentQuestion].question}</p>
              <div className="space-y-2">
                {quiz.questions[currentQuestion].answers.map((answer: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index === quiz.questions[currentQuestion].correctAnswer)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mb-4">
                Quiz completed! Your score: {score}/{quiz.questions.length}
              </p>
              <button
                onClick={onClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function BugandaCulture() {
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, title: "Greetings", icon: "👋", progress: 80 },
    { id: 2, title: "Cultural Values", icon: "🏺", progress: 60 },
    { id: 3, title: "Traditional Foods", icon: "🍲", progress: 40 },
    { id: 4, title: "Customs", icon: "👑", progress: 20 },
  ])
  const [quizOpen, setQuizOpen] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<any>(null)

  const handleLessonSelect = (lessonId: number) => {
    const quizData = {
      title: `Quiz for ${lessons.find((l) => l.id === lessonId)?.title}`,
      questions: [
        {
          question: 'What is "Hello" in Luganda?',
          answers: ["Oli otya", "Weraba", "Mwebale", "Ssebo"],
          correctAnswer: 0,
        },
        {
          question: 'What is the traditional Buganda greeting gesture?',
          answers: ["Handshake", "Bow", "Curtsy", "Wave"],
          correctAnswer: 1,
        },
      ],
    }
    setCurrentQuiz(quizData)
    setQuizOpen(true)
  }

  const handleQuizComplete = (score: number) => {
    setQuizOpen(false)
    setLessons(
      lessons.map((lesson) =>
        lesson.id === currentQuiz.id ? { ...lesson, progress: Math.min(100, lesson.progress + 20) } : lesson
      )
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <h1 className="text-2xl font-bold mb-4">Learn Buganda Culture</h1>
        <div className="grid grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              onSelect={() => handleLessonSelect(lesson.id)} 
            />
          ))}
        </div>
      </motion.div>
      <QuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        quiz={currentQuiz}
        onComplete={handleQuizComplete}
      />
      <BottomNav />
    </div>
  )
}