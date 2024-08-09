"use client"
import React, { useState } from "react";
import Navbar from "./components/Navbar"
import Image from "next/image";
import ManagementPane from "./components/ManagementPane"
import AnalyticsPane from "./components/AnalyticsPane"
import TestComp from "./components/TestComp"

export default function Home() {
  const [currentWindow, setCurrentWindow] = useState('')

  const handleWindowChange = (window)=>{

    setCurrentWindow(window)
  }
  return (
    <main className="flex min-h-screen p-24">
      <Navbar handleButtonPress={handleWindowChange} />
      <div className="w-full  h-content flex flex-col mt-16  ">
        {currentWindow === "Analytics" && (
         <AnalyticsPane/>
        )}
        {currentWindow === "Management" && (
          <ManagementPane/>
        )}
        {/* <TestComp/> */}
      </div>
    </main>
  );
}
