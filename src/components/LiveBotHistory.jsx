import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets//livelogo.png";
import profile from "../assets//praveen.png";
import Sidebar from "../components/SidebarLiveBot";
import Tutor from "../assets/aitutor.png";
import { FaSearch } from "react-icons/fa";
import { GrMenu } from 'react-icons/gr';
import axios from 'axios'
import { collection, addDoc,getDocs,deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const LiveBotHistory = () => {
  const [name, setName] = useState("Praveen Dommalapati");
  const [activeIcon, setActiveIcon] = useState("home");
  const [history,setHistory]=useState([])
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  useEffect(()=>{
    handleGetTutorNotes()
  },[])
    const handleGetTutorNotes = async () => {
      try {
        const tempData = [];
        const querySnapshot = await getDocs(collection(db, 'history'));
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
          setHistory(tempData);
          console.log(tempData);
        }
      } catch (error) {
        console.error('Error fetching tutor notes:', error);
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
            <div className="pt-[100px] pl-20">
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
                  <tspan x="43%" dy="-1.2em">
                    History of topics
                  </tspan>
                  <tspan x="50%" dy="1.2em">
                    learned and score of
                  </tspan>
                  <tspan x="43%" dy="1.2em">
                    the quiz for each
                  </tspan>
                  <tspan x="21%" dy="1.2em">
                    topic.
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
          </div>

          <div className="section-2 w-1/2 flex flex-col">
            <div className="flex justify-between ">
              <h2 className="py-4 pl-8 text-lg text-black font-semibold">
                History
              </h2>
              <div className="flex py-4 pr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_188_418)">
                    <path
                      d="M15.8333 1.66667H15V0.833333C15 0.373333 14.6275 0 14.1667 0C13.7058 0 13.3333 0.373333 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.373333 6.29417 0 5.83333 0C5.3725 0 5 0.373333 5 0.833333V1.66667H4.16667C1.86917 1.66667 0 3.53583 0 5.83333V15.8333C0 18.1308 1.86917 20 4.16667 20H15.8333C18.1308 20 20 18.1308 20 15.8333V5.83333C20 3.53583 18.1308 1.66667 15.8333 1.66667ZM4.16667 3.33333H15.8333C17.2117 3.33333 18.3333 4.455 18.3333 5.83333V6.66667H1.66667V5.83333C1.66667 4.455 2.78833 3.33333 4.16667 3.33333ZM15.8333 18.3333H4.16667C2.78833 18.3333 1.66667 17.2117 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 17.2117 17.2117 18.3333 15.8333 18.3333ZM15.8333 11.6667C15.8333 12.1267 15.4608 12.5 15 12.5H5C4.53917 12.5 4.16667 12.1267 4.16667 11.6667C4.16667 11.2067 4.53917 10.8333 5 10.8333H15C15.4608 10.8333 15.8333 11.2067 15.8333 11.6667ZM10 15C10 15.46 9.6275 15.8333 9.16667 15.8333H5C4.53917 15.8333 4.16667 15.46 4.16667 15C4.16667 14.54 4.53917 14.1667 5 14.1667H9.16667C9.6275 14.1667 10 14.54 10 15Z"
                      fill="#1E1E1E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_188_418">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <hr />
            <hr />
            <div className="mx-8 pt-6 overflow-y-auto max-h-[80%]">
  {history.map((history, index) => (
    <option
      key={index}
      className="bg-gray-200 rounded-lg py-3 pl-3 mt-4 text-sm font-semibold text-[#232323] w-full"
    >
      {history.topicsCovered}
    </option>
  ))}
</div>

          </div>
        </div>
      </div>

      
      <div className="md:hidden w-full h-full flex flex-col">
      
<hr/>
<hr/>
<div className=" flex flex-col">
            <div className="flex justify-between ">
              <h2 className="py-4 pl-8 text-lg text-black font-semibold">
                History
              </h2>
              <div className="flex py-4 pr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_188_418)">
                    <path
                      d="M15.8333 1.66667H15V0.833333C15 0.373333 14.6275 0 14.1667 0C13.7058 0 13.3333 0.373333 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.373333 6.29417 0 5.83333 0C5.3725 0 5 0.373333 5 0.833333V1.66667H4.16667C1.86917 1.66667 0 3.53583 0 5.83333V15.8333C0 18.1308 1.86917 20 4.16667 20H15.8333C18.1308 20 20 18.1308 20 15.8333V5.83333C20 3.53583 18.1308 1.66667 15.8333 1.66667ZM4.16667 3.33333H15.8333C17.2117 3.33333 18.3333 4.455 18.3333 5.83333V6.66667H1.66667V5.83333C1.66667 4.455 2.78833 3.33333 4.16667 3.33333ZM15.8333 18.3333H4.16667C2.78833 18.3333 1.66667 17.2117 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 17.2117 17.2117 18.3333 15.8333 18.3333ZM15.8333 11.6667C15.8333 12.1267 15.4608 12.5 15 12.5H5C4.53917 12.5 4.16667 12.1267 4.16667 11.6667C4.16667 11.2067 4.53917 10.8333 5 10.8333H15C15.4608 10.8333 15.8333 11.2067 15.8333 11.6667ZM10 15C10 15.46 9.6275 15.8333 9.16667 15.8333H5C4.53917 15.8333 4.16667 15.46 4.16667 15C4.16667 14.54 4.53917 14.1667 5 14.1667H9.16667C9.6275 14.1667 10 14.54 10 15Z"
                      fill="#1E1E1E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_188_418">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <hr />
            <hr />
            <div className="mx-8 pt-6 overflow-y-auto max-h-[85%]">
  {history.map((history, index) => (
    <option
      key={index}
      className="bg-gray-200 rounded-lg py-3 pl-3 mt-4 text-sm font-semibold text-[#232323] w-full"
    >
   {history.topicsCovered}
    </option>
  ))}
</div>
          </div>
</div>
    </>
  );
};

export default LiveBotHistory;