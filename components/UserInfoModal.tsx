import { useState, useEffect } from "react"
import { passwordAuth, emailAuth } from "../utils/userProfilUpdateActions"
import { useAppSelector } from "../store/hooks"
interface Props {
  setIsModalOpen: (value: boolean) => void
  setPassword: (value: string) => void
  setEmail: (value: string) => void
  setAuthFor: (value: string) => void
  authFor: string
}

function UserInfoModal({ setIsModalOpen, setPassword, setEmail, setAuthFor, authFor }: Props) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEmailOrPswd, setIsEmailOrPswd] = useState<string>("");
  const [bG, setBg] = useState<string>("");
  const token = useAppSelector((state) => state.authToken.value);

  useEffect(() => {
    if (!confirmPassword || !confirmEmail) {
      setBg("w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2`")
    } else if (newPassword === confirmPassword && newEmail === confirmEmail) {
      setBg("w-full border-none bg-green-500 placeholder-gray-800 placeholder:italic py-1 px-2`")

    } else {
      setBg("w-full border-none bg-red-500 placeholder-gray-800 placeholder:italic py-1 px-2`")
    }
  }, [newPassword, confirmPassword, newEmail, confirmEmail])

  function handleClose() {
    console.log("click")
    setIsModalOpen(false)
    setIsEmailOrPswd("")
    setAuthFor("")
  }

  function handlePasswordChange() {
    console.log("click")
    if (newPassword === confirmPassword) {
      setPassword(newPassword)
      setIsModalOpen(false)
      setIsEmailOrPswd("")
    } else {
      setError("Passwords do not match")
    }

  }

  function handleEmailChange() {
    console.log("click")
    if (newEmail === confirmEmail) {
      setEmail(newEmail)
      setIsModalOpen(false)
      setIsEmailOrPswd("")
    } else {
      setError("Emails do not match")
    }

  }

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" ></div>
      <div className=" z-50 w-[85%]  h-fit flex flex-col justify-center items-center bg-white rounded rounded-xl">
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
          {isEmailOrPswd === "email" &&
            <div className="w-full flex flex-col justify-center">
              <h3 className="mb-4 text-4xl text-center">e-mail</h3>
              <div className='mx-3 mb-1   flex flex-col justify-center '>
                <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                  placeholder='E-mail'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)} />
                <input className={bG}
                  placeholder='Confirmation E-mail'
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)} />
              </div>
              <div className="flex justify-center items-center pb-5">
                <span className=" px-5 py-2 mt-4 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                  onClick={handleEmailChange}
                >Modifier
                </span>
              </div>

            </div>
          }
          {isEmailOrPswd === "password" &&
            <div className="w-full flex flex-col justify-center">
              <h3 className="mb-4 text-4xl text-center">mot de passe</h3>
              <div className='mx-3 mb-1 flex flex-col justify-center '>
                <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                  type="password"
                  placeholder='Mot de passe'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
                <input className={bG}
                  type="password"
                  placeholder='Mot de passe'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="flex justify-center items-center pb-5">
                <span className="px-3 py-2 mt-4 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                  onClick={handlePasswordChange}
                >Modifier
                </span>
              </div>
            </div>
          }
          {authFor === "password" &&
            <div className="w-full flex-col justify-between item-center">
              <h3 className="text-center -mt-4 mb-2">Authentification</h3>
              <div className="w-full flex justify-center">
                <input className='w-[90%] border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 ' placeholder="Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="flex justify-center items-center pb-5">
                <span className="px-6 py-2 mt-4 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                  onClick={() => passwordAuth({ token, oldPassword, setOldPassword, setError, setIsEmailOrPswd, setAuthFor })}
                >
                  Envoyer
                </span>
              </div>

            </div>
          }
          {authFor === "email" &&
            <div className="w-full flex-col justify-between item-center">
              <h3 className="text-center -mt-4 mb-2">Authentification</h3>
              <div className="w-full flex justify-center">
                <input className='w-[90%] border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 ' placeholder="Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="flex justify-center items-center pb-5">
                <span className="px-6 py-2 mt-4 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                  onClick={() => emailAuth({ token, oldPassword, setOldPassword, setError, setIsEmailOrPswd, setAuthFor })}>
                  Save
                </span>
              </div>
            </div>
          }
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  )
}

export default UserInfoModal