import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { getAuth, signOut , signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function NavBar() {
  const [login, setLogin] = useState();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() =>{
    const localData = localStorage.getItem("user");
    if (localData) {
      setLogin(true);
    }
    else{
      setLogin(false)
    }
  },[])

const SignInGoogle = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user.displayName;
    localStorage.setItem("user", user);
    setLogin(true)
    window.location.reload();
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

const signOutGoogle = () =>{
  
  const auth = getAuth();
  signOut(auth).then(() => {
    localStorage.removeItem("user");
    window.location.reload();
    setLogin(false)
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

  return (
    <header className="flex flex-row justify-between items-center w-[80%] bg-white mx-[10%] py-2 border-b px-1  fixed z-10 left-0 top-0">
      <Link to="/" className="flex flex-row gap-2 items-center">
        <img className="w-12 h-12" src={Logo} alt="logo" />
        <h1 className="text-black text-xl font-semibold">SaveData</h1>
      </Link>
      <nav className="flex flex-row items-center gap-3">
        {login ? (
          <div className="flex flex-row items-center gap-3">
            <Link to="/create-post" className="px-3 py-2 bg-pink-600 text-white  rounded-xl transition">
              Create
            </Link>
            <button onClick={signOutGoogle} className="px-3 py-2 bg-blue-600 text-white  rounded-xl transition">Logout</button>
          </div>
        ) : (
          <>
            <button onClick={SignInGoogle} className="px-3 py-2 bg-blue-600 text-white transition rounded-xl">
              Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
