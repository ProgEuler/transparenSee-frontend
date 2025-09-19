'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Shield, Search } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TransparenSee</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/projects" className="text-muted-foreground hover:text-primary font-medium">
              Projects
            </Link>
            <Link href="/manifesto" className="text-muted-foreground hover:text-primary font-medium">
              Manifesto Tracker
            </Link>
            <Link href="/e-tender" className="text-muted-foreground hover:text-primary font-medium">
              E-Tender
            </Link>
            <Link href="/feedback" className="text-muted-foreground hover:text-primary font-medium">
              Feedback
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary font-medium">
              About
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring w-full"
                  />
                </div>
              </div>
              <Link
                href="/projects"
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/manifesto"
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Manifesto Tracker
              </Link>
              <Link
                href="/e-tender"
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                E-Tender
              </Link>
              <Link
                href="/feedback"
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="border-t pt-3 mt-3">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium mx-3 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
