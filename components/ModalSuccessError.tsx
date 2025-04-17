
interface Props {
    error : string;
    setError : (value : string) => void;
    successMessage : string;
    setSuccessMessage : (value : string) => void;
    setIsModalOpen : (value : boolean) => void;
    setIsMessageModalOpen : (value : boolean) => void;
  }
  const ModalSuccessError = ({ error, setError, successMessage, setSuccessMessage ,setIsModalOpen, setIsMessageModalOpen } : Props) => {
      const handleOK = () => {
          if (error) {
            setIsMessageModalOpen(false)
          }
      
          if (successMessage) {
            setIsMessageModalOpen(false)
            setIsModalOpen(false)
            
          }
          setError("")
          setSuccessMessage("")
        }
  
      return (
          <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" />
              <div className="absolute h-fit w-[75%] bg-white z-1 rounded-xl">
                  <div className='h-full w-full z-50 p-2 flex flex-col  justify-center items-center'>
                      {error && <p className="text-red-500 m-1">{error}</p>}
                      {successMessage && <p className="text-green-500">{successMessage}</p>}
                      <span className="text-white bg-black rounded-lg py-1 px-3 m-1" onClick={handleOK}>OK</span>
                  </div>
              </div>
          </div>
  
      );
  };
  
  export default ModalSuccessError;