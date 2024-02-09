import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import './settings.css'
import { editadminprofile } from '../Backend/Apicalls';

function Settings() {
  const [editing, setEditing] = useState(false);

  const[edited,setedited]=useState(false)


  const [adminprofile, setadminprofile] = useState({
    username: '',
    adminemail: '',
    adminpassword: '',
    profileimg:""
    });


  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem('adminuser'));
    setadminprofile({
      ...adminprofile,
      username: users.username,
      adminemail: users.adminemail,
      adminpassword: users.adminpassword,
      profileimg:users.profileimg
    });

  }, [edited]);

  const handleEditDetails = () => {
    setEditing(true);
  };

  const handleSaveDetails = async (e) => {
   e.preventDefault()
    const {username,adminemail,adminpassword,profileimg}=adminprofile
    if(!username || !adminpassword)
    {
      alert('please fill completely')
    }
    else
    {
      try {
        const reqbody=adminprofile
      const token=sessionStorage.getItem("admintoken")
      const reqheader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await editadminprofile(reqbody,reqheader)
      console.log(result);
      if(result.status===200)
      {
        alert('updated')
        sessionStorage.setItem("adminuser",JSON.stringify(result.data))
        setedited(true)
      }
      else
      {
        console.log(result.response.data);
      }
      } catch (error) {
        console.log(error)
      }
      
    }
    setEditing(true)
  }
  
  return (
    <div className='d-flex'>
      <div><Sidebar/></div>
      <div className="container mt-4 mb-5 mt-5">
        <div className="row d-flex justify-content-center align-items-center ">
          <h2 className="text-center fw-bold fs-3">Update details</h2>
          <form className="d-flex flex-column mx-auto w-50 text-center shadow rounded p-3 mt-4">
           
            <div className="mb-3 mt-4">
              <input
                type="text"
                placeholder=""
                className={`form-control ${editing ? '' : 'readonly'} not-editable-input`}
                readOnly={!editing}
                value={adminprofile.username}
                onChange={(e) => setadminprofile({ ...adminprofile, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder=""
                className="form-control readonly not-editable-input"
                readOnly
                value={adminprofile.adminemail}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder=""
                className={`form-control ${editing ? '' : 'readonly'} not-editable-input`}
                readOnly={!editing}
                value={adminprofile.adminpassword}
                onChange={(e) => setadminprofile({ ...adminprofile, adminpassword: e.target.value })}
              />
            </div>
            <div className="mb-3 d-flex mx-auto mt-4">
              {editing ? (
                <>
                  <button type="button" className="btn btn-warning me-5" onClick={(e) => handleSaveDetails(e)} >
                    Save
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-warning" onClick={handleEditDetails}>
                  Edit details
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      </div>
  )
}

export default Settings
