import React, { useEffect, useState } from 'react';
import './Sidebar.css'; // Create a separate CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../Backend/Base-url';
import { getadmindetailsapi } from '../Backend/Apicalls';

function Sidebar(){
  const[adminname,setadminname]=useState("")
  const[admindetails,setadmindetails]=useState([])
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  const logout = async () => {
    try {
      sessionStorage.removeItem('adminuser');
      sessionStorage.removeItem('admintoken');
      setadminname("");
      await admin(); // Call the admin function after clearing session storage
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const admin = async () => {
    try {
      const res = await getadmindetailsapi();
      if (res.status === 200) {
        setadmindetails(res.data);
      } else {
        console.log(res.response.data);
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(()=>
  {
    admin()
    setadminname(JSON.parse(sessionStorage.getItem("adminuser"))?.username)
  },[setadmindetails])

  console.log(admindetails);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admintoken') !== null;
    // If not authenticated, prevent navigation back to admin page
    if (!isAuthenticated) {
      navigate('/login');  // Redirect to login page or any other page as needed
    }
  }, [navigate]);


  return (
    <div className='sidebar text-center'>
        <div>
        <label>
          <input type="file" style={{ display: 'none' }} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {admindetails.length > 0 ?
                admindetails.map((item) => (
                  <img
                    key={item.id} // Add a unique key to each image
                    src={`${base_url}/fileuploads/${item.profileimg}`}
                    alt=""
                    className=''
                    style={{ width: '150px', borderRadius: '50%' }}
                    onError={(e) => console.error('Image loading error:', e.message, e.target.src)}
                  />
                ))
                :
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className='rounded-circle' style={{ width: '200px' }} />
              }
              <h5 className='mt-3'>{adminname ? `${adminname}` : 'Adminuser'}</h5>
            </>
          )}
        </label>
        </div>
      <div className='mt-4'>
      <ul>
          <Link to={'/adminpage/dashboard'}><li><i class="fa-regular fa-address-card fs-4"></i></li></Link>
        <li>
        <i class="fa-solid fa-utensils fs-4"></i>
            <ul className="submenu">
            <Link to={'/adminpage/recipeview'}  style={{textDecoration:'none'}}><li className='text-dark'>View/Edit</li></Link>
            <Link to={'/adminpage/approve'} style={{textDecoration:'none'}}><li className='text-dark'>Approve</li></Link>
            <Link to={'/adminpage/status'} style={{textDecoration:'none'}}><li className='text-dark'>Status</li></Link>
            {/* Add more recipe-related links as needed */}
            </ul>
        </li>
        <li>
        <Link to={'/adminpage/users'}><i class="fa-solid fa-users-line fs-4"></i></Link>
        </li>
        <Link to={'/adminpage/settings'}><li><i class="fa-solid fa-gear fs-4"></i></li></Link>
        <li><i class="fa-solid fa-right-from-bracket mt-4"></i><button onClick={logout} className='btn'>Logout</button></li>
        {/* Add more links as needed */}
     </ul>

      </div>
    </div>
  );
};

export default Sidebar;