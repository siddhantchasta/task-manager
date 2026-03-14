"use client"

import { useRouter } from "next/navigation"
import api from "../utils/api"

export default function Navbar(){

 const router = useRouter()

 const logout = async () => {

  try{
   await api.post("/auth/logout")
  }catch(e){}

  router.push("/auth")

 }

 return (

  <div className="w-full border-b border-white/10 bg-black/30 backdrop-blur-md">

   <div className="max-w-4xl mx-auto flex justify-between items-center p-4">

    <h1 className="font-semibold text-lg">
     Task Manager
    </h1>

    <button
     onClick={logout}
     className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
    >
     Logout
    </button>

   </div>

  </div>

 )
}