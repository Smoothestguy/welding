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

export default function RestrictionTrainingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    hours: '',
    preferredTime: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1C1C1C] text-white">
      <header className="bg-[#1C1C1C] border-b border-gray-800 py-6">
        <nav className="container mx-auto flex items-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-[#FF8C42] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF8C42]">Restriction Training</h1>
            <p className="text-xl text-gray-400">
              Expert pipe welding instruction tailored to your certification goals
            </p>
          </div>
          
          <div className="grid gap-8 mb-8">
            {/* Course Overview Card */}
            <Card className="bg-[#242424] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Course Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                    <UserCircle className="h-5 w-5 text-[#FF8C42]" />
                    <span className="text-gray-300">Individual Attention from Expert Instructor</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                    <Clock className="h-5 w-5 text-[#FF8C42]" />
                    <span className="text-gray-300">Flexible Duration - Book by the Hour</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#FF8C42]" />
                    <span className="text-gray-300">Schedule at Your Convenience</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                    <DollarSign className="h-5 w-5 text-[#FF8C42]" />
                    <span className="text-gray-300">$95/hour - Minimum 4 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits and Focus Areas */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-[#242424] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Benefits of Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li>Master restricted access welding techniques</li>
                    <li>Learn proper preparation for confined spaces</li>
                    <li>Practice with various restriction tools and fixtures</li>
                    <li>Safety protocols for restricted access welding</li>
                    <li>Mirror welding techniques</li>
                    <li>Certification preparation</li>
                    <li>Quality control and inspection methods</li>
                    <li>Real-world restricted access scenarios</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#242424] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Training Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li>Mirror Welding Techniques</li>
                    <li>Confined Space Welding</li>
                    <li>Limited Visibility Welding</li>
                    <li>Restricted Access Tools and Equipment</li>
                    <li>Safety Procedures and Protocols</li>
                    <li>Quality Control in Restricted Access</li>
                    <li>Certification Requirements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card className="bg-[#242424] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Book Your Training Session</CardTitle>
                <CardDescription className="text-gray-400">
                  Tell us about your goals and preferred schedule
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Form fields */}
                  <Input 
                    className="bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF8C42]"
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name" 
                    required 
                  />
                  <Input 
                    className="bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF8C42]"
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    required
                  />
                  <Input 
                    className="bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF8C42]"
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number" 
                    required
                  />
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium">Welding Experience Level</Label>
                    <select 
                      id="experience" 
                      className="w-full p-2 border rounded bg-[#2A2A2A] text-white"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner Welder (0-2 years)</option>
                      <option value="novice">Experienced Welder (2+ years)</option>
                      <option value="intermediate">Certified Welder</option>
                      <option value="advanced">Advanced Certified Welder</option>
                    </select>
                  </div>
                  <Input 
                    className="bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF8C42]"
                    id="goals" 
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="What do you want to learn?" 
                    required
                  />
                  <Input 
                    className="bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF8C42]"
                    id="hours" 
                    type="number" 
                    min="4" 
                    value={formData.hours}
                    onChange={handleChange}
                    placeholder="Minimum 4 hours" 
                    required
                  />
                  <Input 
                    className="bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF8C42]"
                    id="preferredTime" 
                    value={formData.preferredTime}
                    onChange={handleChange}
                    placeholder="Preferred days and times" 
                    required 
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit"
                    className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 text-white"
                  >
                    Request Training Session
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-[#1C1C1C] border-t border-gray-800 py-6">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 TAW Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 