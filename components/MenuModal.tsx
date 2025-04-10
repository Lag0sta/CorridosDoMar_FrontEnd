import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from '../store/hooks';
import { clearToken } from '../store/reducers/auth';
import { logout } from "../store/reducers/user";

interface Props {
  setIsModalOpen: (value: boolean) => void;
  setCurrentMainComponent: (value: string) => void
}

function MenuModal({ setIsModalOpen, setCurrentMainComponent } : Props) {

  const pseudo = useAppSelector((state) => state.user.value.pseudo)
  const dispatch = useDispatch()
  function handleClose() {
    console.log("click")
    setIsModalOpen(false)
  }

  function handleLogOut() {
    dispatch  (logout())
    setIsModalOpen(false)
    setCurrentMainComponent("research")
    dispatch(clearToken())
  }

  function handleUserProfile() {
    setIsModalOpen(false)
    setCurrentMainComponent("userProfile")

  }

  return (
    <div className=" bg-white rounded rounded-xl flex flex-col justify-center items-center">
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
      <div className='w-full h-[90%] flex flex-col justify-evenly items-center'>
        <h3 className="mb-4 mt-3 mx-0 " style={{fontFamily: "Consolas"}}>Hello<span className="text-3xl ml-2" style={{fontFamily: "Edo"}}>{pseudo}</span></h3>

        <span className="w-32 py-1 my-1 bg-yellow-400 text-base text-black text-base text-center rounded-full hover:bg-gray-300 hover:text-black" onClick={handleUserProfile}>Profile</span>
        <span className="w-32 py-1 my-1 bg-yellow-400 text-base text-black text-center rounded-full hover:bg-gray-300 hover:text-black" onClick={handleClose}>Préférences</span>


        <span className="w-32 py-1 my-6   bg-black text-base text-white text-center rounded-full hover:bg-gray-300 hover:text-black" onClick={handleLogOut}>logOut</span>

      </div>
      
    </div>
  )
}

export default MenuModal