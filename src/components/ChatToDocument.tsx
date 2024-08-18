'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,

} from "@/components/ui/dialog"
import * as Y from 'yjs'
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"

import { toast } from "sonner"

import { Input } from "./ui/input"
import { BotIcon } from "lucide-react"
import Markdown from "react-markdown"

function ChatToDocument({doc}:{doc:Y.Doc}) {
  const [input,setInput]=useState("")
    const[isOpen,setIsOpen] =useState(false);
    const[summary,setSummary]=useState("")
    const[question,setQuestion]=useState("")
    const[isPending,startTransition]=useTransition();

  function handleAskQuestion(e:FormEvent) {
    e.preventDefault()
    setQuestion(input)
    startTransition(async()=>{
      const documentData=doc.get("document-store").toJSON();

      const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL2}/chatToDocument`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",

      },
      body:JSON.stringify({
        documentData,
        question :input,
    })

      })
      if(res.ok){
        const {message}=await res.json();
setInput("")
 setSummary(message)

 toast.success("Qustion asked successfully")

      }


    })
  
      
  }
 

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
          <Button variant="outline" className="text-lg font-bold">Chat with🤖</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat to the document</DialogTitle>
            <DialogDescription>
             Ask a question and Have a chat with the document with your friend AI🤖
            </DialogDescription>

            <hr  className="mt-5"/>
            {question && <p className=" mt-5 text-gray-500"> Q:{question}</p>}
          </DialogHeader>

          {
        summary && (
            <div className='flex flex-col items-start max-h-96 overflow-y-scroll hap-2 p-5 bg-gary-100'>
                <div className='flex'>
                    <BotIcon className='w-10 flex-shrink-0'/>
                    <p className='font-bold'>
                        GPT{isPending?"Thinking":"Says:"}
                    </p>
                </div>
                <p>{isPending?"":<Markdown>{summary}</Markdown>}</p>
            </div>

        )
      }

          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <Input type="text"
            placeholder="i.e what is this about"
            className="w-full"
            value={input}
            onChange={(e)=>setInput(e.target.value)}

            />
            <Button type="submit" disabled={!input || isPending}>{isPending?"Asking..":"Ask"}</Button>
            

           

          </form>

          

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChatToDocument