'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import UseOwner from "@/lib/UseOwner"
import { useRoom } from "@liveblocks/react/suspense"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, collectionGroup, query, where } from 'firebase/firestore'
import { db } from "../../firebase"
import { removeUserFromDocument } from "../../actions/action"

function  ManageUsers() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const {user}= useUser()
  const room=useRoom()

  const isOwner= UseOwner()

  const [usersInRoom]= useCollection(user && query(collectionGroup(db,"rooms"), where("roomId","==",room.id)))
 

   async function handleDelete(userId:string) {
    startTransition(async ()=>{
      if(!user) return;
      const {success}= await removeUserFromDocument(room.id,userId)
    })


  }
 

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
          <Button variant="outline">Users{usersInRoom?.docs.length}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users with Access</DialogTitle>
            <DialogDescription>
              Below is a list of users who have access to this document.
            </DialogDescription>
          </DialogHeader>
          <hr  className="my-2"/>
          <div>
            {
                usersInRoom?.docs.map((doc)=>(
                    <div key={doc.data().userId} className="flex items-center justify-between">
                      <p className="font-light">
                       {doc.data().userId === user?.emailAddresses[0].toString()?`You (${doc.data().userId})`:doc.data().userId}
                       </p>
                       <div className="flex items-center gap-2">
                        <Button variant="outline">{doc.data().role}</Button>
                        {
                          isOwner && doc.data().userId !== user?.emailAddresses[0].toString() && (
                            <Button variant="destructive" onClick={()=>handleDelete(doc.data().userId)} disabled={isPending} size="sm">
                              {isPending?"Removing":"X"}

                            </Button>
                          )
                        }


                       </div>
                    </div>
                ))
            }
          </div>
        

          

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ManageUsers