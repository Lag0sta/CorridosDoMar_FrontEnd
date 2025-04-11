import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { handleSaveUdpate } from "../utils/userProfilUpdateActions";
import UserInfoModal from "./UserInfoModal";
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
    const [password, setPassword] = useState<string>('*******');
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [authFor, setAuthFor] = useState<string>("");


    const token = useAppSelector((state) => state.authToken.value);

    function HandlePasswordChange() {
        setIsModalOpen(true)
        setAuthFor("password")
    }

    function HandleEmailChange() {
        setIsModalOpen(true)
        setAuthFor("email")
    }

    useEffect(() => {
        if (token) {
            console.log("themfkToken", token)
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
                        console.log("theDataMFK", data)
                        setUser(data);
                        setPseudo(data.pseudo);
                        setGroup(data.group);
                        setEmail(data.email);
                        setPassword(data.password);
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
                            <div className="flex flex-col items-end">
                            <input className="border-none bg-yellow-200"
                                type="text"
                                value={email}
                                disabled
                            />
                             <span className="w-fit my-1 text-center bg-black rounded-lg px-2 py-1 text-white hover:bg-yellow-400 hover:text-white"
                                    onClick={() => HandleEmailChange()}
                                >modifier</span>
                            </div>
                            
                        </div>
                        <div className="w-full flex justify-between my-1 ">
                            <span style={{ fontFamily: 'CaptureIt', fontSize: '20px' }}>
                                Mot De Passe :
                            </span>
                            <div className="flex flex-col items-end">
                                <input className="border-none my-1 bg-yellow-200"
                                       type="password" 
                                       disabled 
                                       value={password} />
                                <span className="w-fit my-1 text-center bg-black rounded-lg px-2 py-1 text-white hover:bg-yellow-400 hover:text-white"
                                    onClick={() => HandlePasswordChange()}
                                >modifier</span>
                            </div>

                        </div>

                        <div className="flex justify-center my-4">
                            <span className="bg-black rounded-lg px-2 py-1 text-white hover:bg-yellow-400 hover:text-white"
                                onClick={() => handleSaveUdpate({
                                    token,
                                    pseudo,
                                    group,
                                    email,
                                    password,
                                    setError
                                },
                                )}>Sauvegarder</span>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen &&
                <UserInfoModal
                    setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                    setPassword={(value: string) => setPassword(value)}
                    setEmail={(value: string) => setEmail(value)}
                    setAuthFor={(value: string) => setAuthFor(value)}
                    authFor={authFor}
                />}
        </div>
    )
}

export default UserInfo