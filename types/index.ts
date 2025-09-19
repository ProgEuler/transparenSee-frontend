export interface Project {
  id: number;
  name: string;
  description: string;
  from: string;
  to: string;
  status: "live" | "closed" | "postponed";
  category: string;
  division: string;
  address: string;
  ministry: string;
  org: string;
  tag?: string[];
  budget: number;
  file?: any;
  fileFeedKey?: string;
  filePath?: string;
}

export interface TransparencyProof {
  id: string
  type: 'photo' | 'receipt' | 'document' | 'video'
  url: string
  description: string
  uploadedAt: string
  ipfsHash?: string
}

export interface FeedbackAttachment {
  id: string;
  url: string;
  type: 'image' | 'document' | 'video'; // Assuming images for now
  fileName?: string;
}

export interface CitizenFeedback {
  id: string
  projectId?: string // Optional: Link to a specific project
  tenderId?: string // Optional: Link to a specific tender
  content: string
  author: {
    name: string
    location: string
  }
  credibilityScore: number
  isAuthentic: boolean
  createdAt: string
  upvotes: number
  downvotes: number
  attachments?: FeedbackAttachment[] // New: Array of attachments
}

export interface ManifestoPromise {
  id: string
  title: string
  description: string
  status: 'not-started' | 'in-progress' | 'fulfilled' | 'broken'
  progress: number
  timeline: {
    promise: string
    budget: string
    delivery: string
    verification: string
  }
  relatedProjects: string[]
}

export interface DashboardStats {
  totalProjects: number
  totalBudget: number
  completionRate: number
  flaggedIssues: number
}

export interface FilterOptions {
  region?: string
  ministry?: string
  category?: string
  status?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface ETenderProposal {
  id: string
  refNo: string
  type: string
  status: 'live' | 'closed' | 'awarded' | 'cancelled'
  title: string; // Added title property
  description: string
  ministry: string
  procuringEntity: string
  procuringType: string
  publishingDate: string
  closingDate: string
}

export interface ETenderFilterOptions {
  ministry?: string
  procuringEntity?: string
  procuringType?: string
  publishingDateFrom?: string
  publishingDateTo?: string
  closingDateFrom?: string
  closingDateTo?: string
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'citizen' | 'local-authority';
  status: 'active' | 'suspended';
  registeredAt: string;
  lastLogin: string;
}
