import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";

// Next.js route POST, this route is called from the front end and passed the request the user wants to do, and then calls OPENAI gpt 3.5 turbo to format that request.
// The formatted request is then passed to another route where its edited in firebase.

export async function POST(req) {
  //Creating a body variable from the request sent from client.
  const body = await req.json();
  const userRequest = body.data; // Client request contained a json object {data : userRequest}

  //If the userRequest is null then return an error.
  if (!userRequest) {
    return NextResponse.json({ error: "No data provided" });
  } else {
    // If the request contains information, we'll attempt to make a request to OpenAI API with the user input
    // If the request contains information, we'll attempt to make a request to OpenAI API with the user input
    try {
      let formattedUserInput = await makeOpenAIRequest(userRequest);
      // Convert the string to a JavaScript object
      console.log(formattedUserInput);

      let parsedInput;
      try {
        parsedInput = JSON.parse(formattedUserInput);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({
          error: "Invalid JSON format returned from OpenAI",
        });
      }
      if (parsedInput) {
        try {
          const operation = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: parsedInput }),
          };
          const endpoint = "http://localhost:3000/api/firebase_ops/";
          const data= await fetch(endpoint, operation);
          const results = await data.json()

          if(results){
          console.log(results)
          return NextResponse.json(results)
          }
        } catch (error) {
          console.log("Failed to do fetch request on 2nd option", error)
          return NextResponse.json({ err: error });
        }
      }
    } catch (error) {
      console.error("Error making request:", error);
      return NextResponse.json({
        error: "There was an error formatting your request.",
      });
    }
  }
}

// Asynchronous helper function to make the API request.
const makeOpenAIRequest = async (request) => {
  // Declare a new openai object and pass in the api key.
  const openai = new OpenAI({
    apiKey: process.env.OpenAIAPIKey,
  });

  try {
    // Call the Openai API with an initial setup for a better formatted input.
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will convert the following prompt to a simple command which will contain the command of what the user is trying to do ( either add delete search or update) and the item to do the command on. Return it as a valid json string, with keys being 0,1,2. 0 will contain the command, 1 the value or amount to work with (if its spelled out put it as a number), and 2 the item the user is requesting us to operate with, if the prompt doesnt have a quantity just put an empty string, make sure to return a valid json string.",
        },
        {
          role: "user",
          content: request,
        },
      ],
    });

    return response.choices[0].message.content.trim(); //Return the formatted (hopefully, Sammy).
  } catch (error) {
    throw new Error("Error occured when making the API request.", error);
  }
};
