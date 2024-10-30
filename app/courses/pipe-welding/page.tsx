'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, DollarSign, ArrowLeft, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

export default function PipeWeldingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    hours: '',
    preferredTime: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    
    try {
      if (!formData.name || !formData.email || !formData.phone || 
          !formData.experience || !formData.goals || !formData.hours || 
          !formData.preferredTime) {
        throw new Error('Please fill in all required fields')
      }

      console.log('Attempting to write to Firebase...')
      
      const registrationData = {
        ...formData,
        createdAt: new Date().toISOString(),
        type: 'one-on-one-training',
        hours: Number(formData.hours)
      }
      
      console.log('Data to be submitted:', registrationData)
      
      const docRef = await addDoc(collection(db, 'registrations'), registrationData)
      
      console.log('Document written with ID:', docRef.id)
      setSubmitStatus('success')
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        goals: '',
        hours: '',
        preferredTime: ''
      })
    } catch (error) {
      console.error('Firebase Error:', error)
      setSubmitStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-200">
      <header className="bg-zinc-900/50 border-b border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-sm mb-6 text-zinc-400 hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-200 text-transparent bg-clip-text">
            Pipe Welding Course
          </h1>
          <p className="text-xl text-zinc-400">
            Expert pipe welding instruction tailored to your certification goals
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Course Overview Card */}
          <Card className="border border-zinc-800 bg-zinc-900/50 shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="text-zinc-100">Course Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">Individual Attention from Expert Instructor</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">Flexible Duration - Book by the Hour</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">Schedule at Your Convenience</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">$95/hour - Minimum 4 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits and Training Areas Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border border-zinc-800 bg-zinc-900/50 shadow-lg shadow-black/10">
              <CardHeader>
                <CardTitle className="text-zinc-100">Benefits of Pipe Welding Training</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-zinc-300">
                  <li>Master various pipe welding positions (2G, 5G, 6G)</li>
                  <li>Learn proper pipe preparation and fit-up</li>
                  <li>Practice root, hot, fill and cap passes</li>
                  <li>Certification preparation and guidance</li>
                  <li>Industry-specific technique development</li>
                  <li>Code compliance training</li>
                  <li>Destructive and non-destructive testing preparation</li>
                  <li>Real-world pipeline repair scenarios</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-zinc-800 bg-zinc-900/50 shadow-lg shadow-black/10">
              <CardHeader>
                <CardTitle className="text-zinc-100">Training Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-zinc-300">
                  <li>SMAW Pipe Welding</li>
                  <li>GTAW (TIG) Pipe Welding</li>
                  <li>GMAW (MIG) Pipe Welding</li>
                  <li>Combo Pipe Welding (GTAW/SMAW)</li>
                  <li>Pipeline Welding Techniques</li>
                  <li>Pressure Vessel Welding</li>
                  <li>Code Requirements and Standards</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form Card */}
          <Card className="border border-zinc-800 bg-zinc-900/50 shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="text-zinc-100">Book Your Training Session</CardTitle>
              <CardDescription className="text-zinc-400">Tell us about your goals and preferred schedule</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name" 
                    required 
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    required
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number" 
                    required
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-zinc-300">Welding Experience Level</Label>
                  <select 
                    id="experience" 
                    className="w-full p-2 rounded bg-zinc-800 border-zinc-700 text-zinc-200"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner - No Experience</option>
                    <option value="novice">Novice - Some Experience</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals" className="text-zinc-300">Training Goals</Label>
                  <Input 
                    id="goals" 
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="What do you want to learn?" 
                    required
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours" className="text-zinc-300">Desired Hours</Label>
                  <Input 
                    id="hours" 
                    type="number" 
                    min="4" 
                    value={formData.hours}
                    onChange={handleChange}
                    placeholder="Minimum 4 hours" 
                    required
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred-time" className="text-zinc-300">Preferred Time</Label>
                  <Input 
                    id="preferredTime" 
                    value={formData.preferredTime}
                    onChange={handleChange}
                    placeholder="Preferred days and times" 
                    required 
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={submitStatus === 'success'}
                >
                  Request Training Session
                </Button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-900/50 text-green-300 border border-green-800 p-4 rounded-md">
                    <h3 className="font-semibold">Thank you for your registration!</h3>
                    <p>We've received your training request and an instructor will contact you within 24 hours to confirm scheduling.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-900/50 text-red-300 border border-red-800 p-4 rounded-md">
                    <h3 className="font-semibold">Registration Error</h3>
                    <p>There was a problem submitting your registration. Please try again or contact support if the issue persists.</p>
                  </div>
                )}

                {submitStatus === 'idle' && (
                  <p className="text-sm text-zinc-400 text-center">
                    An instructor will contact you within 24 hours to confirm scheduling
                  </p>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-zinc-400">
          <p>&copy; 2024 Welding Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 