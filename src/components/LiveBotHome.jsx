import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tutor from "../assets/aitutor.png";
import Avatar from '../assets/avatarmobile.svg'
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import {  CiUser } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { collection, addDoc,getDocs,deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const LiveBotHome = ({
  startSession,
  setLiveBotStatus

  ,
  topicIndex
  ,
  data,
  chemistryChapter,
  physicsChapter,
  biologyChapter,
  selectSubject,
  topicName,
  selectChapter,
  setSelectChapter,
  setSelectSubject,
  extractTopicNames,
  selectedTopic,
  loader,
  mstatus, msetStatus,
  setTopicIndex
}) => {
  const [difficultyLevel,setDifficultyLevel]=useState('Beginner')

  const [status, setStatus] = useState("page1");


  const handleAddTutorNote = async () => {
    try {
      const date = new Date().toLocaleDateString();

      await addDoc(collection(db, 'history'), {
        email: localStorage.getItem('USER'),
        topicsCovered: selectSubject.toUpperCase() + ": " + date + " " + selectChapter,
      });
     
      console.log("Added tutor note");
    } catch (error) {
      console.error("Error adding tutor note:", error);
    }
  };


  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('DIFFICULTY_LEVEL','Beginner')
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toDateString();

  const [isAvatarOpen, setIsAvatarOpen] = useState(true);

  const toggleAvatar = () => {
    setIsAvatarOpen(prevState => !prevState);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className="bg-white w-[100%] md:block hidden">
        <div className="main-content flex">
          <div className="section w-[45%] ">
            <div className="rounded-xl w-[300px] h-[280px] mx-auto mt-[3%] border border-[#ff9a33] overflow-hidden">
              <div className="bg-[#ff9a33] text-center py-6 rounded-t-xl">
                <h2 className="text-3xl text-white">{formattedTime}</h2>
                <h3 className="text-white text-sm">{formattedDate}</h3>
              </div>
              <div className="bg-[#fff4e9] p-4 h-full">
                <p className="pl-3 text-sm">
                  Todays Topic : approx time 1 hour
                </p>
                <h3 className="pl-3 pt-5 font-semibold text-sm">
                  {selectChapter}
                </h3>
                <ul className="list-disc pl-12 text-xs pt-4">
                  <li>{topicName.length} sub-topics</li>
                  <li>{topicName.length} quiz</li>
                  <li>Revision of the entire topic</li>
                </ul>
                <p></p>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src={Tutor}
                alt="ABC"
                className="mx-auto "
                width={250}
                height={300}
              />
            </div>
          </div>

          {status == "page1" && (
            <div className="section-2 w-1/2">
              {/* <div className="search-bar mb-4 mt-4 flex flex-row items-center">
                <label className="p-1 text-sm font-semibold pl-6">
                  Search topic
                </label>
                <div className="border border-gray-500 p-1 ml-4 pl-3 rounded-xl w-[58%] flex items-center relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full outline-none"
                  />
                  <FaSearch className="h-5 w-5 absolute right-3 text-gray-500 pointer-events-none" />
                </div>
              </div> */}

              <div id="liveselect" className="dropdowns flex pt-4 space-x-4">
                <div className="mb-4 flex ">
                  <label
                    htmlFor="dropdown1"
                    className="block text-sm font-semibold p-1 pl-6"
                  >
                    Subject
                  </label>
                  <select
                    onChange={(e) => {
                      console.log(selectSubject);
                      setSelectSubject(e.target.value);

                      if (e.target.value) {
                        // Check if a subject has been selected
                        if (e.target.value === "chemistry") {
                          setSelectChapter(chemistryChapter[0]);
                          extractTopicNames(chemistryChapter[0]);
                        } else if (e.target.value === "biology") {
                          setSelectChapter(biologyChapter[0]);
                          extractTopicNames(biologyChapter[0]);
                        } else {
                          setSelectChapter(physicsChapter[0]);
                          extractTopicNames(physicsChapter[0]);
                        }
                      }
                    }}
                    id="dropdown1"
                    className="border p-1 px-2  ml-5 bg-[#fff4e9] rounded-xl text-sm"
                  >
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                  </select>
                </div>

                <div className="mb-4 flex pr-2">
                  <label
                    htmlFor="dropdown2"
                    className="block text-sm font-semibold p-1 "
                  >
                    Chapter
                  </label>
                 {loader? <div       className="border rounded-xl  p-1 px-4  ml-5 bg-[#fff4e9] 		 text-sm"><span className="loading-text">Loading...</span></div>: <select
                    onChange={(e) => {
                      setSelectChapter(e.target.value);
                      extractTopicNames(e.target.value);
                    }}
                    id="dropdown2"
                    className="border rounded-xl  p-1 px-4  ml-5 bg-[#fff4e9] text-sm"
                  >
                    {selectSubject === "physics" &&
                      physicsChapter.map((chap) => {
                        return (
                          <option value={chap} key={chap}>
                            {chap}
                          </option>
                        );
                      })}
                    {selectSubject === "biology" &&
                      biologyChapter.map((chap) => {
                        return (
                          <option value={chap} key={chap}>
                            {chap}
                          </option>
                        );
                      })}
                    {selectSubject === "chemistry" &&
                      chemistryChapter.map((chap) => {
                        return (
                          <option value={chap} key={chap}>
                            {chap}
                          </option>
                        );
                      })}
                  </select>}
               
                </div>
                
              </div>
              <div id="understanding" className="mb-2 mt-4 flex w-[100%]">
                  <label
                    htmlFor="dropdown1"
                    className="block text-sm font-semibold p-1 pl-6 "
                  >
                    Understanding Option
                  </label>
                  <select 
                  value={difficultyLevel}
                    onChange={(e) => {
                    

                        setDifficultyLevel(e.target.value)
                       localStorage.setItem('DIFFICULTY_LEVEL',e.target.value)
                       console.log('Local Storage'+localStorage.getItem('DIFFICULTY_LEVEL'));
                   
                    }}
                    id="dropdown1"
                    className="border p-1 px-2  ml-5 bg-[#fff4e9] rounded-xl text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              <hr />
              <hr />

              <div className="hierarchy-links mt-4 pl-8 flex space-x-6">
                <p className="text-sm  flex">
                  <span>
                    <span className="text-black cursor-pointer mr-4 underline capitalize">
                      {selectSubject}
                    </span>
                    {"> "}
                  </span>
                </p>

                <p className="text-sm  flex">
                  <span>
                    <span
                      className="text-black cursor-pointer mr-4 underline"
                      onClick={() => handleTopicClick("Units and Measurements")}
                    >
                      {selectChapter}
                    </span>{" "}
                    {"> "}
                  </span>
                </p>

                <p className="text-sm ">
                  <span>
                    <span
                      className="text-black cursor-pointer underline"
                      onClick={() => handleSubtopicClick(null)}
                    >
                      Topics
                    </span>
                  </span>
                </p>
              </div>

              <div id="topics" className="topics overflow-y-auto  h-[350px] mt-[5%] scrollbar-hide">
                <ol className="pl-12 text-sm pt-8 space-y-3 list-decimal cursor-pointer">
                  {topicName.map((topics,index) => {
                    return (
                      <li key={index}
                      className={
                        topicIndex === index ? "text-[#ff9a33]" : ""
                      }
                      onClick={() => {setTopicIndex(index); }}>
                        {topics}
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="flex flex-row justify-center pt-[5%] ">
                <button
                  className="border border-[#ff9a33] rounded-lg px-14 py-2 text-[#ff9a33] mr-4 text-sm "
                  onClick={() => {
                    handleAddTutorNote();
                  }}
                >
                  {" "}
                  MARK AS COMPLETED
                </button>
                <button id="startlearning"
  className={`text-white ${loader ? 'bg-gray-300' : 'bg-[#ff9a33]'} rounded-lg px-14 py-2 text-sm `}
  disabled={loader}
  onClick={() => {
    setLiveBotStatus("study");
    startSession();
  }}
>
START LEARNING
</button>
              </div>
            </div>
          )}
          {status == "page2" && (
            <div className="section-2 w-1/2">
              <div className="search-bar mb-4 mt-4 flex flex-row items-center">
                <label className="p-1 text-sm font-semibold pl-6">
                  Search topic
                </label>
                <div className="border border-gray-500 p-1 ml-4 pl-3 rounded-xl w-[58%] flex items-center relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full outline-none"
                  />
                  <FaSearch className="h-5 w-5 absolute right-3 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="dropdowns flex pt-4 space-x-16 ">
                <div className="mb-4 flex ">
                  <label
                    htmlFor="dropdown1"
                    className="block text-sm font-semibold p-1 pl-6"
                  >
                    Subject
                  </label>
                  <select
                    id="dropdown1"
                    className="border p-1 px-2 w-full ml-5 bg-[#fff4e9] rounded-xl text-sm"
                  >
                    <option value="option1">Physics</option>
                    <option value="option2">Chemistry</option>
                    <option value="option3">Biology</option>
                  </select>
                </div>

                <div className="mb-4 flex">
                  <label
                    htmlFor="dropdown2"
                    className="block text-sm font-semibold p-1"
                  >
                    Chapter
                  </label>
                  <select
                    id="dropdown2"
                    className="border rounded-xl  p-1 px-4 w-full ml-5 bg-[#fff4e9] text-sm"
                  >
                    <option value="option1">Units and Measurement</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <hr />
              <hr />

              <div className="flex flex-col items-center justify-center pt-20">
                <p className="font-semibold pb-10 ">
                  Lets see how much are you familiar with this topic
                </p>
                <div className="flex-row justify-center items-center text-center  space-y-8 cursor-pointer">
                  <option className="bg-gray-200 rounded-full py-2 px-20  text-sm font-semibold text-[#232323] w-full">
                    Beginner
                  </option>
                  <option className="bg-gray-200 rounded-full py-2  text-sm font-semibold text-[#232323] w-full">
                    Moderate
                  </option>
                  <option className="bg-gray-200 rounded-full py-2  text-sm font-semibold text-[#232323] w-full">
                    Already Learned
                  </option>
                  <option className="bg-gray-200 rounded-full py-2  text-sm font-semibold text-[#232323] w-full">
                    Revising
                  </option>
                </div>
              </div>

              <div className="flex flex-row justify-center pt-14">
                <button className={`border border-[#ff9a33] rounded-lg px-14 py-2 text-[#ff9a33] mr-4 text-sm`}>
                  {" "}
                  Change the topic
                </button>
                <button className="text-white bg-[#ff9a33] rounded-lg px-14 py-2 text-sm">
                  START LEARNING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden block flex flex-col justify-center w-full  mx-4 ">
       

        <div className="flex flex-col ">
          <div className="section-mobile">
           

            {/*Page 1 */}
            {mstatus == "m1" && (
              <div className="mx-5">
                <div className="rounded-xl w-full h-[280px] mt-10 border border-[#ff9a33] overflow-hidden ">
                  <div className="bg-[#ff9a33] text-center py-6 rounded-t-xl">
                    <h2 className="text-3xl text-white">{formattedTime}</h2>
                    <h3 className="text-white text-sm">{formattedDate}</h3>
                  </div>
                  <div className="bg-[#fff4e9] p-4 h-full">
                    <p className="pl-3 text-sm">
                      Todays Topic: approx time 1 hour
                    </p>
                    <h3 className="pl-3 pt-5 font-semibold text-sm">
                      Learn with NEET AI Live Tutor
                    </h3>
                    <ul className="list-disc pl-12 text-xs pt-4">
                      <li>Sub-topics</li>
                      <li>Quizzes</li>
                      <li>Revision of the entire topic</li>
                    </ul>
                    <p></p>
                  </div>
                </div>
                {/* <p className="text-center pt-2 mt-2 text-sm underline text-[#ff9a33]">
                  Skip this topic
                </p> */}

                <div  onClick={() => {
                      msetStatus("m2");
                    }} className=" bg-[#ff9a33] justify-center items-center hover:bg-orange-600 rounded-xl cursor-pointer text-white flex text-center  py-4 mt-4">
                  <p
                    className="  text-lg font-normal mr-2"
                   
                  >
                 Lets start
                  </p>
                  <FaArrowRight size={18}/>

                </div>
                <div className="mt-[4%]">
      <div className="pt-8 relative">
        
      <div className={`absolute top-8 m-4 ${isAvatarOpen ? '' : 'hidden'} ${screenWidth > 400 ? 'right-12' : 'right-8'}`}>
      <HiOutlineDotsVertical size={24} fill="white" color="white" onClick={toggleAvatar} />
    </div>
        {isAvatarOpen && (
          <div>
            <Image
              src={Avatar}
              alt="ABC"
              className="mx-auto"
              width={300}
              height={300}
            />
           
          </div>
        )}
       
      </div>
      <div className="absolute bottom-4 right-4">
              <div className={`bg-[#ff9a33] p-2 rounded-full border-solid border-2 ${isAvatarOpen ? 'hidden' : ''}`}>
                <CiUser size={30} fill="white" onClick={toggleAvatar} />
              </div>
            </div>
    </div>
              </div>
            )}

            {/*Page 2 */}
            {mstatus == "m2" && (
              <div>
                <div className="">
                  {/* <div className="hierarchy-links mt-4  flex flex-wrap items-center ">
                    <p className="text-sm flex items-center pl-2">
                      <span className="text-black cursor-pointer mr-4 underline capitalize">
                        {selectSubject}
                      </span>
                      {"> "}
                    </p>

                    <p className="text-sm ml-4">
                      <span style={{ whiteSpace: "nowrap" }}>
                        <span
                          className="text-black cursor-pointer mr-4 underline "
                          onClick={() =>
                            handleTopicClick("Units and Measurements")
                          }
                        >
                          {selectChapter}
                        </span>{" "}
                        {"> "}
                      </span>
                    </p>

                    <p className="text-sm ml-2">
                      <span style={{ whiteSpace: "nowrap" }}>
                        <span
                          className="text-black cursor-pointer underline"
                          onClick={() => handleSubtopicClick(null)}
                        >
                          Topics
                        </span>
                      </span>
                    </p>
                  </div> */}

                  <div className="pt-4 pl-2">
                    <div className="mb-4 flex ">
                      <label
                        htmlFor="dropdown1"
                        className="block text-sm font-semibold p-1"
                      >
                        Subject
                      </label>
                      <select
                      value={selectSubject}
                        onChange={(e) => {
                          setSelectSubject(e.target.value);
                        }}
                        id="dropdown1"
                        className="border p-1 px-2  ml-5 bg-[#fff4e9] rounded-xl text-sm"
                      >
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="biology">Biology</option>
                      </select>
                    </div>

                    <div className="mb-4 flex pr-2">
                      <label
                        htmlFor="dropdown2"
                        className="block text-sm font-semibold p-1 "
                      >
                        Chapter
                      </label>
                      {loader? <div       className="border rounded-xl  p-1 px-4  ml-5 bg-[#fff4e9] 		 text-sm"><span className="loading-text">Loading...</span></div>:

                      <select
                      value={selectChapter}
                        onChange={(e) => {
                          setSelectChapter(e.target.value);
                          extractTopicNames(e.target.value);
                        }}
                        id="dropdown2"
                        className="border rounded-xl  p-1 px-4  ml-5 bg-[#fff4e9] text-sm w-[70%]"
                      >
                        {selectSubject === "physics" &&
                          physicsChapter.map((chap) => {
                            return (
                              <option value={chap} key={chap}>
                                {chap}
                              </option>
                            );
                          })}
                        {selectSubject === "biology" &&
                          biologyChapter.map((chap) => {
                            return (
                              <option value={chap} key={chap}>
                                {chap}
                              </option>
                            );
                          })}
                        {selectSubject === "chemistry" &&
                          chemistryChapter.map((chap) => {
                            return (
                              <option value={chap} key={chap}>
                                {chap}
                              </option>
                            );
                          })}
                      </select>}
                    </div>
                  </div>
                  <div className="mb-2 mt-4 flex w-[100%]">
                  <label
                    htmlFor="dropdown1"
                    className="block text-sm font-semibold p-1 pl-[13px] "
                  >
                    Understanding Option
                  </label>
                  <select 
                  value={difficultyLevel}
                    onChange={(e) => {
                    

                        setDifficultyLevel(e.target.value)
                       localStorage.setItem('DIFFICULTY_LEVEL',e.target.value)
                       console.log('Local Storage'+localStorage.getItem('DIFFICULTY_LEVEL'));
                   
                    }}
                    id="dropdown1"
                    className="border p-1 px-2  ml-5 bg-[#fff4e9] rounded-xl text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              <hr />
              <hr />
                  <div className="topics">
                    <ol className="pl-7 text-sm pt-8 space-y-3 list-decimal cursor-pointer">
                      {topicName.map((topics,index) => {
                        return (
                          <li key={index}
                            className={
                              topicIndex === index ? "text-[#ff9a33]" : ""
                            }
                            onClick={() => {setTopicIndex(index);  setLiveBotStatus("study");}}
                          >
                            {topics} 
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <div className="flex flex-col justify-center pt-4 space-y-3 pb-6">
                  <button
  className={`text-white mx-5 ${loader ? 'bg-gray-300' : 'bg-[#ff9a33]'} rounded-full px-14 py-3 text-sm `}
  disabled={loader}
  onClick={() => {
    setLiveBotStatus("study");
  }}
>
  START LEARNING
</button>

                    <button
                      className="border border-[#ff9a33] rounded-full px-14 py-3 text-[#ff9a33] text-sm mx-5"
                      onClick={() => {
                        handleAddTutorNote();
                      }}
                    >
                      {" "}
                      MARK AS COMPLETED
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loader-wave {
          display: flex;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .wave-bar {
          width: 10px;
          height: 30px;
          background-color: #e79747; /* Set color to orange */
          border-radius: 5px;
          margin: 0 5px;
          animation: wave 2s infinite ease-in-out;
        }

        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.5);
          }
        }

        .loading-text {
          font-size: 14px;
          text-align: center;
          opacity: 0;
          animation: fade 1.5s infinite;
        }

        .loading-text span {
          display: block;
        }

        @keyframes fade {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .fact {
          display: block;
          transition: opacity 0.5s ease-in-out;

        }
      
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default LiveBotHome;
