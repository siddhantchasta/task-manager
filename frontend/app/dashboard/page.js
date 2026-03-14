"use client"

import { useEffect, useState } from "react"
import api from "../../utils/api"
import { encrypt, decrypt } from "../../utils/encryption"
import Navbar from "../../components/Navbar"

export default function Dashboard(){

 const [tasks,setTasks] = useState([])
 const [title,setTitle] = useState("")
 const [description,setDescription] = useState("")
 const [status,setStatus] = useState("pending")

 const [search,setSearch] = useState("")
 const [filter,setFilter] = useState("")

 const fetchTasks = async (searchTerm="",statusFilter="") => {

  try{

   const res = await api.get(
    `/tasks?page=1&search=${searchTerm}&status=${statusFilter}`
   )

   const data = decrypt(res.data.payload)

   setTasks(data.tasks)

  }catch(err){
   console.log(err)
  }

 }

 const createTask = async () => {

  try{

   const encryptedPayload = encrypt({
    title,
    description,
    status
   })

   await api.post("/tasks",{ payload: encryptedPayload })

   setTitle("")
   setDescription("")

   fetchTasks(search,filter)

  }catch(err){
   console.log(err)
  }

 }

 useEffect(()=>{
  fetchTasks()
 },[])

 return(

  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

   <Navbar/>

   <div className="flex justify-center pt-10 px-6">

    <div className="w-full max-w-3xl">

     <div className="mb-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-400">
       Manage your tasks efficiently
      </p>
     </div>

     <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">

      <h2 className="text-xl font-semibold mb-4">
       Create Task
      </h2>

      <input
       className="w-full border border-gray-600 rounded-lg p-3 mb-3 bg-transparent"
       placeholder="Title"
       value={title}
       onChange={(e)=>setTitle(e.target.value)}
      />

      <input
       className="w-full border border-gray-600 rounded-lg p-3 mb-3 bg-transparent"
       placeholder="Description"
       value={description}
       onChange={(e)=>setDescription(e.target.value)}
      />

      <select
       className="w-full border border-gray-600 rounded-lg p-3 mb-4 bg-transparent"
       value={status}
       onChange={(e)=>setStatus(e.target.value)}
      >

       <option value="pending">Pending</option>
       <option value="in-progress">In Progress</option>
       <option value="completed">Completed</option>

      </select>

      <button
       onClick={createTask}
       className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg p-3"
      >
       Create Task
      </button>

     </div>

     <div className="flex gap-3 mb-6">

      <input
       className="flex-1 border border-gray-600 rounded-lg p-3 bg-transparent"
       placeholder="Search tasks..."
       value={search}
       onChange={(e)=>{
        setSearch(e.target.value)
        fetchTasks(e.target.value,filter)
       }}
      />

      <select
       className="border border-gray-600 rounded-lg p-3 bg-transparent"
       value={filter}
       onChange={(e)=>{
        setFilter(e.target.value)
        fetchTasks(search,e.target.value)
       }}
      >

       <option value="">All</option>
       <option value="pending">Pending</option>
       <option value="in-progress">In Progress</option>
       <option value="completed">Completed</option>

      </select>

     </div>

     {tasks.map(task=>(
      <div
       key={task._id}
       className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4"
      >

       <div className="flex justify-between">

        <h3 className="font-semibold">
         {task.title}
        </h3>

        <span className="text-xs bg-gray-500/20 px-2 py-1 rounded">
         {task.status}
        </span>

       </div>

       <p className="text-gray-400 mt-1">
        {task.description}
       </p>

      </div>
     ))}

     {tasks.length===0 && (
      <p className="text-center text-gray-400 mt-8">
       No tasks yet
      </p>
     )}

    </div>

   </div>

  </div>

 )
}