'use server'

import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument(){
    auth().protect()
    const {sessionClaims}=await auth();

    const docCollectionRef=   adminDb.collection("documents")
    const docRef= await docCollectionRef.add({
        title:"New doc"
    })
    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId:sessionClaims?.email!,
        role:"owner",
        createAt:new Date(),
        roomId:docRef.id,
    })

    return {docId:docRef.id }
}

export async function deleteDocument(roomId:string){
    auth().protect(); // ensurre the user is authenticated

    try{
        await adminDb.collection("document").doc(roomId).delete()
        const query =await adminDb.collection("rooms").where("roomId","==",roomId).get();

        const batch=adminDb.batch();
        // delete the roomn refrence in the room's collection for  every ueser in the room
        query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
        });

        await batch.commit();

        await liveblocks.deleteRoom(roomId);

        return {success:true}


    }
    catch(err){
        console.error(err);
        return {success:false};


    }


}

export async function inviteUserToDocument( roomId:string, email:string){
    try{
        await adminDb.collection("users").doc(email).collection("rooms").doc(roomId).set({
            userId:email,
            role:"editor",
            createdAt:new Date(),
            roomId:roomId,
        })
        return {success:true}

    }
    catch (err){
        console.error(err)
        return{success:false};


    }


}

export async function removeUserFromDocument(roomId:string,email:string){
   auth().protect();
   try{
    await adminDb.
    collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .delete();
    return {success:true};

   }
   catch (err){
    console.error(err)
    return {success:false}
   } 
}