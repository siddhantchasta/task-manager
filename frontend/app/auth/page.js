"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import api from "../../utils/api"

export default function AuthPage(){

 const router = useRouter()

 const [isLogin,setIsLogin] = useState(true)
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [loading,setLoading] = useState(false)

 const handleSubmit = async () => {

  try{

   setLoading(true)

   if(isLogin){

    await api.post("/auth/login",{ email,password })

    router.push("/dashboard")

   }else{

    await api.post("/auth/register",{ email,password })

    alert("Account created! Please login.")
    setIsLogin(true)

   }

  }catch(err){

   alert(err.response?.data?.message || "Something went wrong")

  }

  setLoading(false)

 }

 return(

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

   <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">

    <div className="flex justify-center mb-4">
     <div className="bg-blue-500/20 p-3 rounded-full">
      <CheckCircle size={28} className="text-blue-400"/>
     </div>
    </div>

    <h1 className="text-2xl font-bold text-center mb-1">
     Task Manager
    </h1>

    <p className="text-gray-400 text-center mb-6">
     {isLogin
      ? "Login to manage your tasks"
      : "Create an account to get started"}
    </p>

    <input
     className="w-full bg-transparent border border-gray-600 rounded-lg p-3 mb-3 focus:outline-none focus:border-blue-400"
     placeholder="Email"
     onChange={(e)=>setEmail(e.target.value)}
    />

    <input
     type="password"
     className="w-full bg-transparent border border-gray-600 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-400"
     placeholder="Password"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button
     onClick={handleSubmit}
     disabled={loading}
     className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-lg p-3 font-medium"
    >

     {loading
      ? "Please wait..."
      : isLogin
      ? "Login"
      : "Create Account"}

    </button>

    <p className="text-center text-gray-400 mt-4 text-sm">

     {isLogin
      ? "Don't have an account?"
      : "Already have an account?"}

     <button
      onClick={()=>setIsLogin(!isLogin)}
      className="text-blue-400 ml-2 hover:underline"
     >
      {isLogin ? "Register" : "Login"}
     </button>

    </p>

   </div>

  </div>

 )
}