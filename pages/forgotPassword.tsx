import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const forgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const router = useRouter();

  function returnHome() {
    router.push('/');
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/auths/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email envoyé pour réinitialisation de mot de passe.');
      } else {
        setMessage(data.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      setMessage('Impossible d’envoyer l’email.');
    }

  }

  return (
    <div className='h-screen w-screen'>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <h1 className=' mt-2'>Mot de Passe Oublié</h1>
        <input
          className= "h-10 w-56 mt-2"
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='w-56 flex justify-between mt-1'>
          <button className='h-9 w-20 rounded rounded-md hover:bg-yellow-400 hover:text-white text-sm'
            onClick={returnHome}>Retour</button>
          <button className="h-9 w-32 rounded rounded-md hover:bg-yellow-400 hover:text-white text-sm"
            onClick={handleSubmit}>
            Envoyer
          </button>
        </div>

      </div>

    </div>
  );
};

export default forgotPassword;