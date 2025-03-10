import { useState } from 'react'

import styles from '../styles/Home.module.css';

import Header from './Header';
import Research from './Research';
import SignIn from './SignIn'
import SignUp from './SignUp'
import MenuModal from './MenuModal';
import Submit from './Submit';
function Home() {

  const [isSignModalOpen, setIsSignModalOpen] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isMenu, setIsMenu] = useState(false)
  const [currentMainComponent, setIsCurrentMainComponent] = useState("research");

  console.log("answer", currentMainComponent)

  return (
    <div className="max-w-screen h-screen xs:max-w-screen mx-auto">
      <main className="max-w-screen h-screen mx-0 grid grid-rows-repeat-4 grid-cols-4">

        <header className=" row-start-1 row-end-2 col-start-1 col-end-5 z-10">
          <Header setIsSignModalOpen={setIsSignModalOpen}
            setIsSignIn={setIsSignIn}
            setIsSignUp={setIsSignUp}
            setIsMenu={setIsMenu}
            setIsCurrentMainComponent={setIsCurrentMainComponent} />


        </header>
        <principal className=" row-start-2 row-end-5 col-start-1 col-end-5">
            <div className='h-[100%] mx-4'>
              {currentMainComponent === "research" && <Research />}
              {currentMainComponent === "submit" && <Submit setIsCurrentMainComponent={setIsCurrentMainComponent}/>}
            </div>


        </principal>


        {isSignModalOpen &&
          <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" ></div>
            <div className='z-50'>
              {isSignIn && <SignIn setIsSignModalOpen={setIsSignModalOpen} />}
              {isSignUp && <SignUp setIsSignModalOpen={setIsSignModalOpen} />}
              {isMenu && <MenuModal setIsSignModalOpen={setIsSignModalOpen} />}


            </div>

          </div>
        }
      </main>

    </div>

  );
}

export default Home;
