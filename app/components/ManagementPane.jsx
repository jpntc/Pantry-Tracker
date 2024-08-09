"use client"
import { stringify } from 'postcss'
import React, {useState, useEffect} from 'react'
import {firestore} from "@/firebase"
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";


const ManagementPane = () => {
  const [data, setData] = useState(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [inventory, setInventory] = useState([]);
  

  const handleSubmit = async(input)=>{
    input.preventDefault()
    try{
      const options = {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({data: input.target.request.value})
      }
      const endpoint = "/api/format_input/"
      const response = await fetch(endpoint, options)
 
      if(response){
        if(response.status === 200){
          const result = await response.json()
          console.log(result);
          setInventory[result]

           
        }else{
          console.log(response)
          console.log("Error in processing this command", response.status)
          console.log(response.message)
        }
      }
    }catch (error){
      console.log(error)
    } 
  }

 


const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
  return (
    <section className="w-full h-full">
      <p className="font-bold text-lg md:text-2xl text-center">
        Manage Inventory
      </p>
      <div className="flex flex-col mt-4 w-full h-full ">
        <div className="">
          <form className="flex" onSubmit={handleSubmit}>
            <input
              name="request"
              type="text"
              id="request"
              className="w-full border"
              placeholder={`Enter what you would like to do, like "add 300 bags of carrots to my inventory"`}
            />
            <input
              type="submit"
              className="rounded-md bg-green-500 ml-2 p-2 font-bold"
            />
          </form>
        </div>
        <div className=" mt-4 flex flex-col w-full h-full border border-red-300 overflow-x-auto p-2">
          {
           inventory.map((item,index)=>{
            <div className="w-full p-2 text-base font-bold" key={index}>{item}</div>
           }) 
          }
        </div>
      </div>
    </section>
  );
}

export default ManagementPane