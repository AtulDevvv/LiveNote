'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,

} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteDocument, inviteUserToDocument } from "../../actions/action"
import { Input } from "./ui/input"

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()
  const [email,setEmail]=useState("")

  function handleInvite(e:FormEvent) {
    e.preventDefault()
    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId,email);
      if (success) {
        setIsOpen(false);
        setEmail('')
        
        toast.success("User added successfully");
      } else {
        toast.error("Failed to add user in the room");
      }
    })
  }
 

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
          <Button variant="secondary">Invite</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="flex gap-2">
            <Input type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

            />
            <Button type="submit" disabled={!email || isPending}>{isPending?"Inviting..":"invite"}</Button>
            

           

          </form>

          

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InviteUser 