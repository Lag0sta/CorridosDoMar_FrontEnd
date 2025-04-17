interface handleSaveUpdateProps {
    token: string,
    pseudo: string,
    group: string,
    email: string,
    password: string,
    setPassword: (value: string) => void
    setError: (value: string) => void,
    setSuccessMessage: (value: string) => void
    setIsMessageModalOpen: (value: boolean) => void
    setModalType: (value: string) => void
}

export async function handleSaveUpdate({ token, pseudo, group, email, password, setPassword, setError, setSuccessMessage, setIsMessageModalOpen, setModalType }: handleSaveUpdateProps) {
    console.log("click")
    console.log("handleSaveUpdate", "token :", token, "pseudo :", pseudo, "group :", group, "email :", email, "password :", password)
    try {
        console.log("profilUpdate AccessToken", token)
        let sendPassword
        if (!password) {
            sendPassword = "";
        } else {
            sendPassword = password
        }
        const response = await fetch('http://localhost:3000/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                accessToken: token,
                pseudo: pseudo,
                group: group,
                email: email,
                password: sendPassword,
            }),
        })
        const data = await response.json();
        if (!data.result) {
            setError(data.message);
            setModalType("updateOrError");
            setIsMessageModalOpen(true);
            return;
        } else {
            console.log("data.result", data)
            setPassword("");
            setSuccessMessage(data.message);
            setModalType("updateOrError");
            setIsMessageModalOpen(true);
        }

    } catch (error) {
        setError("An error occurred. Please try again.");
        setModalType("updateOrError");
        setIsMessageModalOpen(true);
    }

}

interface passwordAuth {
    token: string,
    oldPassword: string,
    setOldPassword: (value: string) => void
    setError: (value: string) => void,
    setModalType: (value: string) => void
    setIsMPChangeModalOpen: (value: boolean) => void
    authFor: string
    setAuthFor: (value: string) => void
}
export async function passwordAuth({ token, oldPassword, setOldPassword, setError, setModalType, setAuthFor, authFor, setIsMPChangeModalOpen }: passwordAuth) {
    console.log("click")
    try {
        if(authFor === "password"){
            const response = await fetch('http://localhost:3000/auths/passwordCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    password: oldPassword,
                }),
            })
            const isPasswordTrue = await response.json();
    
            if (isPasswordTrue.result) {
                setIsMPChangeModalOpen(true)
                setModalType("password");
                setAuthFor("")
                setOldPassword("");
                setError("")
            } else {
                setError("Wrong password");
            }
        }

        if(authFor === "email"){
            const response = await fetch('http://localhost:3000/auths/passwordCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    password: oldPassword,
                }),
            })
            const isPasswordTrue = await response.json();
    
            if (isPasswordTrue.result) {
                setIsMPChangeModalOpen(true)
                setModalType("email");
                setAuthFor("")
                setOldPassword("");
                setError("")
            } else {
                setError("Wrong password");
            }
        }
       
    } catch (error) {
        setError("An error occurred. Please try again.");
    }
}
