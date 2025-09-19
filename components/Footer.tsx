import Link from 'next/link'
import { Shield, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TransparenSee</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Bringing transparency to government projects through blockchain technology 
              and citizen engagement. See the promises, track the truth, limit corruption.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@transparensee.gov.bd</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+880 2 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="/manifesto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Manifesto Tracker
                </Link>
              </li>
              <li>
                <Link href="/e-tender" className="text-muted-foreground hover:text-foreground transition-colors">
                  E-Tender
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">
                  Citizen Feedback
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Access
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm">
              © 2025 TransparenSee Dashboard. All rights reserved.
            </div>
            <div className="text-muted-foreground text-sm mt-4 md:mt-0">
              Built with transparency and accountability in mind
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}