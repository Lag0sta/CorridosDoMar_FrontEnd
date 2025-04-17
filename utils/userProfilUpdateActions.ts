interface handleSaveUpdateProps {
    token: string,
    pseudo: string,
    group: string,
    email: string,
    password: string,
    setError: (value: string) => void,
    setIsModalOpen: (value: boolean) => void
    setModalType: (value: string) => void
}

export async function handleSaveUpdate({ token, pseudo, group, email, password, setError, setIsModalOpen, setModalType }: handleSaveUpdateProps) {
    console.log("click")
console.log("handleSaveUpdate", "token :", token, "pseudo :", pseudo, "group :", group, "email :", email, "password :", password)
    try {
        let sendPassword
        if(!password){ 
            sendPassword = "";
        }else{
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
      setIsModalOpen(true);
      return;
    } else {
        console.log("data.result", data)

        setError(data.message);
        setModalType("updateOrError");
        setIsModalOpen(true);
    }

    } catch (error) {
        setError("An error occurred. Please try again.");
        setModalType("updateOrError");
        setIsModalOpen(true);
    }

}


interface AuthProps {
    token: string,
    oldPassword: string,
    setOldPassword: (value: string) => void
    setError: (value: string) => void,
    setModalType: (value: string) => void
    setAuthFor: (value: string) => void
}
export async function passwordAuth ({ token, oldPassword, setOldPassword, setError, setModalType, setAuthFor }: AuthProps){
    console.log("click")
    try {
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

        if(isPasswordTrue.result){
            setModalType("password");
            setAuthFor("")
            setOldPassword("");
        }else{
            setError("Wrong password");
        }
    }catch (error) {
        setError("An error occurred. Please try again.");
    }
}

export async function emailAuth ({ token, oldPassword, setOldPassword, setError, setModalType, setAuthFor }: AuthProps){
    console.log("click")
    try {
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

        if(isPasswordTrue.result){
            setModalType("email");
            setAuthFor("")
            setOldPassword("");
        }else{
            setError("Wrong password");
        }
    }catch (error) {
        setError("An error occurred. Please try again.");
    }
}