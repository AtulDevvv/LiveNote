'use-client'
import React,{FormEvent} from 'react'
import Markdown from 'react-markdown'
import * as Y from 'yjs'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  import { Button } from "./ui/button"


import { startTransition, useState, useTransition } from 'react'
import { BotIcon, LanguagesIcon } from 'lucide-react'
import { toast } from 'sonner'

type Languages=
|'english'
|'spanish'
|'portuguese'
|'french'
|'german'
|'chinese'
|'arabic'
|'hindi'
|'japanese';

const languages:Languages[]=[
    'english',
'spanish',
'portuguese',
'french',
'german',
'chinese',
'arabic',
'hindi',
'japanese',
]
function TranslateDocument({doc}:{doc:Y.Doc}) {

    const[isOpen,setIsOpen] =useState(false);
    const[language,setLanguage]=useState<string>("");
    const[summary,setSummary]=useState("")
    const[question,setQuestion]=useState("")
    const[isPending,startTransition]=useTransition();

    const handleAskQuestion= async(e:FormEvent)=>{
        e.preventDefault();
        startTransition(async()=>{
            const documentData=doc.get("document-store").toJSON();
            const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify({
                    documentData,
                    targetLang:language,
                })
            })
            if(res.ok){
              
                const {translated_text}=await res.json();
                setSummary(translated_text);

                toast.success("Translated Summary successfully")
            }


        })


    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
   
      <Button asChild variant="outline">
      <DialogTrigger >
        <LanguagesIcon/>
        Translate

    </DialogTrigger>
      </Button>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Translate the Document</DialogTitle>
        <DialogDescription>
          Select a language and Ai will translate a summary of the document in the selected language.
        </DialogDescription>

        <hr className='mt-5' />
        {question && <p className='mt-5 text-gray-500'>Q:{question}</p>}
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

      <Select value={language} onValueChange={(value)=>setLanguage(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="language" />
  </SelectTrigger>
  <SelectContent>
   {
    languages.map((language,index)=>(
        <SelectItem value={language} key={index}>{language}</SelectItem>
       
    ))
   }
  </SelectContent>
</Select>

        <Button type="submit" disabled={!language || isPending}>{isPending?"Translating..":"translate"}</Button>
        

       

      </form>

      

    </DialogContent>
  </Dialog>
  )
}

export default TranslateDocument