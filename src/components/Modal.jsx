import React from 'react'
import student from "../assets/students.png"
import whatsapp from "../assets/whatsapp.png"
import close from "../assets/Close.png"
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect } from 'react'

const Modal = (props) => {
    function handleClose(){
        props.onClick()
        
    }
  
    const router = useRouter()
  return (
    

        

  <main className=" ">
  <div className="relative min-h-screen md:flex md:items-center md:justify-center">
  
    <div className="bg-[#FF9A33] lg:rounded-lg md:rounded-lg mx-auto p-4 w-full md:relative lg:w-2/5 md:w-4/5 h-screen xs:h-screen sm:h-screen lg:h-auto md:h-auto">
    
      <div className="md:flex flex-col items-center ">
        <h2 className='text-white text-2xl font-semibold pb-5 pt-28 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0 text-center  '>{props.status} </h2>
        {/* <h2 className='text-white text-2xl font-semibold pb-5 pt-28 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0 text-center  '>Enrolled Successfully ! </h2> */}

        <div className=" flex items-center justify-center flex-shrink-0 pb-10 pt-2 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0 ">
        <Image height={150} width={200} alt='Welcome to NEET AI Tutor' src={student} />
        </div>
        <div className=" text-center">

        <h2 className='text-white text-2xl font-bold mt-[-14px]'> Welcome to NEET AI Tutor</h2>
        <p className='mt-2 text-xs text-white ml-5 mr-5 pb-20 pt-5 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0'>
Our AI-driven platform is your key to effective NEET preparation. Lets
<span className='block'> work together to achieve your medical aspirations.</span> </p>

        </div>
      </div>
        
          <div className='flex flex-col md:flex-row justify-center items-center pt-5 mb-5'>
    <button onClick={()=>{

      router.push('/login')
    }} target='_blank' className=" text-[#33CC33] font-semibold px-4 py-2 rounded-md flex items-center mt-4 bg-white">
     
          <Image height={18} alt='Welcome to Uni Buddy' width={18} src={whatsapp} className='mr-2' />
          Login
         

        </button>
        <button className="mt-4 text-[#FF9A33] font-semibold px-4 py-2 rounded-md flex items-center ml-4 bg-white" onClick={handleClose}>
        <Image height={18} alt='Welcome to Uni Buddy' className='mr-2' width={18} src={close} />

        Close

          </button>

       
    </div>
      
     
    </div>
   

  

  </div>
</main>


  )
}

export default Modal