import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebaseconfig";

function EditPost() {
  const { uid } = useParams();
  const [getData, setGetData] = useState([]);
  const [editTitle, setEditTitle] = useState();
  const [editDesc, setEditDesc] = useState();
  const navigation = useNavigate();

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
          },
        ]);
      });
    };
    getdataFunction();
  }, []);

  const findDataByID = getData.find((e) => e.id === uid);

  return (
    <div className="flex items-center justify-center mt-20">
      {findDataByID && (
        <div>
          <h1 className="text-3xl font-semibold text-center">Edit Post</h1>
          <div className="flex flex-col gap-2 w-[50vw] bg-gray-200 p-[10%] mt-5">
            <span>Title</span>
            <input
              className="flex-1 inputt"
              defaultValue={findDataByID.title}
              onChange={(e) => setEditTitle(e.target.value)}
              type="text"
            />
            <span>Description</span>
            <textarea
              className="outline-none p-4"
              defaultValue={findDataByID.description}
              onChange={(e) => setEditDesc(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button
              onClick={async () => {
                const washingtonRef = doc(db, "data", uid);
                await updateDoc(washingtonRef, {
                  title: editTitle?editTitle:findDataByID.title,
                  description: editDesc?editDesc:findDataByID.description,
                });
                alert("data updated");
                navigation("/")
              }}
              className="bg-pink-600 py-3 text-white mt-3 hover:bg-blue-600 transition"
            >
              Update Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPost;
