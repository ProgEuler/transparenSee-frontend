
import { CreateProjectForm } from '@/components/CreateProjectForm'

export default function CreateProjectPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Project</h1>
        <CreateProjectForm />
      </div>
    </div>
  )
}
