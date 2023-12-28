import React, { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseconfig";

function HomePage() {
  const [getData, setGetData] = useState([]);
  const [clickTime, setClickTime] = useState(1);

  useEffect(() => {
    const getdataFunction = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      querySnapshot.forEach((doc) => {
        setGetData((prev) => [
          ...prev,
          {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            user: doc.data().user,
            date: new Date((doc.data().date).seconds * 1000 + Math.floor((doc.data().date).nanoseconds / 1e6)),
          },
        ]);
      });
    };
    
    getdataFunction();
  }, []);
  console.log(getData)
  


  return (
    <div className="w-full sm:px-[12%] px-2 flex flex-col items-center pt-16">
      {getData
        .slice(
          0,
          getData.length < clickTime * 5 ? getData.length : clickTime * 5
        )
        .map((data, index) => (
          <TodoCard
            key={index}
            title={data.title}
            id={data.id}
            desc={data.description}
            user={data.user}
            date = {data.date.toLocaleDateString()}
          />
        ))}
      {getData.length > 5 ? (
        <>
          <button
            onClick={() => setClickTime(clickTime + 1)}
            className="bg-pink-600 text-white py-2 px-6 my-6 rounded-xl"
          >
            Load More
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
