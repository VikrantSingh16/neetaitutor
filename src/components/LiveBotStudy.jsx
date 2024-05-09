import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../assets/livelogo.png";
import Tutor from "../assets/aitutor.png";
import pro from "../assets/pro.svg";
import { FaRegWindowMinimize } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import BeginnerExplanation from './LiveTutorData/livetutor_beginnerexplanations.json'
import AdvancedExplanation from './LiveTutorData/explanation_advanced.json'
import IntermediateExplanation from './LiveTutorData/explanation_intermediate.json'
import SummaryIntermediate from './LiveTutorData/summary_intermediate.json'
import SummaryAdvanced from './LiveTutorData/summary_advanced.json'
import Summary from './LiveTutorData/summary.json'
import MCQ from './LiveTutorData/mcq.json'
import { AiOutlineDelete } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BiExitFullscreen } from "react-icons/bi";
import Modal from "../components/LiveBotModal";
import { GrMenu } from "react-icons/gr";
import speakLive from "../assets/speakLive.gif";
import MarkdownRenderer from "./MarkdownRenderer";
import { CiPause1 } from "react-icons/ci";
import { RxResume } from "react-icons/rx";
import axios from "axios";
import Draggable from "react-draggable";
import { GiSpeaker } from "react-icons/gi";
import { collection, addDoc,getDocs,deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
const LiveBotStudy = ({
  selectSubject,
  topicName,
  selectChapter,
  data,
  phone,
  liveBotStatus,
  setLiveBotStatus,
  mstatus,msetStatus,topicIndex
})=>{

  
const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
const [note, setNote] = useState("");
const [avtarVisible, setAvtarVisible] = useState(true);
const [loading, setLoading] = useState(false);
const [quizLoading, setQuizLoading] = useState(false);
const [explanation, setExplanation] = useState(``);
const [summary, setSummary] = useState("");
const [summaryLoading, setSummaryLoading] = useState(false);
const [difficultyLevel,setDifficultyLevel]=useState(localStorage.getItem('DIFFICULTY_LEVEL'))
const [section, setSection] = useState();
const [mcq, setMCQ] = useState([]);
const [transcript, setTranscript] = useState(
  "To ask any question click on the mic icon"
);
const [isRecording, setIsRecording] = useState(false);
const [trigger, setTrigger] = useState("");
const [gpt, setGPT] = useState(false);
const [gptLoader, setGPTLoader] = useState(false);
const [micLoader, setMicLoader] = useState(false);
const [captionView,setViewCaption]=useState(false)
const [status, setStatus] = useState("page1");
const [notesVisible,setNotesVisible]=useState(false)
const [modalIsOpen, setModalIsOpen] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [topicStatus, setTopicStatus] = useState({
  newtonsLaw: true,
});
const [clickedItem, setClickedItem] = useState(null);
const [startIndex,setStartIndex]=useState()
const [endIndex,setEndIndex]=useState()
const [topicCompleted,setTopicCompleted]=useState(false)
const [isPlaying, setIsPlaying] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);
const [optionDisabled, setOptionsDisabled] = useState(false);
const [correctOption, setCorrectOption] = useState(false);
const [correctOptionSelected,setCorrectOptionSelected]=useState()
const [totalCorrectOptions, setTotalCorrectOptions] = useState(0);
const [index, setIndex] = useState(0);
const [isMenuOpen, setMenuOpen] = useState(false);
const [isListening, setIsListening] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const menuRef = useRef(null);
const handleDelete = () => {
    setNote("");
  };
  const handleAddTutorNote = async () => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        
        email:localStorage.getItem('USER'),
       note:note
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  };
  


  function getSectionByChapterAndTopic(chapterName, topicName) {
    const foundObject = data.find(
      (obj) => obj.chapter_name === chapterName && obj.topic_name === topicName
    );

    if (foundObject) {
      return foundObject.section;
    } else {
      return section;
    }
  }

  const [micEnabled, setMicEnabled] = useState(true);

  useEffect(() => {
    
    getSectionExplanation(topicName[topicIndex])
  

  
  }, []);



  function findExplanationBySection(lessons, section) {
    return lessons.find(lesson => lesson.section === section);
  }
  function findSummaryBySection(lessons, section) {
    return lessons.find(lesson => lesson.section === section);
  }
  function findMCQBySection(lessons, section) {
    return lessons.find(lesson => lesson.section === section);
  }
  const [sectionVar,setSectionVar] = useState()
  const getSectionExplanation = async (topic) => {
    speechSynthesis.cancel();
    setIndex(0)
    setTopicCompleted(false)
    setSelectedOption(null)
    setClickedItem(null)
    const sectionTemp = getSectionByChapterAndTopic(selectChapter, topic);
    setSectionVar(sectionTemp)
    if(sectionTemp){
          console.log('Intermediate');
          console.log('Advanced');
          console.log(difficultyLevel+typeof(difficultyLevel));
          if(difficultyLevel=='Intermediate'){
            const tempExplanation = findExplanationBySection(IntermediateExplanation, sectionTemp).explanation;
            if(tempExplanation){
          
              setExplanation(tempExplanation);
         
            // setTimeout(()=>{
            //     speakText(tempExplanation)
            //   },1000)
            
             
          }
          const tempSummary = findSummaryBySection(SummaryIntermediate,sectionTemp).summary
          if(tempSummary){
            setSummary(tempSummary)
          }
          }
          else if(difficultyLevel=='Advanced'){
            const tempExplanation = findExplanationBySection(AdvancedExplanation, sectionTemp).explanation;
            if(tempExplanation){
            
                setExplanation(tempExplanation);
           
              // setTimeout(()=>{
              //     speakText(tempExplanation)
              //   },1000)
              
               
            }
            const tempSummary = findSummaryBySection(SummaryAdvanced,sectionTemp).summary
            if(tempSummary){
              setSummary(tempSummary)
            }
          }
          else{
            const tempExplanation = findExplanationBySection(BeginnerExplanation, sectionTemp).explanation;
            if(tempExplanation){
            
                setExplanation(tempExplanation);
           
              // setTimeout(()=>{
              //     speakText(tempExplanation)
              //   },1000)
              
               
            }
            const tempSummary = findSummaryBySection(Summary,sectionTemp).summary
            if(tempSummary){
              setSummary(tempSummary)
            }
          }
       
         
           const tempMCQ = findMCQBySection(MCQ,sectionTemp).questions
           if(tempMCQ){
            setMCQ(tempMCQ)
           }

    }

  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      window.speechSynthesis.pause();
      setIsPlaying(false)
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () =>{ window.removeEventListener("beforeunload", unloadCallback);     }
    
  }, []);
  const startRecording = () => {
    setIsListening(true);
    setGPT(false);
    pauseSpeech();
    setIsPlaying(false)
    setMicLoader(true);
    setTranscript("");
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      setMicLoader(false);
      setTranscript(transcript);
      setGPTLoader(true);
      chatgpt
        .chatGpt(
          transcript +
            `INSTRUCTIONS: You are NEET AI TUTOR, an expert teacher committed to clarity and brevity. Delve into the intricacies of the NEET study material, specifically in chapter ${selectChapter}, ensuring your explanations are brief yet cover the given doubt thoroughly. Your goal is to provide a concise yet comprehensive understanding, making complex concepts easily digestible for the learner. Your name is synonymous with precision—NEET AI TUTOR. AND BOLD IMPORTANT KEYWORDS`
        )
        .then((res) => {
          setTranscript(res);
          setGPT(true);
          setGPTLoader(false);
        });
      setIsRecording(false);
    };
    recognition.start();
    setIsRecording(true);
  };
 

 
  function preprocessChemicalFormulas(text) {

    let processedText = text.replace(/²/g, " squared")
                             .replace(/³/g, " cubed")
                             .replace(/¹/g, ""); 


    processedText = processedText.replace(/(\d)⁻/g, "$1 negative charge")
                                  .replace(/⁻/g, " negative");

   

    return processedText;
}


async function speakText(explanation) {
  setTrigger("true");
  setIsPlaying(true);


 if (explanation) {
    let preprocessedExplanation = preprocessChemicalFormulas(explanation);


   const sanitizedExplanation = preprocessedExplanation.replace(
      /(https?:\/\/\S+|#|\/|\\|\*)/gi,
      ""
    );


   const speechSynthesis = window.speechSynthesis;


   if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }


   const speechUtterance = new SpeechSynthesisUtterance(sanitizedExplanation);


   const voices = speechSynthesis.getVoices();
    speechUtterance.voice = voices.find(
      (voice) => voice.name === "Microsoft Zira - English (United States)"
    );


   speechUtterance.pitch = 1;
    speechUtterance.rate = 1;


   speechUtterance.onboundary = function (event) {
      const charIndex = event.charIndex;


     // Adjust the highlighting based on the position of images
      const currentWord = getCurrentWord(sanitizedExplanation, charIndex);
      const adjustedWordStart = adjustForImages(currentWord.wordStart);
      const adjustedWordEnd = adjustForImages(currentWord.wordEnd);


     setStartIndex(adjustedWordStart);
      setEndIndex(adjustedWordEnd);
    };


   speechUtterance.onend = function () {
      setTrigger("");
      setIsPlaying(false);
    };


   speechSynthesis.speak(speechUtterance);
  }
}


// Adjust for images by checking if the current word is within an image tag
function adjustForImages(wordIndex) {
  const images = explanation.match(/!\[.*?\]\((.*?)\)/g) || [];
  for (const image of images) {
    const imageIndex = explanation.indexOf(image);
    if (wordIndex >= imageIndex && wordIndex < imageIndex + image.length) {
      return imageIndex + image.length;
    }
  }
  return wordIndex;
}

    function getCurrentWord(text, startIndex, endIndex) {
    const words = text.split(/\s+/); 
    let currentChar = 0;
  
    for (const word of words) {
      const wordStart = currentChar;
      const wordEnd = currentChar + word.length;

      if ((wordStart <= startIndex && startIndex < wordEnd) ||
          (wordStart < endIndex && endIndex <= wordEnd) ||
          (startIndex < wordStart && wordEnd < endIndex)) {
            return {wordStart,wordEnd};
       
      }
  
      currentChar += word.length + 1; 
    }
  
    return "";
  }
 
let isPaused;
let  resumeTimestamp;
  function pauseSpeech() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      isPaused = true;
      resumeTimestamp = window.speechSynthesis.currentTime;
    }
  }
  function resumeSpeech() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.resume();
      isPaused = true;
      resumeTimestamp = window.speechSynthesis.currentTime;
    }
  }


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };
  
  const toggleTopic = (topic) => {
    setTopicStatus((prevStatus) => ({
      ...prevStatus,
      [topic]: !prevStatus[topic],
    }));
  };



  const handleClick = (index) => {
    setClickedItem(index === clickedItem ? null : index);
  };
 
  const handleOptionClick = (option) => {
    
    setOptionsDisabled(true);
    setSelectedOption(option);
    if (mcq[index].correct_answer == option) {
      setCorrectOptionSelected(mcq[index].correct_answer)
      setCorrectOption(true);
      setTotalCorrectOptions(totalCorrectOptions + 1);
    } else {
      setCorrectOption(false)
    }
  };

  const handleNextClick = async () => {
    setCorrectOptionSelected()
    setOptionsDisabled(false);
    if(selectedOption==null){
    alert('Please select a option')
    }
    
    else if (mcq.length - 1 == index) {
      setTopicCompleted(true)
      setModalIsOpen(true);

      try {
        const response = await axios.post("/api/liveTutorMCQScore", {
          phone: phone,
          subject: selectSubject,
          chapter: selectChapter,
          topic: topicName[index],
          score: totalCorrectOptions,
        });

        if (response.status === 200) {
        
        } else {
          console.error("Failed to update score record");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setIndex(index + 1);
      setSelectedOption(null)
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 

  const toggleSpeech = () => {
    if (isPlaying) {
      pauseSpeech();
    } else {
      resumeSpeech();
    }
    setIsPlaying(!isPlaying);
  };


  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOption = (option) => {
  
    closeMenu();
  };



  const MicClick = () => {
    startRecording();
    setIsModalOpen(true);
  };


  return (
<>



  
      <div className="bg-white w-[100%] md:block hidden">
      
        <div className="main-content  flex">
        {notesVisible? (
            <div className="section-2 w-[30%] flex flex-col">
              <h2 className="py-4 pl-8 flex text-lg text-black font-semibold">
                New Note
                <div onClick={()=>setNotesVisible(false)} className="ml-48 hover:cursor-pointer"><RxCross2 size={24} /></div>
              </h2>
            

              <hr />
              <hr />
              <div className=" mx-8 pt-6 relative">
                <div className="relative">
                  {/* Textarea */}
                  <textarea
                    className="w-full h-[400px] bg-[#fff4e9] p-3 rounded-lg resize-none focus:outline-none"
                    placeholder="Type your note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />

                  {/* Delete Icon */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                    onClick={handleDelete}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-auto mx-auto pb-10">
                <button className="text-white bg-[#ff9a33] rounded-lg px-14 py-2 text-sm"
                 onClick={() => {

                  handleAddTutorNote().then(()=>{
                    setNotesVisible(!notesVisible)

                  })
              
                }}
                >
                  ADD NOTE
             
                </button>
              </div>
            </div>
          ): <>
          <div className="  section-study w-[360px] flex flex-col h-[91vh]">
            <h2
              className="font-semibold pt-5 px-[26px] pb-4 text-base flex items-center cursor-pointer capitalize"
              onClick={toggleDropdown}
            >
              {selectSubject},{selectChapter}
              <span
                className={`ml-2 transition-transform rotate-0 ${
                  isOpen ? "transform rotate-0" : ""
                }`}
              >
            
              </span>
            </h2>
            <hr />

            <div className="px-8 pt-6 space-y-3 ">
              <div className="flex items-center justify-between">
                <h3
                  className={`font-semibold cursor-pointer ${
                    clickedItem === 0 ? "text-[#ff9a33]" : ""
                  }`}
                  onClick={() => {
                    handleClick(0);
                    toggleTopic("newtonsLaw");
                  }}
                >
                  Topics
                </h3>
                <div className="cursor-pointer arrow-container flex pt-1">
                  <span
                    className={`ml-2 transition-transform  ${
                      topicStatus.newtonsLaw ? "transform rotate-0" : ""
                    }`}
                    onClick={() => toggleTopic("newtonsLaw")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        transform: topicStatus.newtonsLaw
                          ? "rotate(360deg)"
                          : "rotate(360deg)",
                      }}
                    >
                      <path
                        d="M11.3335 6.1133C11.2086 5.98913 11.0396 5.91943 10.8635 5.91943C10.6873 5.91943 10.5184 5.98913 10.3935 6.1133L8.00013 8.4733L5.64013 6.1133C5.51522 5.98913 5.34625 5.91943 5.17013 5.91943C4.994 5.91943 4.82504 5.98913 4.70013 6.1133C4.63764 6.17527 4.58805 6.249 4.5542 6.33024C4.52036 6.41148 4.50293 6.49862 4.50293 6.58663C4.50293 6.67464 4.52036 6.76177 4.5542 6.84301C4.58805 6.92425 4.63764 6.99799 4.70013 7.05996L7.5268 9.88663C7.58877 9.94911 7.6625 9.99871 7.74374 10.0326C7.82498 10.0664 7.91212 10.0838 8.00013 10.0838C8.08814 10.0838 8.17527 10.0664 8.25651 10.0326C8.33775 9.99871 8.41149 9.94911 8.47346 9.88663L11.3335 7.05996C11.3959 6.99799 11.4455 6.92425 11.4794 6.84301C11.5132 6.76177 11.5307 6.67464 11.5307 6.58663C11.5307 6.49862 11.5132 6.41148 11.4794 6.33024C11.4455 6.249 11.3959 6.17527 11.3335 6.1133Z"
                        fill="#474747"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {topicStatus.newtonsLaw && (
      <div className="px-8 overflow-y-auto h-[380px] scrollbar-hide">
        <div className=" items-center justify-between">
          {topicName.map((topic, index) => (
            <h3
              key={index}
              onClick={() => {
                const sectionTemp = getSectionByChapterAndTopic(selectChapter, topic);
                if(window.speechSynthesis.paused&&sectionTemp==sectionVar){
                  window.speechSynthesis.resume();
                  setIsPlaying(true)
                  setStatus("page1");
                  setSelectedTopicIndex(index);
                }
                else{
                setIsPlaying(false)
                getSectionExplanation(topic);
                setStatus("page1");
                setSelectedTopicIndex(index);
                }
              }}
              className={`font-semibold text-sm cursor-pointer mt-2 ${
                loading
                  ? selectedTopicIndex === index
                    ? 'text-[#ff9a33] '
                    : 'opacity-50'
                  : ''
              }${selectedTopicIndex === index?'text-[#ff9a33]':''}`}
              style={{ pointerEvents: loading ? 'none' : 'auto' }}
            >
              {index + 1} {topic} 
              <hr />
            </h3>
          ))}
        </div>
      </div>
    )}

              {/* {mcq.length !== 0 && summary !== "" && ( */}
                           { summary !== "" && (

                <>
                  <h3
                    className={`font-semibold cursor-pointer ${
                      clickedItem === 2 ? "text-[#ff9a33]" : ""
                    }`}
                    onClick={() => {
                      handleClick(2);
                      setStatus("quiz");
                      window.speechSynthesis.pause();
                    }}
                  >
                    Quiz
                  </h3>

                  <h3
                    onClick={() => {
                      handleClick(3);
                      setStatus("summary");
                      window.speechSynthesis.pause();
                    }}
                    className={`font-semibold cursor-pointer ${
                      clickedItem === 3 ? "text-[#ff9a33]" : ""
                    }`}
                  >
                    Summary
                  </h3>
                </>
              )}
            </div>

            <div className="mt-auto mx-auto pb-[1%] ">
              <button
                onClick={() => {
                  setNotesVisible(!notesVisible)
                }}
                className="text-white bg-[#ff9a33] rounded-lg px-14 py-2 text-sm "
              >
                NEW NOTE
              </button>
            
            </div>
            
          </div>
          </> }
          {status == "page1" && (
            <div className="section-2 w-[80%] flex flex-col x">
                 <div className="dropdowns flex pt-4 space-x-4">
           
</div>
            <div className="flex left-[23%] fixed bottom-10">
              { avtarVisible && (
              
              <Draggable key="uniqueKey" onStart={() => {}} onStop={handleStop} position={position}>
              {isPlaying? 
               <div className="border-2 rounded-xl  border-black h-[280px]  w-[280px] text-center relative">
                   <div className="absolute rounded-lg h-[26px] w-[100%]  bg-black  flex top-0  ">
                       <FaRegWindowMinimize onClick={() => {
                          setAvtarVisible(!avtarVisible);
                        }} className='ml-[225px] mb-2 cursor-pointer' color='white'/>
                       <CgProfile className='ml-[9px] mt-[1px] cursor-pointer' size={20} color='white'/>
                   </div>
                  <Image
                    alt="Tutor"
                    className=" aladdin-appear mt-2 ml-2"
                    width={260}
                    height={260}
                    src={speakLive}
                  />
                  </div>

                      : <div className="border-2 rounded-xl  border-black h-[280px]   w-[280px] text-center relative">
                      <div className="absolute rounded-lg  h-[26px] w-[100%] bg-black  flex top-0  ">
                          <FaRegWindowMinimize onClick={() => {
 setAvtarVisible(!avtarVisible);                             }} className='ml-[225px] mb-2 cursor-pointer' color='white'/>
                          <CgProfile className='ml-[9px] mt-[1px] cursor-pointer' size={20} color='white'/>
                      </div>
     <center>
                       <Image
                         src={Tutor}
                         alt="Tutor"
                         className=" aladdin-appear mt-2"
                         width={190}
                         height={190}
                       />
                       </center>
                       </div>}
                </Draggable>
              )}
             
  
            </div>
    
          
              <div className="flex flex-col h-[640px]">
                
                {loading ? (
                  <div className="fixed top-1/2 left-1/2 transform translate-x-[100px] -translate-y-1/2">
                  </div>
                ) : (
                  <>
                  
                    <div className="flex-1 overflow-y-auto hide-scrollbar h-[200px]">
                    <MarkdownRenderer captionView={captionView} inputText={explanation} startIndex={startIndex} endIndex={endIndex} />                    </div>

                    {isModalOpen && (
                      <div
                        className="bg-white border shadow-md livebot-modal flex  "
                      >
                     
                        <div
                          className="mic-modal-content flex flex-col px-24 py-4 w-[50%] "
                        
                        >
                               <div style={{marginLeft:'550px'}}
                                          onClick={() => {
                              setTranscript(
                                "Ask any questions using the mic icon"
                              );
                              setGPT(false);
                              setIsModalOpen(false)
                            }} 
                            className="hover:cursor-pointer"
                            ><div style={{ visibility: transcript !== "" ? 'hidden' : 'visible' }}>
                            <RxCross2 size={24} />
                          </div></div>  
                            
                        {gpt ? "NEET AI Tutor" : "User Questions"}: {transcript}
                        <div 
                        className="w-[80%] mx-auto mt-12">
                          
                      <p className="text-center text-lg font-semibold px-10 text-gray-600  ">
                        {gpt && (
                          <div className="flex">
                          
                            <button
                            className="text-white  bg-[#ff9a33] rounded-lg h-10  px-14  text-sm ml-6"
                            onClick={() => {
                              setTranscript(
                                "Ask any questions using the mic button"
                              );
                              setGPT(false);
                             
                              setIsModalOpen(false)
                         
                             
                            }}
                          >
                            I Understood
                          </button>
                          </div>
                        )}
                        {gptLoader && (
                          <>
                            <div class="flex gap-2 justify-center mt-2 mb-6">
                              <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                              <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                              <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                            </div>
                          </>
                        )}
                   
                       
                      </p>
                    </div>
                       {(!gpt&&!gptLoader)&&
                          <div
                            onClick={() => {
                              startRecording();
                            
                            }}
                            className={`mic-icon my-[30px]  bg-[#ff9f3e] mx-auto rounded-full p-3 ${
                              micLoader ? "listening" : ""
                            }`}
                          >
                            
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="19"
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                d="M8.14325 9.37938C7.62196 9.37938 7.12203 9.17593 6.75342 8.81379C6.38482 8.45165 6.17773 7.96048 6.17773 7.44834V3.03455C6.17773 2.78096 6.22857 2.52986 6.32735 2.29558C6.42613 2.06129 6.57091 1.84842 6.75342 1.6691C6.93594 1.48979 7.15261 1.34755 7.39108 1.25051C7.62955 1.15346 7.88514 1.10352 8.14325 1.10352C8.40137 1.10352 8.65696 1.15346 8.89542 1.25051C9.13389 1.34755 9.35057 1.48979 9.53308 1.6691C9.7156 1.84842 9.86038 2.06129 9.95915 2.29558C10.0579 2.52986 10.1088 2.78096 10.1088 3.03455V7.44834C10.1088 7.96048 9.90169 8.45165 9.53308 8.81379C9.16448 9.17593 8.66454 9.37938 8.14325 9.37938Z"
                                fill="white"
                              />
                              <path
                                d="M11.2312 5.51709V7.44812C11.2312 9.12095 9.84519 10.4826 8.14249 10.4826C6.43979 10.4826 5.05382 9.12095 5.05382 7.44812V5.51709H3.93066V7.44812C3.93066 9.54247 5.52386 11.2738 7.58091 11.5447V13.793H5.61539V14.8964H10.6696V13.793H8.70406V11.5447C10.7611 11.2738 12.3543 9.54247 12.3543 7.44812V5.51709H11.2312Z"
                                fill="white"
                              />
                            </svg>
                          </div>
}                     
                        </div>
                        
                      </div>
                    )}

                    <div className="flex  justify-center items-center space-x-4 py-6 ">
                      <div
                        onClick={() => {
                          setAvtarVisible(!avtarVisible);
                        }}
                        className="icon bg-[#ff9f3e] 
                        hover:bg-[#FE6B00] rounded-full p-3  cursor-pointer"
                        title="MAXIMIZE AND MINIMIZE AVATAR"

                      >
                        {!avtarVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="19"
                            viewBox="0 0 18 17"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_1_5406)">
                              <path
                                d="M9.15786 8.5C9.98368 8.5 10.791 8.25074 11.4776 7.78375C12.1643 7.31675 12.6994 6.65299 13.0155 5.87641C13.3315 5.09982 13.4142 4.24529 13.2531 3.42087C13.092 2.59645 12.6943 1.83917 12.1103 1.2448C11.5264 0.650425 10.7824 0.245652 9.97245 0.0816645C9.16249 -0.0823227 8.32295 0.00184147 7.55999 0.323514C6.79703 0.645186 6.14491 1.18992 5.68611 1.88883C5.22731 2.58774 4.98242 3.40943 4.98242 4.25C4.98353 5.37683 5.42379 6.45718 6.2066 7.25396C6.98941 8.05075 8.0508 8.49888 9.15786 8.5ZM9.15786 1.41667C9.70841 1.41667 10.2466 1.58284 10.7044 1.89417C11.1621 2.2055 11.5189 2.64801 11.7296 3.16573C11.9403 3.68346 11.9954 4.25314 11.888 4.80276C11.7806 5.35237 11.5155 5.85722 11.1262 6.25347C10.7369 6.64972 10.2409 6.91957 9.70092 7.02889C9.16095 7.13822 8.60125 7.08211 8.09261 6.86766C7.58397 6.65321 7.14923 6.29006 6.84336 5.82412C6.53749 5.35818 6.37423 4.81038 6.37423 4.25C6.37423 3.49856 6.66751 2.77789 7.18954 2.24653C7.71157 1.71518 8.4196 1.41667 9.15786 1.41667Z"
                                fill="white"
                              />
                              <path
                                d="M9.15769 9.9165C7.49716 9.91838 5.90517 10.5906 4.731 11.7858C3.55683 12.9809 2.89637 14.6013 2.89453 16.2915C2.89453 16.4794 2.96785 16.6595 3.09836 16.7924C3.22887 16.9252 3.40587 16.9998 3.59044 16.9998C3.775 16.9998 3.95201 16.9252 4.08252 16.7924C4.21303 16.6595 4.28634 16.4794 4.28634 16.2915C4.28634 14.9765 4.79957 13.7153 5.71313 12.7854C6.62668 11.8556 7.86573 11.3332 9.15769 11.3332C10.4496 11.3332 11.6887 11.8556 12.6022 12.7854C13.5158 13.7153 14.029 14.9765 14.029 16.2915C14.029 16.4794 14.1024 16.6595 14.2329 16.7924C14.3634 16.9252 14.5404 16.9998 14.7249 16.9998C14.9095 16.9998 15.0865 16.9252 15.217 16.7924C15.3475 16.6595 15.4208 16.4794 15.4208 16.2915C15.419 14.6013 14.7585 12.9809 13.5844 11.7858C12.4102 10.5906 10.8182 9.91838 9.15769 9.9165Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_5406">
                                <rect
                                  width="16.7018"
                                  height="17"
                                  fill="white"
                                  transform="translate(0.806641)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : (
                          <BiExitFullscreen size={20} color="white" />
                        )}
                      </div>

                
                      <div
                        onClick={() => {
                          speakText(explanation)
                        }}
                        className={`icon bg-[#ff9f3e] hover:bg-[#FE6B00] rounded-full  cursor-pointer p-[5px] `}
                        title="Mic input"
                      >
                       <GiSpeaker color="white" size={32}/>

                      </div>

                      <div
  style={{ cursor: trigger === "" ? 'not-allowed' : 'pointer' }}
  onClick={trigger !== "" ? toggleSpeech : undefined} 
  className={`${trigger === "" ? 'bg-[#f6b574]' : 'bg-[#ff9f3e] hover:bg-[#FE6B00]'} icon text-white rounded-full p-3 ${trigger === "" ? 'cursor-not-allowed' : 'cursor-pointer'}`}
  title={trigger==""? 'Click on speaker option':'Play and Pause'}
>
  {isPlaying ? <CiPause1 /> : <RxResume />}
</div>

                   
                      <div onClick={()=>{setViewCaption(!captionView)
              
                      }} className={`icon ${captionView==true? 'bg-[#FE6B00]':'bg-[#ff9f3e]'} hover:bg-[#FE6B00]   rounded-full p-3 cursor-pointer" title="Captions`}>
                      
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="19"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1_5402)">
                            <path
                              d="M13.8499 2.76562H4.15202C2.24222 2.76562 0.688477 4.31937 0.688477 6.22917V11.7708C0.688477 13.6806 2.24222 15.2344 4.15202 15.2344H13.8499C15.7597 15.2344 17.3135 13.6806 17.3135 11.7708V6.22917C17.3135 4.31937 15.7597 2.76562 13.8499 2.76562ZM15.9281 11.7708C15.9281 12.9166 14.9957 13.849 13.8499 13.849H4.15202C3.00628 13.849 2.07389 12.9166 2.07389 11.7708V6.22917C2.07389 5.08343 3.00628 4.15104 4.15202 4.15104H13.8499C14.9957 4.15104 15.9281 5.08343 15.9281 6.22917V11.7708ZM7.71046 6.68428C7.55322 5.99434 6.97273 5.53092 6.26616 5.53092C5.5596 5.53092 4.97842 5.99434 4.82187 6.68428L3.69899 11.6171C3.61378 11.9897 3.84792 12.361 4.2206 12.4455C4.59327 12.5349 4.96456 12.2973 5.04977 11.9239L5.24234 11.0774H7.28999L7.48256 11.9239C7.55529 12.2453 7.84138 12.4628 8.15726 12.4628C8.20852 12.4628 8.25978 12.4573 8.31173 12.4455C8.6851 12.361 8.91854 11.9897 8.83334 11.6171L7.71046 6.68428ZM5.55752 9.69271L6.17196 6.99184C6.17888 6.96067 6.18858 6.91703 6.26547 6.91703C6.34236 6.91703 6.35206 6.96067 6.35899 6.99184L6.97342 9.69271H5.55752Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_5402">
                              <rect
                                width="16.625"
                                height="16.625"
                                fill="white"
                                transform="translate(0.688477 0.6875)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </>
                )}

              </div>
              

            </div>

          )}
          {status == "summary" && (
            <div className="section-2 w-[80%]  flex flex-col x">
              <div className="flex  left-20 fixed bottom-40">
                

                <div className=""></div>
              </div>
              <div className="flex flex-col h-screen ">
                {summaryLoading || loading ? (
                  <div className="fixed top-1/2 left-1/2 transform translate-x-[100px] -translate-y-1/2">
             
                  </div>
                ) : (
                  <>
                    <div className="w-[80%] mx-auto">
                      
                      <p className="text-center text-lg font-semibold px-10 text-gray-600 py-4 ">
                      </p>
                    </div>
                    <div className="flex-1 overflow-y-auto hide-scrollbar h-[500px]">
                      <MarkdownRenderer inputText={summary} />
                    </div>
          
                  </>
                )}
              </div>
            </div>
          )}
          {status == "quiz" && (
            <div className="section-2 w-4/5 flex flex-col  pb-6">
              {quizLoading ? (
                <div className="fixed top-1/2 left-1/2 transform translate-x-[100px] -translate-y-1/2">
                
                </div>
              ) : (
                <>
                  <div className="pt-28 pl-10">
                 

                    <div className="px-10">
                      <h3 className="text-lg font-bold pb-8 ">
                        
                        {mcq[index].question}
                      </h3>

                      <div className="flex flex-wrap">
  {mcq[index].options.map((option) => (
    <div
      key={option}
      className={`w-[45%] px-7 py-3 font-normal m-2 text-center cursor-pointer text-sm rounded-full ${
        option === correctOptionSelected
          ? "bg-[#018F39] text-[#018F39] bg-opacity-10"
          : option === selectedOption && option !== correctOptionSelected
          ? "bg-red-500 text-red-500 bg-opacity-10"
          : "bg-gray-200"
      }`}
      style={{ pointerEvents: optionDisabled ? 'none' : 'auto' }}

      onClick={() => {
        handleOptionClick(option);

      }}
    >
      {option}
    </div>
  ))}
</div>

                      <div className="flex flex-wrap ">
                        <div className="w-[45%] mr-3">
                         {correctOption&&optionDisabled&& <h3 className="text-right pt-4 pr-1 text-[#018F39] font-semibold ">
                            Correct answer :{" "}
                            {optionDisabled && mcq[index].correct_answer}

                          </h3>}
                          {!correctOption&&optionDisabled&& 
                          
                          <h3 className="text-right pt-4 pr-1 text-red-500 font-semibold ">
                            Wrong answer, The correct answer is {optionDisabled && mcq[index].correct_answer}
                          </h3>}
                         
                        </div>
                        <button
                          className={`mt-2 ${topicCompleted?'bg-gray-400 ':'bg-[#ff9a33]'} bg-[#ff9a33]  text-white  w-[45%] px-7 py-3 font-normal m-2 text-center cursor-pointer text-sm rounded-full`}
                          onClick={handleNextClick}
                        >
                         {topicCompleted? 'Topic Completed':'Next'} 
                        </button>
                       {optionDisabled&& <div className="mt-8">
                        {!correctOption&&<span className="font-bold text-green-600">Correct Explanation: </span>}
                        {correctOption&&<span className="font-bold text-green-600">Explanation: </span>}
                        
                         {mcq[index].explanation}</div>}
                       
                      </div>
                      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>


 
      <div className="md:hidden block w-full h-full flex flex-col ">
     
        <div className="relative" ref={menuRef}>
          <div className="flex items-center justify-between p-4 w-full">
            <div className="flex-shrink-0 mr-4">
              <GrMenu size={24} onClick={handleMenuClick} />
            </div>

            <div className=" text-center ">
              <Image alt="not found" src={logo} />
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
          {isMenuOpen && (
            <div className="absolute top-0 left-0  w-[65%] bg-white p-4">
              <div  className="  section-study  flex flex-col  justify-between">
              <GrMenu size={24}  onClick={()=>{setMenuOpen(false)}} />

                <h2
                  className="font-semibold pt-5 px-[26px] pb-4 text-base flex items-center cursor-pointer capitalize"
                  onClick={toggleDropdown}
                >
                  {selectSubject},{selectChapter}
                  <span
                    className={`ml-2 transition-transform rotate-0 ${
                      isOpen ? "transform rotate-0" : ""
                    }`}
                  >
                  
                  </span>
                </h2>
                <hr />
                
                <div className="px-8 pt-6 space-y-3 mb-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-semibold cursor-pointer ${
                        clickedItem === 0 ? "text-[#ff9a33]" : ""
                      }`}
                      onClick={() => {
                        handleClick(0);
                        toggleTopic("newtonsLaw");
                      }}
                    >
                      Topics
                    </h3>
                    <div className="cursor-pointer arrow-container flex pt-1">
                      <span
                        className={`ml-2 transition-transform  ${
                          topicStatus.newtonsLaw ? "transform rotate-0" : ""
                        }`}
                        onClick={() => toggleTopic("newtonsLaw")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            transform: topicStatus.newtonsLaw
                              ? "rotate(0deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          <path
                            d="M11.3335 6.1133C11.2086 5.98913 11.0396 5.91943 10.8635 5.91943C10.6873 5.91943 10.5184 5.98913 10.3935 6.1133L8.00013 8.4733L5.64013 6.1133C5.51522 5.98913 5.34625 5.91943 5.17013 5.91943C4.994 5.91943 4.82504 5.98913 4.70013 6.1133C4.63764 6.17527 4.58805 6.249 4.5542 6.33024C4.52036 6.41148 4.50293 6.49862 4.50293 6.58663C4.50293 6.67464 4.52036 6.76177 4.5542 6.84301C4.58805 6.92425 4.63764 6.99799 4.70013 7.05996L7.5268 9.88663C7.58877 9.94911 7.6625 9.99871 7.74374 10.0326C7.82498 10.0664 7.91212 10.0838 8.00013 10.0838C8.08814 10.0838 8.17527 10.0664 8.25651 10.0326C8.33775 9.99871 8.41149 9.94911 8.47346 9.88663L11.3335 7.05996C11.3959 6.99799 11.4455 6.92425 11.4794 6.84301C11.5132 6.76177 11.5307 6.67464 11.5307 6.58663C11.5307 6.49862 11.5132 6.41148 11.4794 6.33024C11.4455 6.249 11.3959 6.17527 11.3335 6.1133Z"
                            fill="#474747"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {topicStatus.newtonsLaw && (
                    <div className=" pt-2 overflow-y-auto h-[400px] scrollbar-hide">
                      <div className=" items-center justify-between">
                      {topicName.map((topic, index) => (
            <h3
              key={index}
              onClick={() => {
                const sectionTemp = getSectionByChapterAndTopic(selectChapter, topic);
                if(window.speechSynthesis.paused&&sectionTemp==sectionVar){
                  window.speechSynthesis.resume();
                  setIsPlaying(true)
                  setStatus("page1");
                  setSelectedTopicIndex(index);
                }
                else{
                setIsPlaying(false)
                getSectionExplanation(topic);
                setStatus("page1");
                setSelectedTopicIndex(index);
                }
              }}
              className={`font-semibold text-sm cursor-pointer mt-2 ${
                loading
                  ? selectedTopicIndex === index
                    ? 'text-[#ff9a33] '
                    : 'opacity-50'
                  : ''
              }${selectedTopicIndex === index?'text-[#ff9a33]':''}`}
              style={{ pointerEvents: loading ? 'none' : 'auto' }}
            >
              {index + 1} {topic} 
              <hr />
            </h3>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  <h3
                    className={`font-semibold cursor-pointer ${
                      clickedItem === 2 ? "text-[#ff9a33]" : ""
                    }`}
                    onClick={() => {
                      handleClick(2);
                      setStatus("quiz");
                      handleOption("Quiz");
                      window.speechSynthesis.pause();
                    }}
                  >
                    Quiz
                  </h3>
                  <h3
                    className="font-semibold cursor-pointer"
                    onClick={() => {handleOption("Summary")
                    handleClick(3);
                      setStatus("summary");
                      window.speechSynthesis.pause();
                  }}
                  >
                    Summary
                  </h3>
                </div>
                {/* )} */}
                <div className="mt-auto mx-auto pb-10 flex flex-col justify-center">
                 
                 
                  <button className="mt-8 bg-orange-400   w-[150px] text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('home'); setIsOpen(!isOpen)
                    speechSynthesis.cancel();
                }}>Home</button>
              <button className="mt-6 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('study'); setIsOpen(!isOpen);    speechSynthesis.cancel();}}>Study</button>
              <button className="mt-6 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('notes'); setIsOpen(!isOpen);    speechSynthesis.cancel();}}>Notes</button>
              <button className="mt-6 bg-orange-400 text-white rounded-lg p-2 hover:bg-orange-500" onClick={() => {setLiveBotStatus('history'); setIsOpen(!isOpen);    speechSynthesis.cancel();}}>History</button>
                </div>
              </div>
              
            </div>

          )}
        </div>

        <hr />
        <hr />
        <div>
          <div className="hierarchy-links mt-4 pl-8 flex flex-wrap items-center pb-8">
            <p className="text-sm flex items-center capitalize">
              <span className="text-black cursor-pointer mr-2 underline">
                {selectSubject}
              </span>
              {"> "}
            </p>

            <p className="text-sm ml-2">
              <span style={{ whiteSpace: "nowrap" }}>
                <span
                  className="text-black cursor-pointer mr-2 underline"
                  onClick={() => {setLiveBotStatus('home'); msetStatus('m2');  speechSynthesis.cancel();}}
                >
                  {selectChapter}
                </span>{" "}
                {"> "}
              </span>
            </p>

            <p className="text-sm ml-2">
              <span style={{ whiteSpace: "nowrap" }}>
                <span
                  className="text-black cursor-pointer mr-4 underline"
                 
                >
                  {status=='page1'?'Explanation':status.slice(0,1).toUpperCase()+status.slice(1)}
                </span>{" "}
              </span>
            </p>
          </div>

          <hr />
          <hr />
          {/* quiz mobile */}
          {status == "quiz" && (
            <div className="md:hidden flex flex-col  pb-6">
              {quizLoading ? (
                <div className="fixed top-1/2 left-1/2 transform translate-x-[100px] -translate-y-1/2">
                
                </div>
              ) : (
                <>
                                                      <button onClick={()=>setStatus('page1')} className="mt-2 bg-[#ff9f3e] text-white p-2 rounded-lg"> Back to Explanation</button>

                  <div className="pt-28 pl-10">


                    <div className="px-10">
                      <h3 className="text-lg font-bold pb-8 ">
                        {mcq[index].question}
                      </h3>

                      <div className="flex flex-wrap">
                        {mcq[index].options.map((option) => (
                          <div
                            key={option}
                            className={` w-[45%] px-7 py-3 font-normal m-2 text-center cursor-pointer text-sm rounded-full ${
                              selectedOption === option
                                ? "bg-[#018F39] text-[#018F39] bg-opacity-10 "
                                : "bg-gray-200"
                            }`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-[45%] mr-3">
                        {correctOption&&optionDisabled&& <h3 className="text-right pt-4 pr-1 text-[#018F39] font-semibold ">
                            Correct answer :{" "}
                            {optionDisabled && mcq[index].correct_answer}

                          </h3>}
                          {!correctOption&&optionDisabled&& 
                          
                          <h3 className="text-right pt-4 pr-1 text-red-500 font-semibold ">
                            Wrong answer, The correct answer is {optionDisabled && mcq[index].correct_answer}
                          </h3>}
                         
                        </div>
                        <button
                          className={`mt-2 ${topicCompleted?'bg-gray-400 ':'bg-[#ff9a33]'} bg-[#ff9a33]  text-white  w-[45%] px-7 py-3 font-normal m-2 text-center cursor-pointer text-sm rounded-full`}
                          onClick={handleNextClick}
                        >
                         {topicCompleted? 'Topic Completed':'Next'} 
                        </button>
                        {optionDisabled&& <div className="mt-8">
                        {!correctOption&&<span className="font-bold text-green-600">Correct Explanation: </span>}
                        {correctOption&&<span className="font-bold text-green-600">Explanation: </span>}
                        
                         {mcq[index].explanation}</div>}
                      </div>
                      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {/* summary mobile */}
          {status == "summary" && (
            <div className="section-2 md:hidden  flex x">
              <div className="flex  left-20 fixed bottom-40">
                

                <div className=""></div>
              </div>
              <div className="flex flex-col h-screen ">
                {summaryLoading || loading ? (
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48">
                  <div className="flex items-center justify-center h-screen">
      <div className="text-center border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-orange-600" />
    </div></div>
                ) : (
                  <>
                                      <button onClick={()=>setStatus('page1')} className="mt-2 bg-[#ff9f3e] text-white p-2 rounded-lg"> Back to Explanation</button>

                    <div className="w-[80%] mx-auto">


                    </div>
                    <div className="flex-1 overflow-y-auto hide-scrollbar h-[500px]">
                      <MarkdownRenderer inputText={summary} />
                    </div>
          
                  </>
                )}
              </div>
            </div>
          )}
          {status == "page1" && (
          <div className="  flex flex-col x">
              
            <div className="flex  left-20 fixed bottom-40">
              
           

              <div className=""></div>
            </div>
            <div className="flex flex-col h-[700px]">
              {loading ? (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48">
                  <div className="flex items-center justify-center h-screen">
      <div className="text-center border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-orange-600" />
    </div>
                </div>
              ) : (
                <>
                  <div className="w-[90%] mx-auto">
                    <p className="text-center text-lg font-semibold px-10 text-gray-600 py-4 ">
                      {gpt ? "NEET AI Tutor" : "User Questions"}: {transcript}
                      {gptLoader && (
                        <>
                          <div class="flex gap-2 justify-center mt-2">
                            <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                            <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                            <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                          </div>
                        </>
                      )}
                      <br></br>
                      {gpt && (
                        <button
                          className="text-white mt-4 bg-[#ff9a33] rounded-lg px-14 py-2 text-sm "
                          onClick={() => {
                            setTranscript(
                              "Ask any questions using the mic icon"
                            );
                            setGPT(false);
                           
                          }}
                        >
                          I Understood
                        </button>
                      )}
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto hide-scrollbar h-[500px]">
                  <MarkdownRenderer captionView={captionView} inputText={explanation} startIndex={startIndex} endIndex={endIndex} />                   
                  </div>

                  <div className="flex  justify-center items-center space-x-4 py-6 pb-10">
                  <button onClick={()=>{setStatus('summary');window.speechSynthesis.pause();setIsPlaying(false)}} className="bg-[#ff9f3e] text-white p-2 rounded-lg">Summary</button>

                  
                    {/* <div
                        onClick={() => {
                          MicClick();
                       window.speechSynthesis.pause();
                        }}
                        className={`icon bg-[#ff9f3e]  rounded-full p-3 cursor-pointer `}
                        title="Mic input"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="19"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M8.14325 9.37938C7.62196 9.37938 7.12203 9.17593 6.75342 8.81379C6.38482 8.45165 6.17773 7.96048 6.17773 7.44834V3.03455C6.17773 2.78096 6.22857 2.52986 6.32735 2.29558C6.42613 2.06129 6.57091 1.84842 6.75342 1.6691C6.93594 1.48979 7.15261 1.34755 7.39108 1.25051C7.62955 1.15346 7.88514 1.10352 8.14325 1.10352C8.40137 1.10352 8.65696 1.15346 8.89542 1.25051C9.13389 1.34755 9.35057 1.48979 9.53308 1.6691C9.7156 1.84842 9.86038 2.06129 9.95915 2.29558C10.0579 2.52986 10.1088 2.78096 10.1088 3.03455V7.44834C10.1088 7.96048 9.90169 8.45165 9.53308 8.81379C9.16448 9.17593 8.66454 9.37938 8.14325 9.37938Z"
                            fill="white"
                          />
                          <path
                            d="M11.2312 5.51709V7.44812C11.2312 9.12095 9.84519 10.4826 8.14249 10.4826C6.43979 10.4826 5.05382 9.12095 5.05382 7.44812V5.51709H3.93066V7.44812C3.93066 9.54247 5.52386 11.2738 7.58091 11.5447V13.793H5.61539V14.8964H10.6696V13.793H8.70406V11.5447C10.7611 11.2738 12.3543 9.54247 12.3543 7.44812V5.51709H11.2312Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    */}
                    <div
                      onClick={toggleSpeech}
                      className="icon bg-[#ff9f3e] text-white rounded-full p-3"
                    >
                      {isPlaying ? <CiPause1 /> : <RxResume />}
                    </div>

                    {/* <div onClick={()=>setViewCaption(!captionView)} className="icon bg-[#ff9f3e]  rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="19"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1_5402)">
                          <path
                            d="M13.8499 2.76562H4.15202C2.24222 2.76562 0.688477 4.31937 0.688477 6.22917V11.7708C0.688477 13.6806 2.24222 15.2344 4.15202 15.2344H13.8499C15.7597 15.2344 17.3135 13.6806 17.3135 11.7708V6.22917C17.3135 4.31937 15.7597 2.76562 13.8499 2.76562ZM15.9281 11.7708C15.9281 12.9166 14.9957 13.849 13.8499 13.849H4.15202C3.00628 13.849 2.07389 12.9166 2.07389 11.7708V6.22917C2.07389 5.08343 3.00628 4.15104 4.15202 4.15104H13.8499C14.9957 4.15104 15.9281 5.08343 15.9281 6.22917V11.7708ZM7.71046 6.68428C7.55322 5.99434 6.97273 5.53092 6.26616 5.53092C5.5596 5.53092 4.97842 5.99434 4.82187 6.68428L3.69899 11.6171C3.61378 11.9897 3.84792 12.361 4.2206 12.4455C4.59327 12.5349 4.96456 12.2973 5.04977 11.9239L5.24234 11.0774H7.28999L7.48256 11.9239C7.55529 12.2453 7.84138 12.4628 8.15726 12.4628C8.20852 12.4628 8.25978 12.4573 8.31173 12.4455C8.6851 12.361 8.91854 11.9897 8.83334 11.6171L7.71046 6.68428ZM5.55752 9.69271L6.17196 6.99184C6.17888 6.96067 6.18858 6.91703 6.26547 6.91703C6.34236 6.91703 6.35206 6.96067 6.35899 6.99184L6.97342 9.69271H5.55752Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_5402">
                            <rect
                              width="16.625"
                              height="16.625"
                              fill="white"
                              transform="translate(0.688477 0.6875)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                 
                    </div> */}
                    <button onClick={()=>{
                    setStatus('quiz');window.speechSynthesis.pause();setIsPlaying(false)}} className="bg-[#ff9f3e] text-white p-2 rounded-lg">Quiz</button>
                  </div>
                  <h1 className="text-center">Click on hamburger icon to change the topic...</h1>
                </>
              )}
              
            </div>
          </div>)}
        
        </div>
      </div>
 

    </>
  );
};

export default LiveBotStudy;