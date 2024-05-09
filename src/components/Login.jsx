import Image from 'next/image'
import person from "../assets/signup.png";
import Link from 'next/link'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../../firebase'
import { useRouter } from 'next/router'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginModal from './LoginModal'
const Login = ({ setIsLoggedIn }) => {
  const navigate = useRouter()
  const [openModal,setOpenModal]=useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  function Login (e) {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log('logged in' + user)
        alert('Logged in succesfully')
        localStorage.setItem('USER', email)
        // setIsLoggedIn(true)
        navigate.push('/')

        // ...
      })
      .catch(error => {
        console.log(error)
        
        alert('Wrong email or password')
      })
  }
  return (
    <>
    <LoginModal isOpen={openModal} onRequestClose={()=>setOpenModal(false)}/>
      <div className="hidden lg:block">
        <div className="min-h-screen bg-[#FFF4E9] relative signup-page flex flex-col lg:flex-row items-center">
          <div className=" lg:w-1/2 ">
            <div className="bg-white lg:rounded-3xl md:rounded-3xl shadow-lg overflow-hidden flex items-center justify-center  xl:mx-24 md:mx-12 lg:mx-22 mx-0">
              <div className="w-[70%] xl:pr-10 lg:pr-4 py-24">
                <h2 className=" mb-2 3xl:text-3xl 2xl:text-3xl lx:text-3xl 1xl:text-3xl xl:text-3xl text-black font-bold">Log In</h2>
                <p className="mt-2 mb-4 font-normal text-base text-[#1E1E1E]">
                  Welcome back to NEET AI Tutor
                </p>

                <form onSubmit={Login} autoComplete="off">

                  <label className="translate-x-1 block 3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs text-black mt-3 mb-2">
                      Email
                  </label>
                  <input
                
                    autoComplete="new-password"
                    value={email}
                    onChange={(e) => {
              
                                      setEmail(e.target.value);
                    }}
                    className="input-field w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
                    placeholder="Enter your email"
                  />

                 
              

                  <label className="translate-x-1 block 3xl:text-sm 2xl:text-sm lx:text-sm 1xl:text-sm xl:text-xs text-black mb-2">
                    Password
                  </label>
                  <div className="password-input-container">
      <div className="input-wrapper">
        <input
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="input-field w-full 3xl:h-[40px] 2xl:h-[40px] 1xl:h-[40px] lx:h-[40px] xl:h-[30px]"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="password-toggle-btn"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

                  <span className="font-normal text-sm flex justify-end mt-1">
                  <Link href={"/reset"} className="text-[#FF9A33] cursor-pointer">
                      <span className="">Forgot Password?</span>
                    </Link>
                  </span>

                  <div className="flex flex-col">
                    <button
                      className={`border mt-6 mb-1 pt-2 px-4 pb-2 rounded-3xl 3xl:text-base 2xl:text-base 1xl:text-base lx:text-base xl:text-sm  text-white 3xl:w-36 2xl:w-36 1xl:w-36 xl:w-28 lx:w-36 font-bold bg-[#FF9A33] cursor-pointer md:lg:bg-[#FF9A33] lg:bg-[#FF9A33]`}
                      type="submit"
                      value="Create User"
                    >
                      Log In
                    </button>
                  </div>
                </form>

                <div className="mt-4 mb-8 text-sm font-normal">
                  <label className="flex text-black">
                    <span>Dont have an account?</span>
                    <span className="font-semibold ml-1">
                      <Link
                        href={"/signup"}
                        className="text-[#FF9A33] cursor-pointer"
                      >
                        <span className="underline underline-offset-1">
                          Create Account
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

      <div className="hidden md:block lg:hidden ">
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white overflow-hidden rounded-3xl shadow-lg px-32">
            <div className="w-full px-8 py-8">
              <h2 className=" mb-2 text-3xl text-black font-bold text-center">
                Log In
              </h2>
              <p className="mb-4 font-normal text-base text-[#1E1E1E] text-center">
                Welcome back to NEET AI Tutor
              </p>

              <form onSubmit={Login} autoComplete="off">
                <label className="translate-x-1 block text-sm text-black mt-3 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="new-password"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="input-field "
                  placeholder="84********"
                />

              

                <label className="translate-x-1 block text-sm text-black mb-2">
                  Password
                </label>
                <div className="password-input-container">
      <div className="input-wrapper">
        <input
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="input-field"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="password-toggle-btn"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
                <span className="font-normal text-sm flex justify-end mt-1">
                <Link href={"/reset"} className="text-[#FF9A33] cursor-pointer">
                    <span className="">Forgot Password?</span>
                  </Link>
                </span>

                <div className="flex flex-col">
                  <button
                    className={`border mt-6 mb-1 pt-2 px-4 pb-2 rounded-3xl w-36 text-white font-bold bg-[#FF9A33] cursor-pointer md:lg:bg-[#FF9A33] lg:bg-[#FF9A33]`}
                    type="submit"
                    value="Create User"
                  >
                    Log In
                  </button>
                </div>
              </form>

              <div className="mt-4 text-sm font-normal">
                <label className=" text-black">
                  <span>Dont have an account?</span>
                  <span className="font-semibold ml-1">
                    <Link href={"/signup"} className="text-[#FF9A33] cursor-pointer">
                      <span className=" underline underline-offset-1">
                        Create Account
                      </span>
                    </Link>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive*/}

      <div className="block lg:hidden md:hidden">
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white overflow-hidden">
            <div className="w-full px-8 py-8">
              <h2 className=" mb-2 text-3xl text-black font-bold text-center">
                Log In
              </h2>
              <p className="mb-8 font-normal text-base text-[#1E1E1E] text-center">
                Welcome back to NEET AI Tutor
              </p>

              <form onSubmit={Login} autoComplete="off">
                {/* Form fields and buttons */}

                <label className="translate-x-1 block text-sm text-black mt-3 mb-2">
                 Email
                </label>
                <input
                  type="email"
                  id="phone"
                  autoComplete="new-password"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="input-field "
                  placeholder="84********"
                />

              

                <label className="translate-x-1 block text-sm text-black mb-2">
                  Password
                </label>
                <div className="password-input-container">
      <div className="input-wrapper">
        <input
          type={passwordVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="input-field"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="password-toggle-btn"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

                <span className="font-normal text-sm flex justify-end mt-1">
                  <Link href={"/reset"} className="text-[#FF9A33] cursor-pointer">
                    <span className="">Forgot Password?</span>
                  </Link>
                </span>

                <div className="flex flex-col">
                  <button
                    className={`border mt-6 mb-1 pt-2 pb-2 rounded-3xl w-full text-white font-bold bg-[#FF9A33] cursor-pointer md:lg:bg-[#FF9A33] lg:bg-[#FF9A33]`}
                    type="submit"
                    value="Create User"
                  >
                    Log In
                  </button>
                </div>
              </form>

              <div className="mt-4 text-sm font-normal text-center">
                <label className="flex text-black flex-col items-center">
                  <span className="mb-2">Dont have an account?</span>
                  <span className="font-semibold">
                    <Link href={"/signup"} className="text-[#FF9A33] cursor-pointer">
 <span className="underline underline-offset-1">
                        Create Account
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
  )
}

export default Login
