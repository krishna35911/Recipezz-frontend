import React, { useState } from 'react'
import { createContext } from 'react'


export const addprojectcontext=createContext()

export const getapprovedcontext=createContext()

function Contextshare({children}) {

    const [addcontext,setaddcontext]=useState({})
    const [approvedcontext,setapprovedcontext]=useState({})
  return (
    <>
    <addprojectcontext.Provider value={{addcontext,setaddcontext}}>
       <getapprovedcontext.Provider value={{approvedcontext,setapprovedcontext}}>
         {children}
        </getapprovedcontext.Provider>
    </addprojectcontext.Provider>
    </>
  )
}

export default Contextshare
