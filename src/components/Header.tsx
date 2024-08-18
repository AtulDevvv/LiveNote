'use client'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { useAuth, useUser } from '@clerk/nextjs'
import React from 'react'
import BreadCrumps from './BreadCrumps'


function Header() {

    const {user}=useUser()
  return (
    <div className=' flex items-center justify-between p-5'>
        {
            user && (

                <h1>{user?.firstName}{`'s`} space</h1>
            )
        }



        <BreadCrumps/>
        <div>
            <SignedOut>
                <SignInButton/>

            </SignedOut>
            <SignedIn>
               <UserButton/>

            </SignedIn>
        </div>
    </div>
  )
}

export default Header