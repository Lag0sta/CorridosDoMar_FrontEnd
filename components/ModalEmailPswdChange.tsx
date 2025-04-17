import { useState, useEffect } from "react"
import { useAppSelector } from "../store/hooks"
import UserInfoAuthModal from "./ModalUserInfoAuth"
interface Props {
  setIsMPChangeModalOpen: (value: boolean) => void
  setIsMessageModalOpen: (value: boolean) => void
  setPassword: (value: string) => void
  setEmail: (value: string) => void
  setAuthFor: (value: string) => void
  authFor: string
  error: string
  setError: (value: string) => void
  modalType: string
  setModalType: (value: string) => void
  setSuccessMessage: (value: string) => void
}

function ModalEmailPswdChange({ setIsMPChangeModalOpen, setIsMessageModalOpen, setPassword, setEmail, setAuthFor, authFor, error, setError, modalType, setModalType, setSuccessMessage }: Props) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [bG, setBg] = useState<string>("");
  
  useEffect(() => {
    if (!confirmPassword || !confirmEmail) {
      setBg("w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2")
    } else if (newPassword === confirmPassword && newEmail === confirmEmail) {
      setBg("w-full border-none bg-green-500 placeholder-gray-800 placeholder:italic py-1 px-2")

    } else {
      setBg("w-full border-none bg-red-500 placeholder-gray-800 placeholder:italic py-1 px-2")
    }
  }, [newPassword, confirmPassword, newEmail, confirmEmail])

  function handleClose() {
    console.log("click")
    setIsMPChangeModalOpen(false)
    setModalType("")
    setError("")
  }

  function handleSave() {
    console.log("click")
    setError("")
    if(!modalType){
      setError("Erreur")
      setIsMessageModalOpen(true)
      return
    }

    if(modalType === "email") {
      if (newEmail === confirmEmail) {
        setEmail(newEmail)
        setIsMPChangeModalOpen(false)
        setModalType("")
        setSuccessMessage("e-mail changé")
        setIsMessageModalOpen(true)
      } else {
        setError("Emails do not match")
      }
      return
    }
    
    if(modalType === "password"){
      if (newPassword === confirmPassword) {
        setPassword(newPassword)
        setIsMPChangeModalOpen(false)
        setModalType("")
        setSuccessMessage("mot de passe changé")
        setIsMessageModalOpen(true)
      } else {
        setError("Passwords do not match")
      }
      return
    }
    
  }

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" ></div>
      <div className=" z-50 w-[85%]  h-fit flex flex-col justify-center items-end bg-white rounded rounded-xl">
        <svg className="size-10 fill-gray-800 stroke-white m-2 hover:fill-white hover:stroke-gray-800 hover:size-12 hover:m-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={handleClose}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <div className='w-full h-[90%] flex flex-col justify-evenly items-center '>
         
              {modalType === "email" &&
                <div>
                  <h3 className="mb-4 -mt-2 text-4xl text-center">e-mail</h3>
                  <div className='mx-3 mb-1   flex flex-col justify-center '>
                    <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                      placeholder='Nouvelle adresse e-mail'
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)} />
                    <input className={bG}
                      placeholder='Confirmation'
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)} />
                  </div>
                </div>
              }
              {modalType === "password" &&
                <div>
                  <h3 className="mb-4 -mt-1 text-4xl text-center">mot de passe</h3>
                  <div className='mx-3 mb-1 flex flex-col justify-center '>
                    <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                      type="password"
                      placeholder='Mot de passe'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} />
                    <input className={bG}
                      type="password"
                      placeholder='Confirmation'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                </div>}
              <div className="flex flex-col justify-center items-center mt-3 pb-5">
                {error && <span className="text-red-500 mb-1">{error}</span>}
                <span className=" px-5 py-2 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                  onClick={handleSave}
                >Modifier
                </span>
              </div>

            </div>
        </div>
        
    </div>
  )
}

export default ModalEmailPswdChange