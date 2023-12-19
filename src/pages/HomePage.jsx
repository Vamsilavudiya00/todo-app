import React, { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseconfig";

function HomePage() {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const getdataFunction = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      querySnapshot.forEach((doc) => {
        setGetData((prev) => [...prev, doc.data()]);
      });
      console.log(getData)
    };
    getdataFunction()
  },[]);

  console.log(getData)

  return (
    <div className="w-full px-[12%] flex flex-col items-center pt-16">
      {getData.map((data, index) => <TodoCard key={index} title={data.title} desc={data.description} user={data.user} />)}
      <button className="bg-pink-600 text-white px-6 py-2 rounded-xl w-fit my-4">
        LoadMore
      </button>
    </div>
  );
}

export default HomePage;