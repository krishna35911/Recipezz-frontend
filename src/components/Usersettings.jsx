import React, { useEffect, useState } from 'react';
import { edituserprofileapi } from '../Backend/Apicalls';  // Import your API call for updating user profile
import './Usersettings.css';

function Usersettings() {
  const [editing, setEditing] = useState(false);

  const [username, setUsername] = useState('');

  const[edited,setedited]=useState(false)


  const [userprofile, setUserprofile] = useState({
    username: '',
    email: '',
    password: ''
    });


  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem('alreadyuser'));
    setUsername(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
    setUserprofile({
      ...userprofile,
      username: users.username,
      email: users.email,
      password: users.password
    });

  }, [edited,username]);


 
  console.log(username);

  const handleEditDetails = () => {
    setEditing(true);
  };

  const handleSaveDetails = async (e) => {
   e.preventDefault()
    const {username,email,password}=userprofile
    if(!username || !password)
    {
      alert('please fill completely')
    }
    else
    {
      try {
        const reqbody=userprofile
      const token=sessionStorage.getItem("token")
      const reqheader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await edituserprofileapi(reqbody,reqheader)
      console.log(result);
      if(result.status===200)
      {
        alert('updated')
        sessionStorage.setItem("alreadyuser",JSON.stringify(result.data))
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
    <div>
             <nav className="navbar navbar-expand-lg navbar-light bg-teritiary p-2">
      <div className="container-fluid">
        <a className="navbar-brand ms-5" href="/">
          <h2 style={{ fontSize: '45px', fontWeight: 'bold', color: '#D24545', fontFamily: 'cursive' }}>Recipez</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/view-recipes">
                <button className="btn p-2 text-secondary"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
              </a>
            </li>
          <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/add-recipes">
                <button className="btn p-2 text-secondary"><i class="fa-regular fa-square-plus me-2"></i>Create</button>
              </a>
            </li>
            <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/userdashboard">
                <button className="btn p-2 text-secondary"><i class="fa-regular fa-user me-2"></i>{username ? `${username}`:'Profile'}</button>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
      <div className="container mt-4 mb-5">
        <div className="row d-flex justify-content-center align-items-center ">
          <h2 className="text-center fw-bold fs-3">Update details</h2>
          <form className="d-flex flex-column mx-auto w-50 text-center shadow rounded p-3 mt-4">
           
            <div className="mb-3 mt-4">
              <input
                type="text"
                placeholder=""
                className={`form-control ${editing ? '' : 'readonly'} not-editable-input`}
                readOnly={!editing}
                value={userprofile.username}
                onChange={(e) => setUserprofile({ ...userprofile, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder=""
                className="form-control readonly not-editable-input"
                readOnly
                value={userprofile.email}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder=""
                className={`form-control ${editing ? '' : 'readonly'} not-editable-input`}
                readOnly={!editing}
                value={userprofile.password}
                onChange={(e) => setUserprofile({ ...userprofile, password: e.target.value })}
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
  );
}

export default Usersettings;
