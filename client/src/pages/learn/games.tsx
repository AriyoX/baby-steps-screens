import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { motion } from "framer-motion"

interface Game {
  id: number
  title: string
  icon: string
  description: string
}

const GameCard = ({ game, onSelect }: { game: Game; onSelect: () => void }) => (
  <Card 
    onClick={onSelect}
    className="bg-white hover:shadow-xl transition-shadow cursor-pointer"
  >
    <CardContent className="p-6">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl">
        {game.icon}
      </div>
      <h2 className="text-xl font-bold mb-2">{game.title}</h2>
      <p className="text-sm text-gray-600">{game.description}</p>
    </CardContent>
  </Card>
)

export default function Games() {
  const [games] = useState<Game[]>([
    { 
      id: 1, 
      title: "Memory Match", 
      icon: "🎴", 
      description: "Match Buganda symbols and win!" 
    },
    { 
      id: 2, 
      title: "Word Scramble", 
      icon: "🔤", 
      description: "Unscramble Luganda words" 
    },
    { 
      id: 3, 
      title: "Drum Rhythm", 
      icon: "🥁", 
      description: "Follow the beat of Buganda drums" 
    },
    { 
      id: 4, 
      title: "Dress Up", 
      icon: "👘", 
      description: "Dress characters in traditional Buganda attire" 
    }
  ])

  const handleGameSelect = (gameId: number) => {
    // In a real app, this would start the selected game
    console.log(`Selected game: ${gameId}`)
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <h1 className="text-2xl font-bold mb-4">Fun Games</h1>
        <p className="text-lg mb-6 text-gray-600">
          Choose a game and have fun learning about Buganda culture!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onSelect={() => handleGameSelect(game.id)} 
            />
          ))}
        </div>
      </motion.div>
      <BottomNav />
    </div>
  )
}