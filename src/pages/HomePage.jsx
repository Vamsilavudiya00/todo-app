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
        setGetData((prev) => [...prev, {id: doc.id,title:doc.data().title,description:doc.data().description,user:doc.data().user}]);
      });
      console.log(getData)
    };
    getdataFunction()
  },[]);

  console.log(getData)

  

  return (
    <div className="w-full px-[12%] flex flex-col items-center pt-16">
      {getData.map((data, index) => <TodoCard key={index} title={data.title} id={data.id} desc={data.description} user={data.user} />)}
      {getData.length > 5? <><button className="bg-pink-600 text-white py-2 px-6 my-6 rounded-xl">Load More</button></>:<></>}
    </div>
  );
}

export default HomePage;
