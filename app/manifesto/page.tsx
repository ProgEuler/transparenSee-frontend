'use client'

import { Footer } from '@/components/Footer'
import { ManifestoTracker } from '@/components/ManifestoTracker'

export default function ManifestoPage() {
  return (
    <main className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ManifestoTracker />
      </div>

      <Footer />
    </main>
  )
}
