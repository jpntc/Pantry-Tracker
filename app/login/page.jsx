"use client"
import React from "react";
import Image from "next/image"
import {useState} from "react"


const handleSubmit =  ()=>{

}
const handleSignUp=()=>{

}

const LoginPage = () => {
  const [user, setUser] = useState({});
  
  return (
    <main>
      <div className="h-3/4 min-h-screen flex flex-col items-center p-20">
        <Image
          src="/images/logo.jpg"
          alt="Inventory's hand logo"
          width={200}
          height={200}
          className="rounded-md"
        />
        <form
          action={handleSubmit}
          className=" flex flex-col m-10 p-10 h-1/2 border rounded-md "
        >
          <label className="mb-4 text-lg font-bold">
            Log Into Inventory Hand
          </label>
          <div className="flex ">
            <input
              type="email"
              placeholder={"Email"}
              className="border-2 rounded-md "
            ></input>
          </div>
          <div className="flex mt-2">
            <input
              type="password"
              placeholder={"Password"}
              className="border-2 rounded-md "
            ></input>
          </div>
          <div className="flex ">
            <input type="submit" className=" w-full mt-2 border-2 rounded-md font-bold" />
          </div>
          <div className="w-full mt-4 border border-black"/>
          <div className="mt-8 flex justify-center">
            <input type="button" placeholder="SignUp" defaultValue={"Sign Up"} className="font-bold w-fit border-2 rounded-md"/>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
