import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
function page() {
  return (
    <main className='flex space-x-2 items-center animate-pulse'>
      <ArrowLeftCircle className='w-12 h-12'/>
      <h1 className='font-semi-bold'>Get Started with creating a New document</h1>
    </main>
  )
}

export default page