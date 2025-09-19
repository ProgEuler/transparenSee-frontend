'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProjectDetail } from '@/components/ProjectDetail'

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <main className="min-h-screen bg-muted/40">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectDetail projectId={params.id} />
      </div>

      <Footer />
    </main>
  )
}
