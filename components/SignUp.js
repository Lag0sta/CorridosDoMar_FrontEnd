import { useState, useEffect } from 'react'

function SignUp({ setIsSignModalOpen }) {
    const [pseudo, setPseudo] = useState('')
    const [capoeiraGroup, setCapoeiraGroup] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [bg, setBg] = useState('bg-none')

    useEffect(() => {
        if(!password || !confirmPassword) {
            setBg('bg-none')
        }else if (password === confirmPassword) {
            setBg('bg-green-500')
        }else{
            setBg('bg-red-500')
        }
    
        
    }, [password, confirmPassword])
   


    function handleRegister() {
        console.log('click')
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
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
                          } 
            }).catch((error) => {
                setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
            })
    }

    function handleClose() {
        console.log("click")
        setIsSignModalOpen(false)
    }


    return (


        <div className="h-fit w-64 bg-white rounded rounded-xl flex flex-col justify-center items-center">
            <div className='w-full h-[90%] flex flex-col justify-evenly items-center'>
                <h2 className="mb-4">SignUp</h2>

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
                <div>
                    <input  className={bg}
                            type="password"
                            placeholder='Mot de passe'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <div>
                    <input  className={bg}
                            type="password"
                            placeholder='Confirmer le mot de passe'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} /><span className='text-red-500'>*</span>
                </div>
                <button className="h-12 w-12 m-2 rounded rounded-full hover:bg-gray-300 hover:text-black"
                        onClick={handleRegister}>Confirmer</button>
            </div>
            <div>
                <button className="h-8 w-16 m-2 hover:bg-gray-300 hover:text-black" onClick={handleClose}>Close</button>


            </div>
        </div>
    )
}

export default SignUp