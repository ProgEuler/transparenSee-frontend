"use client"

import { useState } from "react"
import {
  CitizenFeedback,
  FeedbackAttachment,
} from "@/types/index"
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Image,
  Link as LinkIcon,
  FolderKanban,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

export function FeedbackHub() {
  const [newFeedbackContent, setNewFeedbackContent] = useState("")
  const [newFeedbackProjectId, setNewFeedbackProjectId] = useState<
    string | undefined
  >(undefined)
  const [newFeedbackTenderId, setNewFeedbackTenderId] = useState<
    string | undefined
  >(undefined)
  const [newFeedbackImage, setNewFeedbackImage] = useState<string>("")
  const [sortBy, setSortBy] = useState<"recent" | "credible" | "flagged">(
    "recent"
  )

  const [feedbackData, setFeedbackData] = useState<CitizenFeedback[]>([
    {
      id: "1",
      projectId: "1",
      content:
        "The laptop distribution in our area was very well organized. All students received their laptops on time and the quality is good.",
      author: {
        name: "Rahman Ahmed",
        location: "Dhaka, Bangladesh",
      },
      credibilityScore: 95,
      isAuthentic: true,
      createdAt: "2024-12-18T10:30:00Z",
      upvotes: 24,
      downvotes: 2,
      attachments: [
        {
          id: "att1",
          url: "https://via.placeholder.com/150?text=Laptop+Event",
          type: "image",
          fileName: "laptop_event.jpg",
        },
      ],
    },
    {
      id: "2",
      projectId: "2",
      content:
        "The healthcare center construction is delayed by 3 months. No workers have been seen at the site for weeks.",
      author: {
        name: "Fatima Begum",
        location: "Chittagong, Bangladesh",
      },
      credibilityScore: 88,
      isAuthentic: true,
      createdAt: "2024-12-17T15:45:00Z",
      upvotes: 18,
      downvotes: 1,
      attachments: [
        {
          id: "att2",
          url: "https://via.placeholder.com/150?text=Construction+Delay",
          type: "image",
          fileName: "construction_delay.jpg",
        },
      ],
    },
    {
      id: "3",
      tenderId: "t1",
      content:
        "Great project! The internet speed has improved significantly in our area.",
      author: {
        name: "Karim Hassan",
        location: "Sylhet, Bangladesh",
      },
      credibilityScore: 92,
      isAuthentic: true,
      createdAt: "2024-12-16T09:15:00Z",
      upvotes: 31,
      downvotes: 0,
    },
    {
      id: "4",
      projectId: "1",
      content:
        "This is amazing! Best government project ever! Everyone should vote for this party!",
      author: {
        name: "Anonymous User",
        location: "Unknown",
      },
      credibilityScore: 25,
      isAuthentic: false,
      createdAt: "2024-12-15T20:30:00Z",
      upvotes: 2,
      downvotes: 15,
    },
  ])

  const projectTitles: Record<string, string> = {
    "1": "Laptop Distribution Project – Dhaka",
    "2": "Rural Healthcare Centers – Chittagong",
    "3": "Digital Bangladesh Infrastructure",
  }

  const tenderTitles: Record<string, string> = {
    t1: "Procurement of Laptops (2024/EDU/001)",
    t2: "Construction of Rural Road (2024/INFRA/005)",
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

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const sortedFeedback = [...feedbackData].sort((a, b) => {
    switch (sortBy) {
      case "credible":
        return b.credibilityScore - a.credibilityScore
      case "flagged":
        return a.credibilityScore - b.credibilityScore
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }
  })

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (newFeedbackContent.trim()) {
      const newId = (feedbackData.length + 1).toString()
      const newAttachments: FeedbackAttachment[] = newFeedbackImage.trim()
        ? [
            {
              id: `att${newId}`,
              url: newFeedbackImage.trim(),
              type: "image",
              fileName: "uploaded_image.jpg",
            },
          ]
        : []

      const newFeedbackItem: CitizenFeedback = {
        id: newId,
        projectId: newFeedbackProjectId,
        tenderId: newFeedbackTenderId,
        content: newFeedbackContent,
        author: {
          name: "Current User",
          location: "Dhaka, Bangladesh",
        },
        credibilityScore: 70,
        isAuthentic: false,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        attachments: newAttachments,
      }

      setFeedbackData((prev) => [newFeedbackItem, ...prev])
      setNewFeedbackContent("")
      setNewFeedbackProjectId(undefined)
      setNewFeedbackTenderId(undefined)
      setNewFeedbackImage("")
    }
  }

  return (
    <div className="space-y-8">
      {/* Feedback form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Share Your Feedback
        </h2>
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <textarea
            value={newFeedbackContent}
            onChange={(e) => setNewFeedbackContent(e.target.value)}
            placeholder="Share your experience with government projects, report issues, or provide suggestions..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={4}
            required
          />

          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Image className="w-4 h-4 inline mr-1" />
              Upload Image (URL for demo)
            </label>
            <input
              type="text"
              id="image-upload"
              value={newFeedbackImage}
              onChange={(e) => setNewFeedbackImage(e.target.value)}
              placeholder="Paste image URL here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Your feedback will be tagged with your location and verified for
              authenticity.
            </span>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Sort controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Citizen Feedback ({feedbackData.length})
        </h2>
        <div className="flex space-x-2">
          {(["recent", "credible", "flagged"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSortBy(type)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                sortBy === type
                  ? "bg-primary-100 text-primary-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type === "recent"
                ? "Most Recent"
                : type === "credible"
                ? "Most Credible"
                : "Flagged Issues"}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback cards */}
      <div className="space-y-4">
        {sortedFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {feedback.author.name}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {feedback.author.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getCredibilityBadge(
                  feedback.credibilityScore,
                  feedback.isAuthentic
                )}
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(feedback.createdAt)}
                </div>
              </div>
            </div>

            {/* Linked project/tender */}
            {(feedback.projectId || feedback.tenderId) && (
              <div className="mb-3 text-sm text-gray-600 flex items-center space-x-2">
                {feedback.projectId && (
                  <Link
                    href={`/projects/${feedback.projectId}`}
                    className="flex items-center text-primary-600 hover:underline"
                  >
                    <FolderKanban className="w-4 h-4 mr-1" />
                    Project:{" "}
                    {projectTitles[feedback.projectId] ||
                      `ID: ${feedback.projectId}`}
                  </Link>
                )}
                {feedback.tenderId && (
                  <Link
                    href="/e-tender"
                    className="flex items-center text-primary-600 hover:underline"
                  >
                    <Briefcase className="w-4 h-4 mr-1" />
                    E-Tender:{" "}
                    {tenderTitles[feedback.tenderId] ||
                      `ID: ${feedback.tenderId}`}
                  </Link>
                )}
              </div>
            )}

            {/* Content */}
            <p className="mb-4 text-gray-700 leading-relaxed">
              {feedback.content}
            </p>

            {/* Attachments */}
            {feedback.attachments && feedback.attachments.length > 0 && (
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {feedback.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src={attachment.url}
                      alt={attachment.fileName || "Feedback attachment"}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <LinkIcon className="w-6 h-6 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-green-600">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {feedback.upvotes}
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-red-600">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {feedback.downvotes}
                </button>
                <button className="text-sm text-gray-600 hover:text-primary-600">
                  Reply
                </button>
                <button className="text-sm text-gray-600 hover:text-accent-600">
                  Flag
                </button>
              </div>
              <span className="text-sm text-gray-500">
                Credibility Score: {feedback.credibilityScore}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="text-center">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
          Load More Feedback
        </button>
      </div>
    </div>
  )
}
