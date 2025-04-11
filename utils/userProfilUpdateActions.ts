interface handleSaveUpdateProps {
    token: string,
    pseudo: string,
    group: string,
    email: string,
    password: string,
    setError: (value: string) => void
}

export async function handleSaveUdpate({ token, pseudo, group, email, password, setError }: handleSaveUpdateProps) {
    console.log("click")

    try {
        const response = await fetch('http://localhost:3000/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                pseudo: pseudo,
                group: group,
                email: email,
                password: password,
            }),
        })
        const user = await response.json();
    if (!user || !user.userId) {
      setError("Token invalide ou expiré.");
      return;
    }

    } catch (error) {
        setError("An error occurred. Please try again.");

    }

}


interface AuthProps {
    token: string,
    oldPassword: string,
    setOldPassword: (value: string) => void
    setError: (value: string) => void,
    setIsEmailOrPswd: (value: string) => void
    setAuthFor: (value: string) => void
}
export async function passwordAuth ({ token, oldPassword, setOldPassword, setError, setIsEmailOrPswd, setAuthFor }: AuthProps){
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
            setIsEmailOrPswd("password");
            setAuthFor("")
            setOldPassword("");
        }else{
            setError("Wrong password");
        }
    }catch (error) {
        setError("An error occurred. Please try again.");
    }
}

export async function emailAuth ({ token, oldPassword, setOldPassword, setError, setIsEmailOrPswd, setAuthFor }: AuthProps){
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
            setIsEmailOrPswd("email");
            setAuthFor("")
            setOldPassword("");
        }else{
            setError("Wrong password");
        }
    }catch (error) {
        setError("An error occurred. Please try again.");
    }
}