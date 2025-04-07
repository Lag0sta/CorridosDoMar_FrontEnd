import * as React from "react";
import { useState } from 'react'

import Header from './Header';
import Research from './Research';
import SignIn from './SignIn'
import SignUp from './SignUp'
import MenuModal from './MenuModal';
import Submit from './Submit';
import ShowElement from './ShowElement';
import UserProfile from './UserProfile';

function Home() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSignIn, setIsSignIn] = useState<boolean>(false)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [isMenu, setIsMenu] = useState<boolean>(false)
  const [currentMainComponent, setCurrentMainComponent] = useState<string>("research");
  const [selectedTitle, setSelectedTitle] = useState<string>("")

  console.log("answer", currentMainComponent)

  return (
    <div className="max-w-screen h-screen xs:max-w-screen mx-auto">
      <main className="max-w-screen h-screen mx-0 grid grid-rows-repeat-4 grid-cols-4">

        <header className=" row-start-1 row-end-2 col-start-1 col-end-5 z-10">
          <Header setIsModalOpen={(value: boolean) =>setIsModalOpen(value)}
                  setIsSignIn={(value: boolean) => setIsSignIn(value)}
                  setIsSignUp={(value: boolean) => setIsSignUp(value)}
                  setIsMenu={(value : boolean) => setIsMenu (value)}
                  setCurrentMainComponent={(value: string) => setCurrentMainComponent(value)} />
        </header>

        <div className=" row-start-2 row-end-5 col-start-1 col-end-5">
            <div className='h-[100%] mx-4'>
              {currentMainComponent === "research" && 
                <Research currentMainComponent={currentMainComponent}
                          setCurrentMainComponent={setCurrentMainComponent}
                          setSelectedTitle={setSelectedTitle}
                />
              }
              {currentMainComponent === "submit" && 
                <Submit setCurrentMainComponent={setCurrentMainComponent}
                />
              }
              {currentMainComponent === "showElement" && 
                <ShowElement setCurrentMainComponent={setCurrentMainComponent}
                             selectedTitle={selectedTitle}
                />
              }
              {currentMainComponent === "userProfile" && 
                <UserProfile />}
            </div>
        </div>

        {isModalOpen &&
          <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" ></div>
            <div className='z-50 w-[85%] bg-white rounded rounded-xl'>
              {isSignIn && <SignIn setIsModalOpen={(value: boolean) =>setIsModalOpen(value)} />}
              {isSignUp && <SignUp setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                                   setIsSignUp={(value:boolean) => setIsSignUp(value)} />}
              {isMenu && <MenuModal setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
                                    setCurrentMainComponent={(value: string) =>setCurrentMainComponent(value)}
                         />}
            </div>

          </div>
        }
      </main>

    </div>

  );
}

export default Home;
