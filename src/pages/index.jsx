import Image from "next/image";
import { Inter } from "next/font/google";
import LiveBot from '../components/LiveBot'
import {useEffect, useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase'
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
const [checkUserAuthentication,setCheckUserAuthentication]=useState(null)
useEffect(()=>{if(checkUserAuthentication==false){}
  // router.push('/login')
},[checkUserAuthentication])
onAuthStateChanged(auth, (user) => {
  if (user) {
   setCheckUserAuthentication(true)
    const uid = user.uid;
    const userName = auth.currentUser;
    console.log(uid,userName?.email);
    
  } else {
   console.log('not loged');
   router.push('/login')
  }
});
if(checkUserAuthentication==null)
  return (<div>Loading...</div>);

else if(checkUserAuthentication==false){
  return (<div>USER NOT LOGGED IN</div>)
}
  else
    return (
    <LiveBot/>
  );
}
