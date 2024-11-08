import { useState, useEffect } from 'react'

function SignIn({setIsSignModalOpen}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState('');
    function handleClose() {
        console.log("click")
        setIsSignModalOpen(false)
    }

    useEffect(() => {
        console.log(token); // maintenant, token devrait avoir la valeur correcte
      }, [token]); // exécute le code lorsque la valeur de token change
    
function handleConnection() {
    fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
    }).then((response) => response.json())
          .then((data) => {
            if (data.result) { 
              console.log("data :", data)
              setToken(data.token);    
              handleClose();        
              setEmail("");
              setPassword("");
              setErrorMessage("");
            } else {
              setErrorMessage("Email ou Mot de passe incorrect"); // affiche un message d'error si le mdp ou email pas bon ou manquant
            }
          });
          console.log(token)

}      
     
console.log("token :", token)

    return (
        <div className="h-fit w-64 bg-white rounded rounded-xl flex flex-col justify-center items-center">
        <div className='w-full h-[90%] flex flex-col justify-evenly items-center'>
            <h2 className="mb-4">SignUp</h2>

         
            <div>
                <input placeholder='Email'
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input  type="password"
                        placeholder='Mot de passe'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
            </div>
          
            <button className="h-12 w-12 m-2 rounded rounded-full hover:bg-gray-300 hover:text-black"
                    onClick={handleConnection}
                    >connection
                    </button>
        </div>
        <div>
            <button className="h-8 w-16 m-2 hover:bg-gray-300 hover:text-black" onClick={handleClose}>Close</button>


        </div>
    </div>
    )
}

export default SignIn