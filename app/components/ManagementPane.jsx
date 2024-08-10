"use client";
import React, { useState, useEffect } from "react";
import { firestore } from "@/firebase";
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
  const [responseMessage, setResponseMessage] = useState("");
  const [searchedData, setSearchedData] = useState({});
  const [searched, setSearched] = useState(false);
  const [inventory, setInventory] = useState([]);

  const handleSubmit = async (input) => {
    input.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: input.target.request.value }),
      };
      const endpoint = "/api/format_input/";
      console.log("before fetching");
      const response = await fetch(endpoint, options);
      console.log("Successful API route calls and return to management tab.");
      if (response) {
        if (response.status === 200) {
          const result = await response.json();
          if(result.error){
            setResponseMessage(result.error)
            return;
          }
                    if (result.results.searched === "searched") {
                      setSearchedData(result.results);
                      setSearched(true);
                      return;
                    }
          const inventoryArray = result.results.inventory;
          setInventory(inventoryArray);
          console.log("inventory", inventory);
        } else {
          console.log(response);
          console.log("Error in processing this command", response.status);
          console.log(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () =>{ setSearched(false); setResponseMessage("")};

  const loadInventory = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const endpoint = "/api/firebase_ops/";

    const inventory = await fetch(endpoint, options);
    const inventoryArr = await inventory.json();
    console.log(inventoryArr)
    if (inventory) {
      setInventory(inventoryArr.inventory);
    }
  };
         useEffect(() => {
           loadInventory();
         }, []);
  return (
    <section className="w-full h-full">
      <p className="font-bold text-lg md:text-2xl text-center text-white">
        Manage Inventory
      </p>
      <div className="flex flex-col mt-4 w-full h-full md:p-24 justify-center content-center">
        <div>
          <form className="flex " onSubmit={handleSubmit}>
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

        <div className="flex w-full justify-center">
          <div className="mt-4 flex flex-col w-full md:w-2/3 h-96 border-4 border-orange-300  rounded-b-md overflow-y-auto">
            {inventory.map((item, index) => (
              <div
                className="bg-white flex p-2 h-28 justify-between text-lg md:text-xl border border-black"
                key={index}
              >
                <div className="font-bold content-center">{item.name}</div>
                <div className="content-center">{item.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {searched && (
        <div className="flex fixed inset-0 items-center bg-slate-800 bg-opacity-50 justify-center z-10">
          <div className="w-3/4 md:w-1/2 h-64 bg-white flex flex-col justify-between border border-red-300 text-lg md:text-xl rounded-xl p-4">
            <button
              className="self-end text-gray-600 hover:text-gray-900 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="flex flex-row justify-between items-center h-full">
              <div className="font-bold">{searchedData.name}</div>
              <div>{searchedData.quantity}</div>
              {console.log(searchedData)}
            </div>
          </div>
        </div>
      )}
      {responseMessage && (
        <div className="flex fixed inset-0 items-center bg-slate-800 bg-opacity-50 justify-center z-10">
          <div className="w-3/4 md:w-1/2 h-64 bg-white flex flex-col justify-between border border-red-300 text-lg md:text-xl rounded-xl p-4">
            <button
              className="self-end text-gray-600 hover:text-gray-900 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="flex flex-row justify-center items-center h-full">
              <div className="font-bold">{responseMessage}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManagementPane;
