'use client'

import { Footer } from '@/components/Footer'
import { Shield, Eye, TrendingUp, Users, Target, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About TransparenSee
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We re building a more transparent, accountable, and corruption-free government
            through technology, citizen engagement, and blockchain verification.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-primary/10 rounded-xl p-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-primary text-lg">
              To create a transparent government ecosystem where every project,
              promise, and public expenditure is visible, verifiable, and accountable
              to the citizens of Bangladesh.
            </p>
          </div>

          <div className="bg-secondary/10 rounded-xl p-8">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
            <p className="text-secondary text-lg">
              A Bangladesh where government transparency is the norm, corruption
              is minimized, and citizens have full visibility into how their
              tax money is being spent.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            How We Ensure Transparency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Blockchain Verification</h3>
              <p className="text-muted-foreground">
                All project data is stored on blockchain for immutable transparency and verification.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor project progress, budget allocation, and completion status in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Citizen Engagement</h3>
              <p className="text-muted-foreground">
                Empowering citizens to provide feedback, report issues, and hold authorities accountable.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-muted rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <div className="text-muted-foreground">Projects Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">৳12.4B</div>
              <div className="text-muted-foreground">Budget Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">15,247</div>
              <div className="text-muted-foreground">Active Citizens</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">73%</div>
              <div className="text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Built by Citizens, for Citizens
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            TransparenSee is developed by a team of passionate technologists,
            transparency advocates, and concerned citizens who believe in
            the power of technology to create positive change.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground">Open Source & Community Driven</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
