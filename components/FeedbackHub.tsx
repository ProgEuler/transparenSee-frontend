'use client'

import { useState } from 'react'
import { CitizenFeedback } from '@/types'
import { MessageCircle, ThumbsUp, ThumbsDown, MapPin, Clock, CheckCircle, AlertTriangle, Send } from 'lucide-react'

export function FeedbackHub() {
  const [newFeedback, setNewFeedback] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'credible' | 'flagged'>('recent')

  // Sample feedback data
  const feedbackData: CitizenFeedback[] = [
    {
      id: '1',
      projectId: '1',
      content: 'The laptop distribution in our area was very well organized. All students received their laptops on time and the quality is good.',
      author: {
        name: 'Rahman Ahmed',
        location: 'Dhaka, Bangladesh'
      },
      credibilityScore: 95,
      isAuthentic: true,
      createdAt: '2024-12-18T10:30:00Z',
      upvotes: 24,
      downvotes: 2
    },
    {
      id: '2',
      projectId: '2',
      content: 'The healthcare center construction is delayed by 3 months. No workers have been seen at the site for weeks.',
      author: {
        name: 'Fatima Begum',
        location: 'Chittagong, Bangladesh'
      },
      credibilityScore: 88,
      isAuthentic: true,
      createdAt: '2024-12-17T15:45:00Z',
      upvotes: 18,
      downvotes: 1
    },
    {
      id: '3',
      projectId: '3',
      content: 'Great project! The internet speed has improved significantly in our area.',
      author: {
        name: 'Karim Hassan',
        location: 'Sylhet, Bangladesh'
      },
      credibilityScore: 92,
      isAuthentic: true,
      createdAt: '2024-12-16T09:15:00Z',
      upvotes: 31,
      downvotes: 0
    },
    {
      id: '4',
      projectId: '1',
      content: 'This is amazing! Best government project ever! Everyone should vote for this party!',
      author: {
        name: 'Anonymous User',
        location: 'Unknown'
      },
      credibilityScore: 25,
      isAuthentic: false,
      createdAt: '2024-12-15T20:30:00Z',
      upvotes: 2,
      downvotes: 15
    }
  ]

  const getCredibilityBadge = (score: number, isAuthentic: boolean) => {
    if (score >= 80 && isAuthentic) {
      return (
        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Authentic
        </div>
      )
    } else if (score < 50) {
      return (
        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Suspicious
        </div>
      )
    } else {
      return (
        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Reviewing
        </div>
      )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const sortedFeedback = [...feedbackData].sort((a, b) => {
    switch (sortBy) {
      case 'credible':
        return b.credibilityScore - a.credibilityScore
      case 'flagged':
        return a.credibilityScore - b.credibilityScore
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (newFeedback.trim()) {
      // Handle feedback submission
      console.log('Submitting feedback:', newFeedback)
      setNewFeedback('')
    }
  }

  return (
    <div className="space-y-8">
      {/* Submit Feedback Form */}
      <div className="bg-card rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Share Your Feedback
        </h2>
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <div>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Share your experience with government projects, report issues, or provide suggestions..."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring resize-none"
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Your feedback will be automatically tagged with your location and verified for authenticity.
            </div>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Filter and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Citizen Feedback ({feedbackData.length})
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              sortBy === 'recent'
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('credible')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              sortBy === 'credible'
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Most Credible
          </button>
          <button
            onClick={() => setSortBy('flagged')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              sortBy === 'flagged'
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Flagged Issues
          </button>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {sortedFeedback.map(feedback => (
          <div key={feedback.id} className="bg-card rounded-xl shadow-sm border p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{feedback.author.name}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {feedback.author.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getCredibilityBadge(feedback.credibilityScore, feedback.isAuthentic)}
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(feedback.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-muted-foreground leading-relaxed">
                {feedback.content}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-muted-foreground hover:text-green-500">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {feedback.upvotes}
                </button>
                <button className="flex items-center text-sm text-muted-foreground hover:text-red-500">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {feedback.downvotes}
                </button>
                <button className="text-sm text-muted-foreground hover:text-primary">
                  Reply
                </button>
                <button className="text-sm text-muted-foreground hover:text-accent">
                  Flag
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                Credibility Score: {feedback.credibilityScore}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 font-medium">
          Load More Feedback
        </button>
      </div>
    </div>
  )
}
