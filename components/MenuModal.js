import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../reducers/user";

function MenuModal({ setIsSignModalOpen }) {

  const pseudo = useSelector((state) => state.user.value.pseudo)
  const dispatch = useDispatch()
  function handleClose() {
    console.log("click")
    setIsSignModalOpen(false)
  }

  function handleLogOut() {
    dispatch  (logout())
    setIsSignModalOpen(false)
  }


  return (
    <div className="h-fit w-64 bg-white rounded rounded-xl flex flex-col justify-center items-center">
      <div className='absolute  w-64 top-1/2 translate-x-0 -translate-y-[7rem] 0 flex justify-end'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" onClick={handleClose} />
                </svg>
            </div>
      <div className='w-full h-[90%] flex flex-col justify-evenly items-center'>
        <span className="mb-4 mt-6 text-lg">Hello <span style={{fontFamily: "captureIt"}}>{pseudo}</span></span>

        <button className="h-fit w-24 m-2 bg-yellow-400 text-sm text-black text-ms hover:bg-gray-300 hover:text-black" onClick={handleClose}>Profile</button>
        <button className="h-fit w-24 m-2 bg-yellow-400 text-sm text-black hover:bg-gray-300 hover:text-black" onClick={handleClose}>Préférences</button>


        <button className="h-fit w-24 mb-6  m-2 text-sm text-white hover:bg-gray-300 hover:text-black" onClick={handleLogOut}>logOut</button>

      </div>
      
    </div>
  )
}

export default MenuModal