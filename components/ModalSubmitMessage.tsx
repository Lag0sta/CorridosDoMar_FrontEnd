
interface Props {
  error : string;
  setError : (value : string) => void;
  successMessage : string;
  setSuccessMessage : (value : string) => void;
  setIsSubmitModalOpen : (value : boolean) => void;
  setCurrentMainComponent : (value : string) => void
}
const ModalSubmitMessage = ({ error, setError, successMessage, setSuccessMessage ,setIsSubmitModalOpen, setCurrentMainComponent } : Props) => {
    const handleOK = () => {
        if (error) {
          setIsSubmitModalOpen(false)
        }
    
        if (successMessage) {
          setIsSubmitModalOpen(false)
          setCurrentMainComponent("research")
          
        }
        setError("")
        setSuccessMessage("")
      }

    return (
        <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" />
            <div className="absolute h-fit w-[75%] bg-white z-1 rounded-xl">
                <div className='h-full w-full z-50 p-2 flex flex-col  justify-end items-center'>
                    {error && <p className="text-red-500 m-1">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <span className="text-white bg-black rounded-xl py-3 px-6 m-1" onClick={handleOK}>OK</span>
                </div>
            </div>
        </div>

    );
};

export default ModalSubmitMessage;