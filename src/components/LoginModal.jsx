import React from "react";
import Modal from "react-modal";
import Link from "next/link";
import { useEffect } from "react";
const LoginModal = ({ isOpen, onRequestClose,setStartedSession,setActiveTab }) => {
  const modalStyles = {
    content: {
      width: "80%",
      maxWidth: "600px",
      height: "40%",
      margin: "auto",
      border: "2px solid #ccc",
      borderRadius: "12px",
    },
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      style={modalStyles}
    >
      {/* Modal 1 */}

      <div className='flex flex-col justify-center items-center h-full '>
    <p className='text-sm text-center font-semibold '>User not found. Please check your user ID.</p>
    <h2 className='font-semibold text-base text-center mt-2'>If you are seeing this please Sign Up</h2>
    <div className='mt-4'>
    <button className='text-[#FF9A33] border px-7 py-1 rounded-full mr-3' onClick={onRequestClose}>Close</button>
    <Link className='bg-[#FF9A33] border px-7 py-1 rounded-full text-white'  href='/signup'
   
  >Sign Up</Link>
    </div>
    </div>

      {/* Modal 2 */}

      {/* <div className='flex flex-col justify-center items-center h-full '>
    <p className='text-sm text-center font-semibold '>You have finished the chapter quiz</p>
    <h2 className='font-semibold text-base text-center mt-2'>Shall we move to next chapter?</h2>
    <div className='mt-4'>
    <button className='text-[#FF9A33] border px-7 py-1 rounded-full mr-3' onClick={onRequestClose}>Later</button>
    <button className='bg-[#FF9A33] border px-8 py-1 rounded-full text-white'> Yes</button>
    </div>
    </div> */}

      {/* Modal 3 */}

      {/* <div className="flex flex-col justify-center items-center h-full ">
        <div>
          <Image src={rise} />
        </div>
        <p className="text-xs text-center font-semibold mt-3">
          You are going strong with your preparations
        </p>
        <h2 className="font-semibold text-base text-center">
          Send reminder to join again tomorrow?
        </h2>
        <div className="mt-4">
          <button
            className="text-[#FF9A33] border px-4 md:px-7 py-1 rounded-full md:mr-4 mr-1"
            onClick={onRequestClose}
          >
            Maybe Later
          </button>
          <button className="bg-[#FF9A33] border px-4 md:px-8 py-1 rounded-full text-white">
            {" "}
            Yes Please
          </button>
        </div>
      </div> */}
    </Modal>
  );
};

export default LoginModal;
