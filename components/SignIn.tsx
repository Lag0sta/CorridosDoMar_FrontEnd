import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import Link from 'next/link'

import { login } from "../store/reducers/user";

interface Props {
  setIsModalOpen : (value : boolean) => void;
}
function SignIn({ setIsModalOpen } : Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();

  function handleClose() {
    console.log("click")
    setIsModalOpen(false)
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
          setIsModalOpen(false);
        } else {
          setErrorMessage("Email ou Mot de passe incorrect"); // affiche un message d'error si le mdp ou email pas bon ou manquant
        }
      });
  }

  return (
    <div className="h-fit flex flex-col justify-center items-center">
      <div className='w-full flex flex-reverse justify-end '>
        <svg className="size-10 fill-gray-800 stroke-white m-2 hover:fill-white hover:stroke-gray-800 hover:size-12 hover:m-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={handleClose}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      <div className='w-full h-[90%] flex flex-col justify-evenly items-center '>
        <h3 className="mb-4 text-4xl">Connexion</h3>

        <div className='mb-1 w-[70%] flex justify-center'>
          <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                 placeholder='Email'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-1 w-[70%] flex justify-center'>
          <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                 type="password"
                 placeholder='Mot de passe'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)} />
        </div>
        

        <span className="px-3 py-2 mt-4 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
          onClick={handleConnection}
        >Connexion
        </span>
        <div className='mb-6 '>
          <Link href="/forgotPassword" ><span className='text-sm text-blue-500 font-bold italic'>Mot de passe oublié?</span></Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn