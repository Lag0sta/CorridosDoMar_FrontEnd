import { error } from 'node:console'
import { useState, useEffect } from 'react'
import ModalSuccessError from './ModalSuccessError'

interface Props {
    setIsModalOpen : (value : boolean) => void
    setIsSignUp : (value : boolean) => void
}
    
function SignUp({ setIsModalOpen, setIsSignUp } : Props) {
    const [pseudo, setPseudo] = useState('')
    const [capoeiraGroup, setCapoeiraGroup] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
    const [bg, setBg] = useState('bg-none')
    const [defaultAvatar, setDefaultAvatar] = useState('')

    useEffect(() => {
        const initialsArray = [pseudo, capoeiraGroup].map(str => str.charAt(0));
        setDefaultAvatar(initialsArray.join(''));
        console.log(defaultAvatar);
    }, [pseudo, capoeiraGroup])

    useEffect(() => {
        if (!password || !confirmPassword) {
            setBg('w-full bg-gray-200 border-none border-2 border-black placeholder-gray-800 placeholder:italic text-ms px-2 py-1')
        } else if (password === confirmPassword) {
            setBg('w-full bg-green-500 border-none')
        } else {
            setBg('w-full bg-red-500 border-none')
        }
    }, [password, confirmPassword])


    function handleRegister() {
        console.log('click')

        if (!pseudo || !email || !password || !confirmPassword) {
            setErrorMessage("Veuillez remplir tous les champs avec un *");
            return
        }
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        fetch("http://localhost:3000/auths/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                avatar: defaultAvatar,
                pseudo: pseudo,
                capoeiraGroup: capoeiraGroup,
                email: email,
                password: password,

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    setPseudo("");
                    setCapoeiraGroup("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setIsMessageModalOpen(true);
                    setSuccessMessage("Votre compte a bien été créé.");

                } else {
                    setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
                }
            })
    }

    function handleClose() {
        console.log("click")
        setIsModalOpen(false)
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
                <h3 className="m-4 text-4xl">Rejoindre</h3>
                <div className={`h-20 w-20 mb-4 flex justify-center items-center rounded-full border-2 border-black ${!pseudo && !capoeiraGroup ? 'bg-bobe' : 'bg-yellow-500'}`}>
                    <span style={{ fontFamily: 'CaptureIt', fontSize: '34px' }}>{defaultAvatar}</span>
                </div>
                <div className='mb-1 w-[70%] flex justify-center'>
                    <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2 '
                        placeholder='Pseudo'
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <div className='mb-1 w-[70%] flex justify-center'>
                    <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2'
                        placeholder='Groupe de Capoeira'
                        value={capoeiraGroup}
                        onChange={(e) => setCapoeiraGroup(e.target.value)} /><span className='opacity-0'>*</span>
                </div>
                <div className='mb-1 w-[70%] flex justify-center'>
                    <input className='w-full border-none bg-gray-200 placeholder-gray-800 placeholder:italic py-1 px-2'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <div className='flex flex-col justify-between mb-1 w-[70%]  '>
                    <div className='w-full flex justify-center'>
                        <input className={bg}
                            type="password"
                            placeholder='Mot de passe'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <span className='text-red-500'>*</span>
                    </div>
                    <div className='w-full flex justify-center'>
                    <input className={bg}
                        type="password"
                        placeholder='Confirmer le mot de passe'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span className='text-red-500'>*</span>
                </div>
                </div>
                
                <div className="text-[8px] text-red-500">
                    {errorMessage}
                </div>
                <span className="mt-4 mb-6 px-3 py-2 bg-black text-base text-white rounded rounded-full hover:bg-yellow-400 hover:text-black hover:font-bold"
                    onClick={handleRegister}>Confirmer</span>
            </div>
            {isMessageModalOpen && 
              <ModalSuccessError successMessage={successMessage} 
                                 setSuccessMessage={setSuccessMessage}
                                 error={errorMessage}
                                 setError={setErrorMessage}
                                 setIsMessageModalOpen={setIsMessageModalOpen}
                                 setIsModalOpen={setIsModalOpen}
               />              
                                }
             
            
        </div>
    )
}

export default SignUp