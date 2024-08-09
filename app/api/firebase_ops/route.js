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

  console.log("hello world");
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
    console.log(body.data[0]);
    console.log(quantity);
    if (body.data[0] == "add") {
      try {
        let inventory = await addItem(quantity, item);
        console.log(inventory);
        return NextResponse.json({ inventory });
      } catch (error) {
        return NextResponse.json({ err: "Error adding your item" });
      }
    } else if (body.request[0] == "delete") {
      try {
        let inventory = await removeItem(quantity, item);
        console.log(inventory);

        return NextResponse.json({ inventory });
      } catch (error) {
        return NextResponse.json({ err: "Error adding your item", error });
      }
    } else if (body.request[0] == "search") {
      try {
        inventory = await removeItem(quantity, item);
        return NextResponse.json({ inventory });
      } catch (error) {
        return NextResponse.json({ err: "Error adding your item", error });
      }
    }
  } catch (error) {
    return NextResponse.json({ err: "Error adding your item", error });
  }
}

const updateInventory = async () => {
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
  console.log("inside addItem");
  try {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    console.log("successfully got docs");
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      if (quant) {
        await setDoc(docRef, { quantity: quant });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
    }
  } catch (error) {
    console.log(error);
    throw new error("Error adding item to your inventory");
  }
  try {
    let inventory = await updateInventory();
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
    console.log("Got docSnap")
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - quant });
      }
    }
    console.log("Successfully removed item.")
  } catch (error) {
    console.log("Error");
  }
  try{
    let inventory = await updateInventory();
    return inventory;
  } catch (error) {
    console.log("Error updating inventory");
    console.log(error);
  }
  return { error: "Error deleting item" };
};
