import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { motion } from "framer-motion"

interface Exhibit {
  id: number
  name: string
  icon: string
  description: string
  facts: string[]
}

const ExhibitCard = ({ exhibit, onSelect }: { exhibit: Exhibit; onSelect: () => void }) => (
  <Card 
    onClick={onSelect}
    className="bg-white hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
  >
    <CardContent className="p-6">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl">
        {exhibit.icon}
      </div>
      <h3 className="font-bold text-center mb-2">{exhibit.name}</h3>
      <p className="text-sm text-gray-600 text-center">{exhibit.description}</p>
    </CardContent>
  </Card>
)

const ExhibitModal = ({
  isOpen,
  onClose,
  exhibit,
}: {
  isOpen: boolean
  onClose: () => void
  exhibit: Exhibit | null
}) => {
  if (!isOpen || !exhibit) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">{exhibit.name}</h2>
          <p className="mb-4">{exhibit.description}</p>
          <div className="space-y-2">
            <h3 className="font-bold">Interesting Facts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {exhibit.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6"
          >
            Close
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VirtualMuseum() {
  const [exhibits] = useState<Exhibit[]>([
    {
      id: 1,
      name: "Royal Drums",
      icon: "🥁",
      description: "Discover the sacred drums of the Buganda Kingdom",
      facts: [
        "The royal drums were used to announce important ceremonies",
        "Each drum had its own unique sound and meaning",
        "The biggest royal drum is called 'Mujaguzo'"
      ]
    },
    {
      id: 2,
      name: "Traditional Clothing",
      icon: "👘",
      description: "Learn about Buganda's traditional dress",
      facts: [
        "Bark cloth was the traditional material used",
        "The Gomesi is the traditional dress for women",
        "The Kanzu is the traditional attire for men"
      ]
    },
    {
      id: 3,
      name: "Royal Artifacts",
      icon: "👑",
      description: "Explore the treasures of the Kabaka",
      facts: [
        "The royal spears symbolize authority",
        "The royal throne is called 'Namulondo'",
        "Each artifact has a unique historical significance"
      ]
    }
  ])
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleExhibitSelect = (exhibit: Exhibit) => {
    setSelectedExhibit(exhibit)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <h1 className="text-2xl font-bold mb-4">Virtual Museum</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exhibits.map((exhibit) => (
            <ExhibitCard 
              key={exhibit.id} 
              exhibit={exhibit} 
              onSelect={() => handleExhibitSelect(exhibit)} 
            />
          ))}
        </div>
      </motion.div>
      <ExhibitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        exhibit={selectedExhibit}
      />
      <BottomNav />
    </div>
  )
}