import Image from 'next/image'
import person from "../assets/signup.png";
import React, { useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

import { useRouter } from 'next/router'
import ConsentFormModal from './ConsentFormModal'
import Modal from './Modal'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {IoArrowBackCircleOutline} from 'react-icons/io5'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name,setName]=useState('')
  const navigate = useRouter()
  const [consentForm, setConsentForm] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function Signup (e: any) {
    e.preventDefault()
    if(password.length<8){
      alert('Password length is too small')
    }
     createUserWithEmailAndPassword(auth, email, password)
      .then (async userCredential  => {
        try {
          const docRef = await addDoc(collection(db, 'users'), {
            
            email:email,
           name:name,
           password:password
          })
          console.log('Document written with ID: ', docRef.id)
        } catch (e) {
          console.error('Error adding document: ', e)
        }
        alert('User Signed Up successfully')
        const user = userCredential.user
        console.log('signup ' + user)
        navigate.push('/login')
        // ...
      })
      .catch(error => {
        console.log(error)
        alert(error.message)
        // ..
      })
  }
  const [status, setStatus] = useState("");

  function closeButton() {
    setStatus("");
  }
  return (
    <>
      {status == "registered" && (
        <Modal
          status="User Signed Up Successfully !"
          message="Welcome to NEET AI Tutor"
          note="Let's get you ready for NEET Exam"
          onClick={closeButton}
        />
      )}
      {status == "unregistered" && (
        <Modal
          status="User is already registered !"
          message="We already found you in our database."
          note="If you forgot password you can reset the password"
          onClick={closeButton}
        />
      )}
      {consentForm == true && (
        <ConsentFormModal setConsentForm={setConsentForm} />
      )}
      
      



    
      {status == "" && (
        <>
          <div className="hidden lg:block">
            <div className="min-h-screen bg-[#FFF4E9] relative signup-page flex flex-col lg:flex-row items-center">
              {/* Left side - Form */}
              <div className=" lg:w-1/2 ">
                <div className="bg-white lg:rounded-3xl md:rounded-3xl shadow-lg overflow-hidden flex items-center justify-center  3xl:h-[732px] 2xl:h-[732px] lx:h-[732px] 1xl:h-[732px] xl:h-[540px]  xl:mx-24 md:mx-12 lg:mx-22 mx-0">
                  <div className="w-[70%] xl:pr-10 lg:pr-4">
                    <h2 className="3xl:pt-10 2xl:pt-10 1xl:pt-10 lx:pt-10 xl:pt-6 lg:pt-4 mb-2 3xl:text-3xl 2xl:text-3xl lx:text-3xl 1xl:text-3xl xl:text-3xl lg:text-2xl text-black font-bold">
                      Sign Up
                    </h2>
                    <p className="mt-2 mb-4 font-normal 3xl:text-base 2xl:text-base lx:text-base xl:text-base 1xl:text-base text-[#1E1E1E]">
                      Get started with NEET AI Tutor
                    </p>

                    <form onSubmit={Signup} autoComplete="off">
                      <label
                        htmlFor=""
                        className="3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs block translate-x-1 text-black mb-2"
                      >
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        id="username"
                        name="username"
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="input-field w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                      />

                      <label
                        htmlFor=""
                        className="3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs block translate-x-1 text-black mt-3 mb-2"
                      >
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        id="username"
                        name="username"
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="input-field  w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                      ></input>
                     

                      <label className="translate-x-1 block 3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs text-black mb-2">
                        Password
                      </label>
                      <div className="password-input-container">
      <div className="input-wrapper">
        <input
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            
          }}
          className="input-field  w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={()=>setPasswordVisible(!passwordVisible)}
          className="password-toggle-btn"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

                      <div className="flex flex-col">
                        <button
                          className={`border  3xl:mt-6 2xl:mt-6 1xl:mt-6 lx:mt-6 xl:mt-3 lg:mt-3 mb-1 pt-2 px-4 pb-2 rounded-3xl 3xl:w-36 2xl:w-36 1xl:w-36 xl:w-28 lg:w-28 lx:w-36  text-white 3xl:text-base 2xl:text-base 1xl:text-base lx:text-base xl:text-sm font-bold bg-[#FF9A33] cursor-pointer   md:lg:bg-[#FF9A33] lg:bg-[#FF9A33]`}
                          type="submit"
                        
         
             
              
                    
                          value="Create User"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  
                    <div className="mt-4 mb-8 3xl:text-sm 2xl:text-sm 1xl:text-sm lx:text-sm xl:text-xs lg:text-xs font-normal">
                      <label className="flex text-black">
                        <span>Already have an account?</span>
                        <span className="font-semibold ml-1">
                          <Link
                            href={"/login"}
                            className="text-[#FF9A33] cursor-pointer"
                          >
                            <span className="underline underline-offset-1">
                              Login
                            </span>
                          </Link>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Image and Text */}
              <div className="lg:w-1/2 relative h-screen hidden md:block lg:block">
                <div className=" absolute top-[10%] lg:top-[10%] xl:top-[10%] 2xl:top-[10%] right-[50%] lg:right-[51%] text-[#1E1E1E]">
                  <h1 className=" text-4xl lg:text-4xl md:text-5xl xl:lg:text-5xl font-bold tracking-tight">
                    Discover Our
                  </h1>
                  <h1 className="font-bold text-5xl lg:text-6xl md:text-7xl xl:text-7xl text-[#018F39] mt-2">
                    NEET AI
                  </h1>
                  <h1 className="text-3xl lg:text-3xl md:text-4xl xl:text-4xl font-bold tracking-tight mt-2">
                    Tutor Innovation
                  </h1>
                </div>
                <div className="absolute bottom-0 right-0">
                  <Image
                    src={person}
                    alt="Sign Up"
                    className="3xl:w-[640px] 3xl:h-[572px] 2xl:w-[640px] 2xl:h-[572px] lx:w-[640px] lx:h-[572px] 1xl:w-[640px] 1xl:h-[572px] xl:w-[440px] xl:h-[372px]"
                    // style={{ maxWidth: "100%", width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tablet View */}

          <div className="hidden md:block  lg:hidden ">
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white overflow-hidden rounded-3xl shadow-lg px-32">
                <div className="w-full px-8 py-8">
                  <h2 className=" mb-2 text-3xl text-black font-bold">
                    Sign Up
                  </h2>
                  <p className="mb-4 font-normal text-base text-[#1E1E1E]">
                    Get started with NEET AI Tutor
                  </p>

                  <form onSubmit={Signup} autoComplete="off">
                      <label
                        htmlFor=""
                        className="3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs block translate-x-1 text-black mb-2"
                      >
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        id="username"
                        name="username"
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="input-field w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                      />

                      <label
                        htmlFor=""
                        className="3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs block translate-x-1 text-black mt-3 mb-2"
                      >
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        id="username"
                        name="username"
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="input-field  w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                      ></input>
                     

                      <label className="translate-x-1 block 3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs text-black mb-2">
                        Password
                      </label>
                      <div className="password-input-container">
      <div className="input-wrapper">
        <input
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            
          }}
          className="input-field  w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={()=>setPasswordVisible(!passwordVisible)}
          className="password-toggle-btn"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

                      <div className="flex flex-col">
                        <button
                          className={`border  3xl:mt-6 2xl:mt-6 1xl:mt-6 lx:mt-6 xl:mt-3 lg:mt-3 mb-1 pt-2 px-4 pb-2 rounded-3xl 3xl:w-36 2xl:w-36 1xl:w-36 xl:w-28 lg:w-28 lx:w-36  text-white 3xl:text-base 2xl:text-base 1xl:text-base lx:text-base xl:text-sm font-bold bg-[#FF9A33] cursor-pointer   md:lg:bg-[#FF9A33] lg:bg-[#FF9A33]`}
                          type="submit"
                        
         
             
              
                    
                          value="Create User"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>

                  <div className="mt-4 text-sm font-normal">
                    <label className="flex text-black">
                      <span>Already have an account?</span>
                      <span className="font-semibold ml-1">
                        <Link
                          href={"/login"}
                          className="text-[#FF9A33] cursor-pointer"
                        >
                          <span className="underline underline-offset-1">
                            Login
                          </span>
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  Mobile Responsive*/}

          <div className="block lg:hidden md:hidden">
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white overflow-hidden">
                <div className="w-full px-8 py-8">
                  <h2 className=" mb-2 text-3xl text-black font-bold text-center">
                    Sign Up
                  </h2>
                  <p className="mb-8 font-normal text-base text-[#1E1E1E] text-center">
                    Get started with NEET AI Tutor
                  </p>

                  <form onSubmit={Signup} autoComplete="off">
                      <label
                        htmlFor=""
                        className="3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs block translate-x-1 text-black mb-2"
                      >
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        id="username"
                        name="username"
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="input-field w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                      />

                      <label
                        htmlFor=""
                        className="3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs block translate-x-1 text-black mt-3 mb-2"
                      >
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        id="username"
                        name="username"
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="input-field  w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                      ></input>
                     

                      <label className="translate-x-1 block 3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs lg:text-xs text-black mb-2">
                        Password
                      </label>
                      <div className="password-input-container">
      <div className="input-wrapper">
        <input
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            
          }}
          className="input-field  w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={()=>setPasswordVisible(!passwordVisible)}
          className="password-toggle-btn"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

                      <div className="flex flex-col">
                        <button
                          className={`border  3xl:mt-6 2xl:mt-6 1xl:mt-6 lx:mt-6 xl:mt-3 lg:mt-3 mb-1 pt-2 px-4 pb-2 rounded-3xl 3xl:w-36 2xl:w-36 1xl:w-36 xl:w-28 lg:w-28 lx:w-36  text-white 3xl:text-base 2xl:text-base 1xl:text-base lx:text-base xl:text-sm font-bold bg-[#FF9A33] cursor-pointer   md:lg:bg-[#FF9A33] lg:bg-[#FF9A33]`}
                          type="submit"
                        
         
             
              
                    
                          value="Create User"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>

                  <div className="mt-4 text-sm font-normal">
                    <label className="flex text-black justify-center">
                      <span className="">Already have an account?</span>
                      <span className="font-semibold ml-1">
                        <Link
                          href={"/login"}
                          className="text-[#FF9A33] cursor-pointer"
                        >
                          <span className="underline underline-offset-1">
                            Login
                          </span>
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Signup
