import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import UserInfo from "./UserInfo";

interface User {
    avatar: string;
    pseudo: string;
    group: string;
    email: string;
    password?: string; // à ne pas afficher !
}
function UserProfile() {

    return (
        <div className="h-full w-full flex flex-col mt-10 ">
            <UserInfo/>
            <div className="w-full bg-gray-200 rounded-xl flex justify-evenly items-center mb-2">
                <span className="my-2">Notifications</span>
                <span className="my-2">Messages</span>
                <span className="my-2">contactes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-xl flex justify-center items-center mb-2">
                <div>
                    <span>Articles publiés</span>
                    <div>
                        listes des articles
                    </div>
                </div>
                <div>
                    <span>Favorits</span>
                    <div>
                        listes des favorits
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserProfile