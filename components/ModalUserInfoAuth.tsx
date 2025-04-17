import { useState, useEffect } from "react"
import { passwordAuth, } from "../utils/userProfilUpdateActions"
import { useAppSelector } from "../store/hooks"
interface Props {
    setIsMPChangeModalOpen: (value: boolean) => void
    setPassword: (value: string) => void
    setAuthFor: (value: string) => void
    authFor: string
    error: string
    setError: (value: string) => void
    modalType: string
    setModalType: (value: string) => void
}

function ModalUserInfoAuth({ setIsMPChangeModalOpen, setPassword, setAuthFor, authFor, error, setError, setModalType }: Props) {
    const [oldPassword, setOldPassword] = useState<string>('');
    const token = useAppSelector((state) => state.authToken.value);

    function handleClose() {
        console.log("click")
        setAuthFor("")
        setError("")
    }

    function handleAuthValidation() {
        passwordAuth({ token, oldPassword, setOldPassword, setError, setModalType, setIsMPChangeModalOpen, setAuthFor, authFor })
    }
        return (
            <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" ></div>
                <div className=" z-50 w-[85%]  h-fit flex flex-col justify-center items-center bg-white rounded rounded-xl">
                    <div className="w-full flex-col justify-between item-center">
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
                        <h3 className="text-center -mt-4 mb-2">Authentification</h3>
                        <div className="w-full flex justify-center">
                            <input className='w-[90%] border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 ' placeholder="Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col justify-center items-center mt-3 pb-5">
                            {error && <p className="text-red-500 m-1">{error}</p>}
                            <span className="px-6 py-2  bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                                onClick={() => handleAuthValidation()}
                            >
                                Envoyer
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}
    export default ModalUserInfoAuth