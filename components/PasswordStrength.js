import { useState, useEffect, prevState } from "react";

function PasswordStrength({password, pseudo, email}) {
  const [strength, setStrength] = useState(0);
  let msg;

  console.log('strength:'+ strength)
  // useEffect(() => {
    if (password && pseudo && email) {
      // calcul de la nouvelle valeur de strength
      // ...
      setStrength(strength)
    } else {
      setStrength(0)
    }

    if (password.length >= 8) {
      if (strength < 1) {
        setStrength(prevState + 1);
      }
    }

    // if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(password)) {
    //   strength += 2;
    // }
    // if (password && typeof password === 'string') {
    //   const commonWords = [
    //     "password",
    //     "song",
    //     "lyrics",
    //     pseudo && typeof pseudo === 'string' ? pseudo.toLowerCase() : '',
    //     email && email.split("@")[0].toLowerCase()
    //   ];
    //   if (!commonWords.includes(password.toLowerCase())) {
    //     strength += 1;
    //   }
    // }
  //   setStrength(strength);
  // }, [password, pseudo, email]);

  // Calcul de la force du mot de passe
  if (strength >= 4) {
    msg = "Très fort";
  } else if (strength >= 3) {
    msg = "Fort";
  } else if (strength >= 2) {
    msg = "Bon";
  } else if (strength >= 1) {
    msg = "Moyen";
  } else {
    msg = "Faible";
  }

  return (
    <div>
      {password && typeof password === 'string' ? (
        <div className="flex  w-40  ml-0.5 mb-2">
          <div className={`w-5 h-1 mr-1 rounded-md ${strength >= 0 ? 'bg-red-800' : 'bg-white border border-black'}`} />
          <div className={`w-5 h-1 mx-1 rounded-md ${strength >= 1 ? 'bg-red-500' : 'bg-white border border-black'}`} />
          <div className={`w-5 h-1 mx-1 rounded-md ${strength >= 2 ? 'bg-orange-500' : 'bg-white border border-black'}`} />
          <div className={`w-5 h-1 mx-1 rounded-md ${strength >= 3 ? 'bg-yellow-500' : 'bg-white border border-black'}`} />
          <div className={`w-5 h-1 ml-1 rounded-md ${strength >= 4 ? 'bg-green-500' : 'bg-white border border-black'}`} />
        </div>
      ) : (
        <div className="flex w-40  ml-0.5 mb-2">
          <div className="w-5 h-1 mr-1 border border-black rounded-md bg-white" />
          <div className="w-5 h-1 mx-1 border border-black rounded-md bg-white" />
          <div className="w-5 h-1 mx-1 border border-black rounded-md bg-white" />
          <div className="w-5 h-1 mx-1 border border-black rounded-md bg-white" />
          <div className="w-5 h-1 ml-1 border border-black rounded-md bg-white" />
        </div>
      )}
    </div>
  );
}

export default PasswordStrength;