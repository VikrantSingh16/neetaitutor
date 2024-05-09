import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/livelogo.png";
import profile from "../assets/praveen.png";
import Sidebar from "../components/SidebarLiveBot";
import Tutor from "../assets/aitutor.png";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrMenu } from 'react-icons/gr';
import { useEffect } from "react";
import { collection, addDoc,getDocs,deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

import axios from 'axios'
const LiveBotNotes = () => {

  useEffect(()=>{
    handleGetTutorNotes()
  },[])

  const [status, setStatus] = useState("page1");

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  const [note, setNote] = useState("");

  const handleDelete = () => {
    setNote("");
  };

  const [expandedOption, setExpandedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const addNotes = async () => {
    
        try {
          const docRef = await addDoc(collection(db, 'notes'), {
            
            email:localStorage.getItem('USER'),
           note:note
          })
          console.log('Document written with ID: ', docRef.id)
        } catch (e) {
          console.error('Error adding document: ', e)
        }
  }


  const handleDeleted = async (noteId) => {
    const docRef = doc(db, "notes", noteId);

    await deleteDoc(docRef).then(()=>handleGetTutorNotes())
    
    console.log("Document successfully deleted!");  };
  const [notes, setNotes] = useState([]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleGetTutorNotes = async () => {
    try {
      const tempData = [];
      const querySnapshot = await getDocs(collection(db, 'notes'));
      querySnapshot.forEach((doc) => {
        const combinedData = {
          docId: doc.id,
          ...doc.data()
        };
        if(doc.data().email==localStorage.getItem('USER')){
          tempData.push(combinedData);

        }
      });
      if (tempData.length > 0) {
        setOptions(tempData);
        console.log(tempData);
      }
    } catch (error) {
      console.error('Error fetching tutor notes:', error);
    }
  };


  const handleAddTutorNote = async () => {
    
    try {
      const response = await axios.post('/api/notesLiveTutor', {
        phone: localStorage.getItem("NUMBER"),
        newNote: note,
        
      });

      console.log('Added tutor note:', response.data.notes);
      handleGetTutorNotes()
    } catch (error) {
      console.error('Error adding tutor note:', error);
    }
  };


  return (
    <>


     <div className="bg-white w-[100%] md:block hidden" >
        
        <div className="main-content w-[100%] flex max-h-screen fixed">
          {/* Sidebar */}


          {/* Section 1 */}
          <div className="section w-[45%]">
            <h2 className="font-semibold pt-2">Live Tutor one to one</h2>
            <div className="pt-[100px] pl-20 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="134"
                viewBox="0 0 160 134"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 1C7.71573 1 1 7.71574 1 16V101.957C1 110.241 7.71573 116.957 16 116.957H16.5966C16.5966 129.889 30.6109 133.647 37.618 133.91C29.623 132.964 27.854 122.214 27.9688 116.957H144C152.284 116.957 159 110.241 159 101.957V16C159 7.71573 152.284 1 144 1H16Z"
                  fill="#FFF4E9"
                />
                <path
                  d="M16.5966 116.957H16.6966V116.857H16.5966V116.957ZM37.618 133.91L37.6143 134.01L37.6298 133.811L37.618 133.91ZM27.9688 116.957V116.857H27.871L27.8689 116.955L27.9688 116.957ZM1.1 16C1.1 7.77097 7.77096 1.1 16 1.1V0.9C7.6605 0.9 0.9 7.66051 0.9 16H1.1ZM1.1 101.957V16H0.9V101.957H1.1ZM16 116.857C7.77096 116.857 1.1 110.186 1.1 101.957H0.9C0.9 110.297 7.6605 117.057 16 117.057V116.857ZM16.5966 116.857H16V117.057H16.5966V116.857ZM16.4966 116.957C16.4966 123.467 20.0273 127.668 24.4287 130.27C28.8263 132.87 34.0991 133.878 37.6143 134.01L37.6218 133.81C34.1298 133.679 28.8919 132.676 24.5305 130.098C20.173 127.522 16.6966 123.379 16.6966 116.957H16.4966ZM37.6298 133.811C33.6836 133.344 31.2652 130.458 29.8447 127.012C28.4241 123.565 28.0116 119.578 28.0688 116.959L27.8689 116.955C27.8112 119.593 28.2258 123.609 29.6598 127.088C31.0937 130.567 33.5574 133.53 37.6063 134.009L37.6298 133.811ZM144 116.857H27.9688V117.057H144V116.857ZM158.9 101.957C158.9 110.186 152.229 116.857 144 116.857V117.057C152.339 117.057 159.1 110.297 159.1 101.957H158.9ZM158.9 16V101.957H159.1V16H158.9ZM144 1.1C152.229 1.1 158.9 7.77096 158.9 16H159.1C159.1 7.6605 152.339 0.9 144 0.9V1.1ZM16 1.1H144V0.9H16V1.1Z"
                  fill="#FF9A33"
                />

                <text
                  className="text-sm text-gray-200 font-semibold"
                  x="40%"
                  y="40%"
                  dominant-baseline=""
                  text-anchor="middle"
                  fill="#000000"
                >
                  <tspan x="32%" dy="-1.2em">
                    Here is your
                  </tspan>
                  <tspan x="45%" dy="1.2em">
                    collection of notes.
                  </tspan>
                  <tspan x="49%" dy="1.2em">
                    You can add or make
                  </tspan>
                  <tspan x="34%" dy="1.2em">
                    changes in it.
                  </tspan>
                </text>
              </svg>
            </div>

            <Image
              src={Tutor}
              alt="ABC"
              className="mx-auto"
              width={250}
              height={200}
              
            />

            <div className="flex justify-center items-center space-x-4 py-10">

            </div>
          </div>
          {status == "page1" && (
            <div className="section-2 w-1/2 flex flex-col">
              <h2 className="py-4 pl-8 text-lg text-black font-semibold">
                All Notes
              </h2>
              <hr />
              <hr />
              <div className="mx-8 pt-6 overflow-y-auto max-h-[70%]">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`rounded-lg py-3 pl-3 mt-4 text-sm font-semibold text-[#232323] w-[90%] cursor-pointer ${
                      expandedOption === index ? "bg-[#fff4e9]" : "bg-gray-200"
                    }`}
                    onClick={() =>
                      setExpandedOption(expandedOption === index ? null : index)
                    }
                  >
                    {expandedOption === index ? (
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold justify-between flex">
                            {option.heading||""}
                          </h3>
                          <div className="flex items-center justify-end pr-4">
                           
                            <button
                              className=""
                              onClick={() => handleDeleted(option.docId)}
                            >
                              <AiOutlineDelete size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs w-[90%] pt-5">{option.note}</p>
                      </div>
                    ) : (
                      option.note
                    )}
                  </div>
                ))}

              </div>

              <div className="mt-12 mx-auto">
                <button id="note"
                  className="text-white bg-[#ff9a33] rounded-lg px-14 py-2 text-sm"
                  onClick={() => {
                   
                    setStatus('page2')
                  }}
                >
                  NEW NOTE
                </button>
              </div>
            </div>
          )}

          {status == "page2" && (
            <div className="section-2 w-1/2 flex flex-col">
              <h2 className="py-4 pl-8 text-lg text-black font-semibold">
                New Note
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

              <div className="mt-auto mx-auto pb-28">
                <button className="text-white bg-[#ff9a33] rounded-lg px-14 py-2 text-sm"
                 onClick={() => {

                  addNotes().then(()=> handleGetTutorNotes())
               setStatus('page1')
                }}
                >
                  {status=='page2'? 'ADD NOTE' : 'NEW NOTE'}
             
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden  w-full h-full flex flex-col">
    
<hr/>
<hr/> 
{status=='page1' &&
<div className="flex flex-col flex-grow ">
              <h2 className="py-4 pl-8 text-lg text-black font-semibold">
                Notes
              </h2>
              <hr />
              <hr />
              <div className="mx-8 pt-6 overflow-y-auto max-h-[60%]">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`rounded-lg py-3 pl-3  mt-4 text-sm font-semibold text-[#232323] w-full cursor-pointer ${
                      expandedOption === index ? "bg-[#fff4e9]" : "bg-gray-200"
                    }`}
                    onClick={() =>
                      setExpandedOption(expandedOption === index ? null : index)
                    }
                  >
                    {expandedOption === index ? (
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold justify-between flex">
                                              </h3>
                          <div className="flex items-center justify-end pr-4">
                           
                            <button
                              className=""
                              onClick={() => handleDeleted(option.docId)}
                            >
                              <AiOutlineDelete size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs w-[90%] pt-5">{option.note}</p>
                      </div>
                    ) : (
                      option.note
                    )}
                  </div>
                ))}

              </div>
              </div>
}
{status == "page2" && (
            <div className="section-2  flex flex-col">
              <h2 className="py-4 pl-8 text-lg text-black font-semibold">
                New Note
              </h2>
              <hr />
              <hr />
              <div className=" mx-8 pt-6 relative">
                <div className="relative">
                  {/* Textarea */}
                  <textarea
                    className="w-full h-[400px] bg-[#fff4e9]  p-3 rounded-lg resize-none focus:outline-none"
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

             
            </div>
          )}
              <div className="mx-auto mt-4">
                <button
                  className="text-white bg-[#ff9a33] rounded-lg px-14 py-2 text-sm"
                  onClick={() => {
                    
                    if(status=='page2'){
                      addNotes().then(()=>handleGetTutorNotes())
                      setStatus("page1")
                    }
                    else{
                      setStatus("page2")
                    }
                    

                  }}

                    
                
                >
                  {status=='page2'? 'ADD NOTE' : 'NEW NOTE'}
                </button>
              </div>
            </div>

    </>
  );
};

export default LiveBotNotes;