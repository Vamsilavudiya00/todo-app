import React, { useEffect, useState } from 'react'
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../../firebaseconfig';
import '../css/createtodopage.css'
import { useNavigate } from 'react-router-dom';

function CreateTodoPage() {
  const [titleinput,setTitleInput] = useState("");
  const [DescInput,setDescInput] = useState("");
  const [userInput,setUserInput] = useState();
  const navigation = useNavigate();

  useEffect(() =>{
    const userData = localStorage.getItem("user");
    setUserInput(userData)
    console.log(userData)
  },[])

    const addDatafunnction = async() =>{
      try {
        const docRef = await addDoc(collection(db, "data"), {
          title: titleinput,
          description: DescInput,
          user: userInput,
        });
      
        console.log("Document written with ID: ", docRef.id);
        alert("data sent Successfully to firebase")
        navigation("/");

      } catch (e) {
        console.error("Error adding document: ", e);
        alert("something wrong data not send!")
      }
    }
  return (
    <div className='flex items-center justify-center mt-20'>
      <div>
        <h1 className='text-3xl font-semibold text-center'>Create Post</h1>
        <div className='flex flex-col gap-2 w-[95vw] sm:w-[50vw] bg-gray-200 p-[2%] sm:p-[10%] mt-5'>
          <span className='mt-4'>Title</span>
          <input className='flex-1 inputt' onChange={e => setTitleInput(e.target.value)} type="text" placeholder='Todo Title' />
          <span>Description</span>
          <textarea onChange={e => setDescInput(e.target.value)} className='outline-none p-4' name="" id="" cols="30" rows="10"></textarea>
          <button onClick={addDatafunnction} className='bg-pink-600 py-3 mb-4 text-white mt-3 hover:bg-blue-600 transition'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreateTodoPage