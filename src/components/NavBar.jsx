import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { getAuth, signOut , signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function NavBar() {
  const [login, setLogin] = useState();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() =>{
    const [userName,setUserName] = useState("");
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
    setUserName(user);
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
    setUserName("");
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

  return (
    <header className="flex flex-row justify-between items-center sm:w-[80%] w-[98%] bg-white mx-[1%] sm:mx-[10%] py-2 border-b px-1  fixed z-10 left-0 top-0">
      <a href="/" className="flex flex-row sm:gap-2 gap-1 items-center">
        <img className="sm:w-12 w-6 h-6 sm:h-12" src={Logo} alt="logo" />
        <h1 className="text-black sm:text-xl text-sm font-semibold">SaveData</h1>
      </a>
      <nav className="flex flex-row items-center gap-2 sm:gap-3">
        {login ? (
          <div className="flex flex-row items-center gap-1 sm:gap-3">
            <Link to="/create-post" className="sm:px-3 sm:py-2 py-2 px-3 text-xs sm:text-sm bg-pink-600 text-white  sm:rounded-xl rounded-lg transition">
              Create
            </Link>
            <button onClick={signOutGoogle} className="sm:px-3 sm:py-2 py-2 px-3 text-xs sm:text-sm bg-blue-600 text-white  sm:rounded-xl rounded-lg transition">Logout</button>
            {userName.length > 1 && <button>{userName[0]}</button>}
          </div>
        ) : (
          <>
            <button onClick={SignInGoogle} className="sm:px-3 sm:py-2 py-2 px-3 text-xs sm:text-sm bg-blue-600 text-white  sm:rounded-xl rounded-lg transition">
              Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
