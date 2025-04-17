import React from 'react';
import { useState } from 'react';

const forgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async () => {
    console.log("click")
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
        <h1 className='mb-2 mt-2'>Forgot Password</h1>
        <p className='mb-2 mt-2 text-xs'>Please enter your email to reset your password.</p>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
               <button className="h-8 w-28 mt-4 mb-6 rounded rounded-full hover:bg-gray-300 hover:text-black text-sm"
          onClick={handleSubmit}>Envoyer</button>
      </div>

    </div>
  );
};

export default forgotPassword;