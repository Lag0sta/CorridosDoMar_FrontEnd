import { useState } from 'react'

import styles from '../styles/Home.module.css';

import Header from './Header';
import Research from './Research';
import Footer from './Footer';
import SignIn from './SignIn'
import SignUp from './SignUp'
function Home() {

  const [isSignModalOpen, setIsSignModalOpen] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  console.log(isSignModalOpen)
  return (
    <div className="max-w-screen max-h-screen xs:max-w-screen mx-auto">
      <main className="max-w-full h-screen mx-0 grid grid-rows-6 grid-cols-4 bg-yellow-500">
        <header className=" row-start-1 row-end-2 col-start-1 col-end-5 z-10">
          <Header setIsSignModalOpen={setIsSignModalOpen}
            setIsSignIn={setIsSignIn}
            setIsSignUp={setIsSignUp} />
        </header>
        <div className="row-start-2 row-end-6 col-start-1 col-end-5 	">
          <Research />
        </div>
        <footer className=" row-start-6 row-end-7 col-start-1 col-end-5 ">
          <Footer />
        </footer>
        
        {isSignModalOpen && 
  <div class="h-screen w-screen fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        {isSignIn && <SignIn setIsSignModalOpen={setIsSignModalOpen}/>}
                        {isSignUp && <SignUp setIsSignModalOpen={setIsSignModalOpen}/>}
              
          </div>
}
      </main>

    </div>

  );
}

export default Home;
