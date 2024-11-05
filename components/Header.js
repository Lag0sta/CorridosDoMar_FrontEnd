import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'


function Header({ setIsSignModalOpen, setIsSignIn, setIsSignUp }) {
    const [msg, setMsg] = useState(null);
    const [submit, setSubmit] = useState(null)
    const [search, setSearch] = useState(null)
    const [language, setLanguage] = useState(null)

    function handleSignInClick() {
        console.log("click")
        setIsSignModalOpen(true)
        setIsSignIn(true)
        setIsSignUp(false)
    }

    function handleSignUpClick() {
      console.log("click")
      setIsSignModalOpen(true)
      setIsSignIn(false)
      setIsSignUp(true)
  }

  const isXs = useMediaQuery({
    query: '(min-width: 0px) and (max-width: 575px)'
  })
  const isSm = useMediaQuery({
    query: '(min-width: 576px) and (max-width: 767px)'
  })
  const isMd = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1023px)'
  });

  const isLg = useMediaQuery({
    query: '(min-width: 1024px) and (max-width: 1279px) '
  });

  const isXl = useMediaQuery({
    query: '(min-width: 1280px) and (max-width: 1535px)'
  });

  const is2xl = useMediaQuery({
    query: '(min-width: 1536px)'
  });

  useEffect(() => {
    if (isXs || isSm || isMd) {
      setMsg(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>) 
      setSubmit(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
      </svg>
      )
      setSearch(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      )
      setLanguage(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
      </svg>
      )
    
    } else if (isLg || isXl || is2xl) {
        setMsg("Messagerie") 
        setSubmit("Soumettre")
        setSearch("Rechercher")
        setLanguage("Langue")
    }
  }, [isXs, isSm, isMd, isLg, isXl, is2xl])

    return (
        <div>
  <h1 className="mt-4  w-screen text-center  ">CORRIDOS DO MAR</h1>

<div className="h-32 w-screen flex justify-center">
  <div className="h-[70px] w-1/3 ml-2 flex flex-row justify-center items-center">
    <button className='mx-1 xs:h-10 xs:w-10 rounded-full flex justify-center items-center hover:bg-white hover:text -black '>{language}</button>
    <button className='mx-1 xs:h-10 xs:w-10 rounded-full flex justify-center items-center hover:bg-white'>{msg}</button>
    <button className='mx-1 xs:h-10 xs:w-10 rounded-full flex justify-center items-center hover:bg-white'>{submit}</button>
    <button className='mx-1 xs:h-10 xs:w-10 rounded-full flex justify-center items-center hover:bg-white'>{search}</button>
  </div>
  <div className="h-[70px] w-1/3 flex flex-col justify-center items-center">    
  <button className='w-20'>logout</button>
  </div>
  <div className="h-[70px] w-1/3  flex justify-center items-center portrait:flex-col">
    <button className="flex justify-center mb-1 items-center w-20 hover:bg-white hover:text-black" onClick={() => handleSignInClick()}>SignIn</button>
    <button className="flex justify-center  items-center w-20 hover:bg-white hover:text-black" onClick={() => handleSignUpClick()}>SignUp</button>
  </div>
</div>


        </div>
    )
}

export default Header

