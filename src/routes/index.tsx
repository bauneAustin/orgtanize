import { createFileRoute } from '@tanstack/react-router'
import {
  ListTodo,
  CalendarCheck2,
  ChartNoAxesCombined,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const features = [
    {
      icon: <ListTodo className="w-12 h-12 text-primary-dark" />,
      title: 'ToDo List',
      description:
        'Keep track of important tasks with priorities, due dates, and categorization.',
    },
    {
      icon: <CalendarCheck2 className="w-12 h-12 text-primary-dark" />,
      title: 'Calendar',
      description:
        'Integrate with Google Calendar for a quick view of upcoming events.',
    },
    {
      icon: <ChartNoAxesCombined className="w-12 h-12 text-primary-dark" />,
      title: 'Analytics',
      description:
        'See accomplished tasks and track your progression.',
    },
]

  return (
    <div className="min-h-screen bg-primary-dark">
      <section className="relative py-34 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-surface-light"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              <span className="bg-gradient-to-r from-blue-light to-accent-dark bg-clip-text text-transparent">
                Orgtanize
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-text-dark mb-4 font-light">
            A place to keep organized and track your progress.
          </p>
          <p className="text-lg text-text max-w-3xl mx-auto mb-8">
	    Built and powered by Tanstack. Currently used for learning purposes.
          </p>
          <div className="flex flex-col items-center gap-4 cursor-pointer">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary-dark hover:bg-primary-light text-white font-semibold rounded-lg transition-colors shadow-lg shadow-accent-dark"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface-light backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-text leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
