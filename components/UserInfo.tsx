import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { handleSaveUpdate } from "../utils/userProfilUpdateActions";
import ModalEmailPswdChange from "./ModalEmailPswdChange";
import ModalUserInfoAuth from "./ModalUserInfoAuth";
import ModalSuccessError from "./ModalSuccessError";
interface User {
    avatar: string;
    pseudo: string;
    group: string;
    email: string;
    password?: string; // à ne pas afficher !
}
function UserInfo() {
    const [user, setUser] = useState<User | null>(null);
    const [pseudo, setPseudo] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>('');
    const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
    const [isMPChangeModalOpen, setIsMPChangeModalOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [authFor, setAuthFor] = useState<string>("");
    const [modalType, setModalType] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");


    const truncatedEmail = email.substring(0, 5) + "..." + email.substring(email.length - 10);

    useEffect(() => {
        console.log("UserInfo password", password);
    }, []);
    const token = useAppSelector((state) => state.authToken.value);

    function HandlePasswordChange() {
        setAuthFor("password")
    }

    function HandleEmailChange() {
        setAuthFor("email")
    }

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/users/userProfil', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            accessToken: token
                        }),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                        setPseudo(data.pseudo);
                        setGroup(data.group);
                        setEmail(data.email);
                    } else {
                        console.error('Erreur de récupération des données');
                    }
                } catch (error) {
                    console.error(error);

                }
            }
            fetchData();
        }
    }, [token])

    return (
        <div className="h-full w-full flex flex-col -mt-20 ">
            <div className="w-full bg-gray-200  rounded-xl mb-2">
                <div className=" flex flex-col">
                    <div className="flex justify-center mb-4 bg-black text-yellow-400 rounded-t-xl">
                        <h3>userProfil</h3>
                    </div>
                    <div className="flex flex-col mx-2">
                        <div className="flex justify-between my-1">
                            <span style={{ fontFamily: 'CaptureIt', fontSize: '20px' }}>pseudo :</span>
                            <input className="border-none"
                                type="text"
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                                onBlur={(e) => {
                                    if (e.target.value === "") {
                                        setPseudo(user?.pseudo ?? "")
                                    }
                                }} />
                        </div>
                        <div className="flex justify-between my-1">
                            <span style={{ fontFamily: 'CaptureIt', fontSize: '20px' }}>Group :</span>
                            <input className="border-none"
                                type="text"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                onBlur={(e) => {
                                    if (e.target.value === "") {
                                        setGroup(user?.group ?? "")
                                    }
                                }}
                            />
                        </div>
                        <div className="flex justify-between my-1">
                            <span style={{ fontFamily: 'CaptureIt', fontSize: '20px' }}>Email :</span>
                            <div className="w-fit flex flex-raw justify-between items-center">
                                <input className="px-1 w-36 h-7 mr-4 border-none bg-white"
                                    type="text"
                                    value={truncatedEmail}
                                    style={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                    disabled
                                />
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 bg-black stroke-white rounded-md hover:bg-yellow-400"
                                    onClick={() => HandleEmailChange()}
                                >
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </div>
                        </div>
                        <div className="w-full flex my-1 ">
                            <span style={{ fontFamily: 'CaptureIt', fontSize: '20px' }}>
                                Mot De Passe :
                            </span>
                            <div className="flex  ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 bg-black stroke-white rounded-md hover:bg-yellow-400"
                                    onClick={() => HandlePasswordChange()}
                                >
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                {password !== ""&& <span className="ml-2 text-red-500">pensez à sauvegarder</span>}
                            </div>
                        </div>
                        <div className="flex justify-center my-4">
                            <span className="bg-black rounded-lg px-2 py-1 text-white hover:bg-yellow-400 hover:text-white"
                                onClick={() => handleSaveUpdate({
                                    token,
                                    pseudo,
                                    group,
                                    email,
                                    password,
                                    setPassword,
                                    setError,
                                    setSuccessMessage,
                                    setIsMessageModalOpen,
                                    setModalType
                                },
                                )}
                                >Sauvegarder</span>
                        </div>
                    </div>
                </div>
            </div>
            {authFor && <ModalUserInfoAuth setIsMPChangeModalOpen={setIsMPChangeModalOpen} 
                                           setPassword={setPassword} 
                                           setAuthFor={setAuthFor} 
                                           authFor={authFor} 
                                           error={error} 
                                           setError={setError} 
                                           setModalType={setModalType} 
                                           modalType={modalType} 
                         />
            }
            {isMPChangeModalOpen &&
                <ModalEmailPswdChange setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                                      setIsMPChangeModalOpen={(value: boolean) => setIsMPChangeModalOpen(value)}
                                      setPassword={(value: string) => setPassword(value)}
                                      setEmail={(value: string) => setEmail(value)}
                                      setAuthFor={(value: string) => setAuthFor(value)}
                                      authFor={authFor}
                                      error={error}
                                      setError={(value: string) => setError(value)}
                                      setModalType={(value: string) => setModalType(value)}
                                      modalType={modalType}
                                      setSuccessMessage={(value: string) => setSuccessMessage(value)}
                />
            }
            {isMessageModalOpen &&
                <ModalSuccessError setIsMessageModalOpen={(value: boolean) => setIsMessageModalOpen(value)}
                                   setError={(value: string) => setError(value)}
                                   error={error}
                                   successMessage={successMessage}
                                   setSuccessMessage={(value: string) => setSuccessMessage(value)}
                                   setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                />
            }
            {/* {isErrorModalOpen &&} */}
        </div>
    )
}

export default UserInfo