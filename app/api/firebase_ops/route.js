import { firestore } from "@/firebase";
import { NextResponse } from "next/server";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export async function POST(request, response) {
  const body = await request.json();

  console.log("firebase", body.data[0]);
  if (!body) {
    return NextResponse.json({ error: "No data provided" });
  }
  if (!body.data[2]) {
    return NextResponse.json({
      error: "You did not enter an item in the text field",
    });
  }
  let quantity = 0;
  let item = "";

  try {
    if (body.data[1]) {
      quantity = parseInt(body.data[1]);
    }
    item = body.data[2];
  } catch (error) {}
  try {
    console.log(quantity);
    if (body.data[0] == "add") {
      try {
        let inventory = await addItem(quantity, item);
        return NextResponse.json({ inventory });
      } catch (error) {
        return NextResponse.json({ err: "Error adding your item" });
      }
    } else if (body.data[0] == "delete") {
      try {
        let inventory = await removeItem(quantity, item);
        return NextResponse.json({ inventory });
      } catch (error) {
        return NextResponse.json({ err: "Error adding your item", error });
      }
    } else if (body.data[0] == "search") {
      try {
        let searchResults = await searchItem(item)
        return NextResponse.json(searchResults);
      } catch (error) {
        return NextResponse.json({error});
      }
    }
  } catch (error) {
    return NextResponse.json({ err: "Error adding your item", error });
  }
}

const getInventory = async () => {
  try {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    let inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    return inventoryList;
  } catch (e) {
    console.log(e);
  }
};

const addItem = async (quant, item) => {
  try {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + quant});
    } else {
      if (quant) {
        await setDoc(docRef, { quantity: quant });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
    }
  } catch (error) {
    throw new error("Error adding item to your inventory");
  }
  try {
    let inventory = await getInventory();
    return inventory;
  } catch (error) {
    console.log("Error updating inventory");
    console.log(error);
  }
  return {
    error: "Error adding item because of updating the inventory function.",
  };
};

const removeItem = async (quant, item) => {
  try {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else if(! quant){
        await setDoc(docRef, { quantity: quantity - 1 });
      }
      else{
        if (quantity - quant < 0) {
          return "Error, the number of items you want to remove is less than the number of items in inventory."
        }
        await setDoc(docRef, {quantity: quantity - quant})
      }
    }else{
      return "The item does not exist in inventory."
    }
  } catch (error) {
    return "An error occurred when trying to remove the item."
  }
  try{
    let inventory = await getInventory();
    return inventory;
  } catch (error) {
    console.log("Error updating inventory");
    console.log(error);
  }
  return { error: "Error deleting item" };
};

const searchItem = async (item) =>{
  try{
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let {quantity} = docSnap.data()
      let name = docSnap.id
      console.log(name, quantity)
      return {searched:"searched", name: name, quantity: quantity, status: 200}
    }else{
      return {errorSearch:"No such item in your inventory.", status: 200}
    }
  }
  catch(error){
    return "An error occurred when scanning your inventory."
  }
}


export async function GET(req, res) {
  try{
  const inventory = await getInventory()
  
  if(inventory){
    console.log(inventory)
    return NextResponse.json({inventory})
  }
  }catch(error){
    return NextResponse.json("Error: There was a problem retrieving your inventory.")
  }
}