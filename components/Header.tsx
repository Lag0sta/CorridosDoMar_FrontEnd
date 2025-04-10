import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../store/hooks';

interface Props {
  setIsModalOpen: (value: boolean) => void,
  setIsSignIn: (value: boolean) => void,
  setIsSignUp: (value: boolean) => void,
  setIsMenu: (value: boolean) => void,
  setCurrentMainComponent: (value: string) => void
}

function Header({ setIsModalOpen, setIsSignIn, setIsSignUp, setIsMenu, setCurrentMainComponent }: Props) {
  const [msg, setMsg] = useState<React.ReactNode>(null);
  const [submit, setSubmit] = useState<React.ReactNode>(null)
  const [search, setSearch] = useState<React.ReactNode>(null)
  const [language, setLanguage] = useState<React.ReactNode>(null)
  const [header, setHeader] = useState<React.ReactNode>(null)
  const defaultAvatar = useAppSelector((state) => state.user.value.avatar);
  console.log("headerDDfaultAvatar", useAppSelector((state) => state.user.value.avatar))
  let avatar: any = defaultAvatar;

  const token = useAppSelector((state) => state.authToken.value);

  const isLandscape: boolean = useMediaQuery({ query: '(orientation: landscape)' });
  const isPortrait: boolean = useMediaQuery({ query: '(orientation: portrait)' });

  const isXs: boolean = useMediaQuery({
    query: '(min-width: 0px) and (max-width: 575px)'
  })
  const isSm: boolean = useMediaQuery({
    query: '(min-width: 576px) and (max-width: 767px)'
  })
  const isMd: boolean = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1023px)'
  });

  const isLg: boolean = useMediaQuery({
    query: '(min-width: 1024px) and (max-width: 1279px) '
  });

  const isXl: boolean = useMediaQuery({
    query: '(min-width: 1280px) and (max-width: 1535px)'
  });

  const is2xl: boolean = useMediaQuery({
    query: '(min-width: 1536px)'
  });

  function handleSignInClick(): void {
    console.log("click")
    setIsModalOpen(true)
    setIsSignIn(true)
    setIsSignUp(false)
    setIsMenu(false)
  }

  function handleSignUpClick(): void {
    console.log("click")
    setIsModalOpen(true)
    setIsSignIn(false)
    setIsSignUp(true)
    setIsMenu(false)

  }

  function openMenuModal(): void {
    setIsModalOpen(true)
    setIsSignIn(false)
    setIsSignUp(false)
    setIsMenu(true)
  }

  useEffect(() => {
    if (isXs || isSm || isMd) {
      setMsg(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
      if (isPortrait) {
        setHeader(<div>
          <div className="h-32 w-screen bg-yellow-400" />
        </div>)
      } else if (isLandscape) {

        setHeader(<div className="flex flex-row justify-between">
          <div className="h-screen w-32 bg-yellow-400" />
          <div className="h-screen w-32 bg-yellow-400" />
        </div>)
      }
    } else if (isLg || isXl || is2xl) {
      setMsg("Messagerie")
      setSubmit("Soumettre")
      setSearch("Rechercher")
      setLanguage("Langue")
    }
  }, [isXs, isSm, isMd, isLg, isXl, is2xl])

  if (token) {
    avatar = <div className="h-20 w-20 absolute left-1/2 -translate-x-1/2 top-13 translate-y-1 flex justify-center items-center rounded-full border-2 border-white bg-yellow-500"
      onClick={() => openMenuModal()}>
      <span style={{ fontFamily: 'CaptureIt', fontSize: '40px' }}>{defaultAvatar}</span>
    </div>
  }
  console.log("headerAvatar", defaultAvatar)

  function handleSubmit(): void {
    setCurrentMainComponent("submit")
  }

  function handleSearch(): void {
    setCurrentMainComponent("research")
  }


  return (
    <div>
      {header}
      <div className='absolute top-0'>
        <h1 className="mt-4 mb-4 w-screen text-center landscape:xs:text-3xl landscape:lg:text-5xl landscape:absolute landscape:top-0 landscape:left-1/2 landscape:-translate-x-1/2 text-3xl">CORRIDOS DO MAR</h1>
        <div className=" flex justify-between item-center z-10  landscape:xs:w-full landscape:xs:flex landscape:xs:flex-row-reverse landscape:xs:justify-between landscape:xs:absolute landscape:xs:top-1/2 landscape:xs:-translate-y-1/2 landscape:xs:left-1/2 landscape:xs:-translate-x-1/2 landscape:lg:flex-row landscape:lg:justify-center landscape:lg:relative landscape:lg:top-0 landscape:lg:left-0 landscape:lg:-translate-x-0 landscape:lg:-translate-y-0 ">
          <div className="h-[70px] w-1/3 ml-2 flex flex-row justify-center items-center landscape:xs:h-[90%] landscape:xs:w-fit landscape:xs:flex-col landscape:lg:h-[70px] landscape:lg:w-1/3 landscape:lg:flex-row">
            <button className='mx-1 xs:h-10 lg:h-7 xs:w-10 xs:rounded-md lg:rounded-lg flex justify-center items-center hover:bg-white hover:text -black '>{language}</button>
            <button className='mx-1 xs:h-10 lg:h-7 xs:w-10 xs:rounded-md lg:rounded-lg flex justify-center items-center hover:bg-white'
              onClick={() => handleSearch()}>{search}</button>
          </div>
          <div className="h-20 w-20 w-1/3 flex flex-col justify-center items-center">
            {avatar}
          </div>
          <div className='flex'>
            {!token && (<div className="flex justify-center items-center landscape:xs:h-[90%] landscape:xs:w-[50%] landscape:xs:flex-col landscape:lg:flex-row ">
              <span className="flex justify-center bg-black text-white px-2 py-1 items-center m-1 rounded-md text-ms hover:bg-white hover:text-black hover:font-bold hover:mr-0" onClick={() => handleSignInClick()}>Connexion</span>
              <span className="flex justify-center bg-black text-white px-2 py-1 items-center m-1  rounded-md text-ms hover:bg-white hover:text-black hover:font-bold hover:ml-0 " onClick={() => handleSignUpClick()}>Rejoindre</span>
            </div>)}
            {token && (<div className="mb-2 mr-4 flex justify-center items-center landscape:xs:h-[90%] landscape:xs:w-[50%] landscape:xs:flex-col landscape:lg:flex-row">
              <button className='mx-1  xs:h-10 lg:h-7 xs:w-10 xs:rounded-md lg:rounded-lg flex justify-center items-center hover:bg-white'>{msg}</button>
              <button className='mx-1 xs:h-10 lg:h-7 xs:w-10 xs:rounded-md lg:rounded-lg flex justify-center items-center hover:bg-white'
                onClick={handleSubmit}>{submit}</button>
            </div>)}
          </div>

        </div>

      </div>


    </div>
  )
}

export default Header

