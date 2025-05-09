import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import UserInfo from "./UserInfo";
import MySubmits from "./MySubmits";
import MyFavourites from "./MyFavourites";
interface User {
    avatar: string;
    pseudo: string;
    group: string;
    email: string;
    password?: string; // à ne pas afficher !
}
function UserProfile() {

    return (
        <div className="h-full w-full flex flex-col  ">
            <div className="mt-8 mb-2">
                <UserInfo />
            </div>
            <div className="w-full bg-gray-200 rounded-xl flex justify-evenly items-center mb-2">
                <span className="my-2">Notifications</span>
                <span className="my-2">Messages</span>
                <span className="my-2">contactes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-xl flex flex-col justify-evenly mb-2">
                <div className="mt-10 mx-2">
                    <MySubmits/>
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