import { useState, useEffect } from 'react'

import PasswordStrength from './PasswordStrength.js'

function SignUp({ setIsSignModalOpen }) {
    const [pseudo, setPseudo] = useState('')
    const [capoeiraGroup, setCapoeiraGroup] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [bg, setBg] = useState('bg-none')
    const [defaultAvatar, setDefaultAvatar] = useState('')

    useEffect(() => {
        const initialsArray = [pseudo, capoeiraGroup].map(str => str.charAt(0));
        setDefaultAvatar(initialsArray.join(''));
        console.log(defaultAvatar);
    }, [pseudo, capoeiraGroup])

    useEffect(() => {
        if (!password || !confirmPassword) {
            setBg('bg-none border-2 border-black')
        } else if (password === confirmPassword) {
            setBg(' border-2 border-green-500')
        } else {
            setBg(' border-2 border-red-500')
        }


    }, [password, confirmPassword])


    function handleRegister() {
        console.log('click')

        if(!pseudo || !email || !password || !confirmPassword){
            setErrorMessage("Veuillez remplir tous les champs avec un *");
            return
        }
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        fetch("http://localhost:3000/users/signup", {
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
                    setIsSignModalOpen(false);
                } else {
                    setErrorMessage("Une erreur est survenue. Veuillez réessayer.");

                }
            })
    }

    function handleClose() {
        console.log("click")
        setIsSignModalOpen(false)
    }


    return (


        <div className="h-fit w-72 bg-white rounded rounded-xl flex flex-col justify-center items-center">
            <div className='absolute  w-64 top-15 translate-x-[2%] translate-y-[-745%] flex justify-end'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" onClick={handleClose} />
                </svg>
            </div>

            <div className='w-full h-[90%] flex flex-col justify-evenly items-center'>
                <h2 className="m-4 text-4xl">SignUp</h2>
                <div className={`h-20 w-20 mb-4 flex justify-center items-center rounded-full border-2 border-black ${!pseudo && !capoeiraGroup ? 'bg-bobe' : 'bg-yellow-500'}`}>
                    <span style={{ 'font-family': 'CaptureIt', 'font-size': '34px' }}>{defaultAvatar}</span>
                </div>
                <div>
                    <input placeholder='Pseudo'
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <div>
                    <input placeholder='Groupe de Capoeira'
                        value={capoeiraGroup}
                        onChange={(e) => setCapoeiraGroup(e.target.value)} /><span className='opacity-0'>*</span>
                </div>
                <div>
                    <input placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <div className='flex flex-col justify-between'>
                    <div>
                        <input className={bg}
                            type="password"
                            placeholder='Mot de passe'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} /><span className='text-red-500'>*</span>
                    </div>

                    {/* <PasswordStrength password={password} pseudo={pseudo} email={email} /> */}
                </div>
                <div>
                    <input className={bg}
                        type="password"
                        placeholder='Confirmer le mot de passe'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <div className="text-[8px] text-red-500">
                    {errorMessage}
                </div>
                <button className="h-10 w-16 mt-4 mb-6 rounded rounded-xl hover:bg-gray-300 hover:text-black"
                    onClick={handleRegister}>Confirmer</button>
            </div>
        </div>
    )
}

export default SignUp