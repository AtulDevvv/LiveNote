'use client'

import { FormEvent, useEffect, useState, useTransition } from "react"
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import UseOwner from "@/lib/UseOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({id}:{id:string}) {

  const [input ,setInput]=useState("");
  const[data, loading,error]=useDocumentData(doc(db,"documents",id))
  const[isUpdating,startTransition]=useTransition()
  const isOwner=UseOwner()
  console.log(isOwner)

  useEffect(()=>{
    if(data){
      setInput(data.title)
    }
  },[data])

  const updateTitle=(e:FormEvent)=>{
    e.preventDefault()
    if(input.trim()){
      startTransition(async()=>{
        await updateDoc(doc(db,"documents",id),{
          title:input,
        })
      })
    }

  }
  return (
    <div>
      <div className=" flex max-w-6xl mx-auto">
        <form className=" flex space-x-2" onSubmit={updateTitle}>
        {/* {update title} */}
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
        <Button disabled={isUpdating} type="submit">{isUpdating?"Updating":"update"}</Button>
        </form>
        {/* {if Owner  ->> invite user,deleteDocument} |*/}
        {isOwner && ( 
          <>
          <InviteUser/>
        <DeleteDocument/>
          </>
         )}
    
      </div>
      <div className=" flex max-w-6xl mx-auto justify-between items-centermb-5">
        {/* {manageUser} */}
        <ManageUsers/>
      {/* {avatar} */}
      <Avatars/>
      </div>

      <hr className="pb-10"/>
      <Editor/>
      {/* {collageborative editor} */}
    </div>
  )
}

export default Document