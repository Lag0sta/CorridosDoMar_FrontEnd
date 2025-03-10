import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import Link from 'next/link'

import { login } from "../reducers/user";

function SignIn({ setIsSignModalOpen }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();

  function handleClose() {
    console.log("click")
    setIsSignModalOpen(false)
  }

  function handleConnection() {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("user :", data, "token :", data.token, "avatar :", data.avatar)
          dispatch(
            login({
              email: email,
              pseudo: data.pseudo,
              city: data.city,
              avatar: data.avatar,
              token: data.token,
              favorites: data.favorites,
            })
          );
          handleClose();
          setEmail("");
          setPassword("");
          setErrorMessage("");
          setIsSignModalOpen(false);
        } else {
          setErrorMessage("Email ou Mot de passe incorrect"); // affiche un message d'error si le mdp ou email pas bon ou manquant
        }
      });

  }

  return (
    <div className="h-fit w-64 bg-white rounded rounded-xl flex flex-col justify-center items-center">
      <div className='absolute  w-64 top-15 translate-x-[-2%] translate-y-[-450%] flex justify-end'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" onClick={handleClose} />
        </svg>
      </div>
      <div className='w-full h-[90%] flex flex-col justify-evenly items-center'>
        <h2 className="mb-4 mt-10">SignIn</h2>


        <div>
          <input placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input type="password"
            placeholder='Mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <Link href="/forgotPassword" ><span className='text-sm text-blue-800'>Forgot Password?</span></Link>
        </div>

        <button className="h-8 w-28 mt-4 mb-6 rounded rounded-full hover:bg-gray-300 hover:text-black text-sm"
          onClick={handleConnection}
        >se connecter
        </button>
      </div>
    </div>
  )
}

export default SignIn