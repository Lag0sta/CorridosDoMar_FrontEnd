function SignIn({setIsSignModalOpen}) {
    function handleClose() {
        console.log("click")
        setIsSignModalOpen(false)
    }

    return (
        <div className="h-[60%] w-[80%] bg-white rounded rounded-xl flex flex-col justify-center items-center">
            <div>
            SignIn
            </div>
            <div>
            <button onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default SignIn