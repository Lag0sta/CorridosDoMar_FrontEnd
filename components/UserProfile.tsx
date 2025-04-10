import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

function UserProfile() {
    const defaultAvatar = useAppSelector((state) => state.user.value.avatar);
    const token = useAppSelector((state) => state.user.value.token);
    console.log("tokenUserInfo", token)

    let user = useAppSelector((state) => state.user.value)

    let pseudo = user.pseudo
    console.log("userProfile user", user)

    // useEffect(() => {
    //     try {
    //         if (token) {
    //             user = useAppSelector((state) => state.user.value)
    //             console.log("userInfo", user)
    //             pseudo = user.pseudo             
    //         }

    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }, [])

    const avatar = <div className="h-20 w-20 flex justify-center items-center rounded-full border-2 border-white bg-yellow-500">
        <span style={{ fontFamily: 'CaptureIt', fontSize: '40px' }}>{defaultAvatar}</span>
    </div>

    return (
        <div className="h-full w-full flex ">
            {token && (
                <div className="w-full bg-blue-500 ">
                    <div className="m-2">
                        {avatar}
                        {pseudo}

                    </div>
                    <div>

                    </div>
                </div>
            )}
            <div className="w-full bg-red-500">

            </div>


        </div>
    )
}

export default UserProfile