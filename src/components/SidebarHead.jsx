import React, { useState, useEffect } from "react";
import logo from "../assets/livelogo.png";
import pro from "../assets/pro.svg";
import Image from "next/image";
import { GrMenu } from 'react-icons/gr';
const SidebarHead = ({ timer,liveBotStatus,setLiveBotStatus ,activeTab, handleTabChange}) => {
  const [name, setName] = useState("User");
  const [isFixed, setIsFixed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // Initial time in seconds (1 hour)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    const joyrideCompleted = localStorage.getItem('JOYRIDE_restart') === 'FALSE';
    setRunJoyride(joyrideCompleted);
  }, []);


  useEffect(() => {

    const user = localStorage.getItem("USER_NAME");
    setName(user);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let countdownInterval;

    if (timer) {
      // Set a timer to update the countdown every second when `timer` is true
      countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countdownInterval);
            return 3600; // Reset the timer for the next session
          }
          return prevTime - 1;
        });
      }, 1000); // Update every second
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [timer]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>



      <div
        className={` navbar z-10 w-full flex items-center justify-between pr-10 pt-4 pb-3   ${
          isFixed ? " top-0 bg-white shadow-md " : ""
        }`}
      >
        
        <div className="pl-6">
          <Image alt="lol" src={logo} />
        </div>
        <div className="flex-grow"></div>
        {timer && (
          <>
            <p className="pr-6 text-sm font-semibold">Time remaining {formatTime(timeRemaining)}</p>

          </>
        )}
        <div id="Profile" className="flex items-center space-x-7">
         
            
          <div className="flex items-center">
          <Image
            height={34}
            width={34}
            src={pro}
            alt="Profile"
            className="rounded-[50%] bg-[#D9D9D9]"
          />
          <p className="pl-2 text-sm font-semibold  ">{name}</p>
          </div>
        </div>
      </div>
      {/* Mobile responsive */}
   

      {liveBotStatus !== 'study' && (
        <>
          <div className={`fixed top-0 left-0 h-full bg-white z-20 w-[30%] transform ${isMenuOpen ? 'translate-x-0 transition-transform ' : '-translate-x-full transition-transform '} md:hidden`}>
            <div className="p-4 grid">
              <GrMenu size={24} onClick={toggleMenu} />

              <button className="mt-8 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('home'); setIsMenuOpen(false);speechSynthesis.cancel();}}>Home</button>
              <button className="mt-6 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('study'); setIsMenuOpen(false);speechSynthesis.cancel();}}>Study</button>
              <button className="mt-6 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('notes'); setIsMenuOpen(false);speechSynthesis.cancel();}}>Notes</button>
              <button className="mt-6 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('history'); setIsMenuOpen(false);speechSynthesis.cancel();}}>History</button>
            </div>
          </div>

          <div className={`md:hidden fixed top-0 left-0 h-full w-full z-10 ${isMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMenu}></div>

          <div className="flex items-center md:hidden justify-between p-4 w-full">
            <div className="flex-shrink-0 mr-4">
              <GrMenu size={24} onClick={toggleMenu} />
            </div>
            <div className="text-center">
              <Image src={logo} />
            </div>
            <div className="flex-shrink-0 ml-4">
              <Image
                height={34}
                width={34}
                src={pro}
                alt="Profile"
                className="rounded-[50%] bg-[#D9D9D9]"
              />
            </div>
          </div>
        </>
      )}


      <hr className="md:block hidden" />
      <hr className="md:block hidden"/>
    </>
  );
};

export default SidebarHead;
