'use client'

import { useState, useEffect } from 'react'
import { Project, TransparencyProof, CitizenFeedback } from '@/types'
import { MapPin, Calendar, DollarSign, User, CheckCircle, Clock, Flag, ExternalLink, Image, Receipt, FileText, Video, MessageCircle, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface ProjectDetailProps {
  projectId: string
}

// Sample data - in a real app, this would come from your API/state
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Laptop Distribution Project – Dhaka',
    description: 'Distribution of laptops to students in Dhaka division as part of digital education initiative. This project aims to bridge the digital divide and provide equal learning opportunities for all students, especially in remote areas. The initiative includes training programs for teachers and technical support for device maintenance. Blockchain technology is used to track each laptop from procurement to delivery, ensuring transparency and preventing fraud.',
    budget: { allocated: 50000000, spent: 35000000 },
    status: 'on-track',
    responsibleAuthority: {
      name: 'Dr. Mohammad Alamgir',
      department: 'Ministry of Education',
      profileLink: '/authority/alamgir'
    },
    region: 'Dhaka',
    ministry: 'Ministry of Education',
    category: 'ICT',
    deadline: '2025-03-15',
    startDate: '2024-09-01',
    transparencyProofs: [
      { id: 'p1', type: 'photo', url: 'https://via.placeholder.com/300x200?text=Laptop+Distribution+Event', description: 'Photo from distribution event in Mirpur', uploadedAt: '2024-11-20T10:00:00Z', ipfsHash: 'Qm...hash1' },
      { id: 'p2', type: 'document', url: 'https://via.placeholder.com/300x200?text=Procurement+Document', description: 'Procurement document for 5000 laptops', uploadedAt: '2024-10-01T14:00:00Z', ipfsHash: 'Qm...hash2' },
    ],
    blockchainHash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    location: { lat: 23.8103, lng: 90.4125 }
  },
  {
    id: '2',
    title: 'Rural Healthcare Centers – Chittagong',
    description: 'Construction of 25 new healthcare centers in rural areas of Chittagong division. These centers will provide essential medical services, including primary care, maternal health, and emergency response, to underserved communities. The project emphasizes sustainable construction practices and local employment. Real-time monitoring of construction progress and budget expenditure is enabled through IoT sensors and blockchain records.',
    budget: { allocated: 75000000, spent: 45000000 },
    status: 'delayed',
    responsibleAuthority: {
      name: 'Prof. Dr. Khaleda Begum',
      department: 'Ministry of Health',
      profileLink: '/authority/khaleda'
    },
    region: 'Chittagong',
    ministry: 'Ministry of Health',
    category: 'Healthcare',
    deadline: '2025-02-28',
    startDate: '2024-06-01',
    transparencyProofs: [
      { id: 'p3', type: 'photo', url: 'https://via.placeholder.com/300x200?text=Construction+Site+Update', description: 'Progress photo of a center in Cox\'s Bazar', uploadedAt: '2024-12-05T11:00:00Z', ipfsHash: 'Qm...hash3' },
    ],
    blockchainHash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234yz567abc123',
    location: { lat: 22.3569, lng: 91.7832 }
  },
  {
    id: '3',
    title: 'Digital Bangladesh Infrastructure',
    description: 'Fiber optic network expansion and digital infrastructure development across major cities. This ambitious project aims to provide high-speed internet access to all citizens, fostering economic growth and innovation. It includes laying thousands of kilometers of fiber optic cables, establishing data centers, and upgrading existing network infrastructure. The project is a key pillar of the government\'s vision for a "Smart Bangladesh".',
    budget: { allocated: 200000000, spent: 120000000 },
    status: 'flagged',
    responsibleAuthority: {
      name: 'Eng. Rashid Ahmed',
      department: 'Ministry of ICT',
      profileLink: '/authority/rashid'
    },
    region: 'Dhaka',
    ministry: 'Ministry of ICT',
    category: 'Infrastructure',
    deadline: '2025-06-30',
    startDate: '2024-01-01',
    transparencyProofs: [],
    blockchainHash: '0xghi789jkl012mno345pqr678stu901vwx234yz567abc123def456',
    location: { lat: 23.8103, lng: 90.4125 }
  },
  {
    id: '4',
    title: 'School Building Construction – Sylhet',
    description: 'Construction of 15 new school buildings in Sylhet division to improve education infrastructure. This project focuses on providing modern, safe, and conducive learning environments for students in underserved areas. Each school will include classrooms, libraries, science labs, and sanitation facilities. Community participation is encouraged throughout the construction phase to ensure local needs are met.',
    budget: { allocated: 30000000, spent: 30000000 },
    status: 'completed',
    responsibleAuthority: {
      name: 'Dr. Fatima Khatun',
      department: 'Ministry of Education',
      profileLink: '/authority/fatima'
    },
    region: 'Sylhet',
    ministry: 'Ministry of Education',
    category: 'Education',
    deadline: '2024-12-31',
    startDate: '2024-03-01',
    transparencyProofs: [],
    blockchainHash: '0xjkl012mno345pqr678stu901vwx234yz567abc123def456ghi789',
    location: { lat: 24.8949, lng: 91.8687 }
  }
]

// Sample feedback data (filtered by project ID in component)
const sampleFeedback: CitizenFeedback[] = [
  {
    id: 'f1',
    projectId: '1',
    content: 'The laptop distribution in our area was very well organized. All students received their laptops on time and the quality is good.',
    author: { name: 'Rahman Ahmed', location: 'Dhaka, Bangladesh' },
    credibilityScore: 95,
    isAuthentic: true,
    createdAt: '2024-12-18T10:30:00Z',
    upvotes: 24,
    downvotes: 2
  },
  {
    id: 'f2',
    projectId: '2',
    content: 'The healthcare center construction is delayed by 3 months. No workers have been seen at the site for weeks.',
    author: { name: 'Fatima Begum', location: 'Chittagong, Bangladesh' },
    credibilityScore: 88,
    isAuthentic: true,
    createdAt: '2024-12-17T15:45:00Z',
    upvotes: 18,
    downvotes: 1
  },
  {
    id: 'f3',
    projectId: '1',
    content: 'This is amazing! Best government project ever! Everyone should vote for this party!',
    author: { name: 'Anonymous User', location: 'Unknown' },
    credibilityScore: 25,
    isAuthentic: false,
    createdAt: '2024-12-15T20:30:00Z',
    upvotes: 2,
    downvotes: 15
  }
]

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [feedback, setFeedback] = useState<CitizenFeedback[]>([])

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    const foundProject = sampleProjects.find(p => p.id === projectId)
    setProject(foundProject || null)

    const projectFeedback = sampleFeedback.filter(f => f.projectId === projectId)
    setFeedback(projectFeedback)
  }, [projectId])

  if (!project) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Project not found
        </h3>
        <p className="text-gray-600">
          The project you are looking for does not exist or has been removed.
        </p>
        <Link href="/projects" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Back to Projects
        </Link>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="w-4 h-4 text-secondary-600" />
      case 'delayed':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'flagged':
        return <Flag className="w-4 h-4 text-accent-600" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-secondary-100 text-secondary-800'
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800'
      case 'flagged':
        return 'bg-accent-100 text-accent-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getProgressPercentage = (allocated: number, spent: number) => {
    return Math.round((spent / allocated) * 100)
  }

  const progressPercentage = getProgressPercentage(project.budget.allocated, project.budget.spent)

  const getProofIcon = (type: TransparencyProof['type']) => {
    switch (type) {
      case 'photo': return <Image className="w-4 h-4 mr-2 text-gray-500" />;
      case 'receipt': return <Receipt className="w-4 h-4 mr-2 text-gray-500" />;
      case 'document': return <FileText className="w-4 h-4 mr-2 text-gray-500" />;
      case 'video': return <Video className="w-4 h-4 mr-2 text-gray-500" />;
      default: return <ExternalLink className="w-4 h-4 mr-2 text-gray-500" />;
    }
  }

  const getCredibilityBadge = (score: number, isAuthentic: boolean) => {
    if (score >= 80 && isAuthentic) {
      return (
        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Authentic
        </div>
      )
    } else if (score < 50) {
      return (
        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Suspicious
        </div>
      )
    } else {
      return (
        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Reviewing
        </div>
      )
    }
  }

  const formatFeedbackDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {project.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {project.description}
            </p>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ml-4 ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
            <span>Region: <span className="font-medium">{project.region}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <User className="w-5 h-5 mr-2 text-gray-500" />
            <span>Authority: <span className="font-medium">{project.responsibleAuthority.name}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            <span>Deadline: <span className="font-medium">{formatDate(project.deadline)}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
            <span>Allocated Budget: <span className="font-medium">{formatCurrency(project.budget.allocated)}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
            <span>Spent Budget: <span className="font-medium">{formatCurrency(project.budget.spent)}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800`}>
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Progress</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span>Spent: {formatCurrency(project.budget.spent)}</span>
          <span>Allocated: {formatCurrency(project.budget.allocated)}</span>
        </div>
      </div>

      {/* Transparency Proofs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transparency Proofs</h2>
        {project.transparencyProofs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.transparencyProofs.map(proof => (
              <div key={proof.id} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-3">
                {getProofIcon(proof.type)}
                <div>
                  <a href={proof.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium text-sm">
                    {proof.description}
                  </a>
                  <p className="text-xs text-gray-500">Uploaded: {formatDate(proof.uploadedAt)}</p>
                  {proof.ipfsHash && (
                    <p className="text-xs text-gray-500 truncate">IPFS: {proof.ipfsHash}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No transparency proofs available for this project yet.</p>
        )}
      </div>

      {/* Blockchain Verification */}
      {project.blockchainHash && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Verification</h2>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-gray-700 font-medium">Data verified on blockchain</p>
              <p className="text-sm text-gray-500 break-all">Transaction Hash: {project.blockchainHash}</p>
              <a href={`https://etherscan.io/tx/${project.blockchainHash}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm flex items-center mt-1">
                View on Blockchain Explorer <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Citizen Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Citizen Feedback ({feedback.length})</h2>
        {feedback.length > 0 ? (
          <div className="space-y-4">
            {feedback.map(f => (
              <div key={f.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">{f.author.name}</div>
                      <div className="text-xs text-gray-500">{f.author.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCredibilityBadge(f.credibilityScore, f.isAuthentic)}
                    <div className="text-xs text-gray-500">{formatFeedbackDate(f.createdAt)}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{f.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <button className="flex items-center hover:text-green-600">
                    <ThumbsUp className="w-4 h-4 mr-1" /> {f.upvotes}
                  </button>
                  <button className="flex items-center hover:text-red-600">
                    <ThumbsDown className="w-4 h-4 mr-1" /> {f.downvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No citizen feedback available for this project yet.</p>
        )}
        <button className="mt-6 w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          Submit Feedback
        </button>
      </div>
    </div>
  )
}