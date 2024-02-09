import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Dropdown from 'react-bootstrap/Dropdown';
import { getapprovedrecipesapi, getpendingapi, getrejectedapi } from '../Backend/Apicalls';
import { base_url } from '../Backend/Base-url';

function Status() {
 
  const[recipes,setrecipes]=useState([])
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const handlestatus=async(status)=>
  {
    setSelectedStatus(status);
    let apiFunction;

    switch (status) {
      case 'approved':
        apiFunction = getapprovedrecipesapi;
        break;
      case 'rejected':
        apiFunction = getrejectedapi;
        break;
      case 'pending':
        apiFunction = getpendingapi;
        break;
      default:
        return;
    }
  
    const res = await apiFunction();
    setrecipes(res.data);
  }
console.log(recipes);

useEffect(() => {
  handlestatus('approved');
}, []);


  return (
    <div className='d-flex'>
      <div>
        <Sidebar/>
      </div>
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center'>
            <h2 className='mt-5 fs-3  fw-bold text-danger'>Status of uploaded recipes</h2>
            <div className='mt-5 ms-5'>

                <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>handlestatus('approved')}>Approved</Dropdown.Item>
                <Dropdown.Item onClick={()=>handlestatus('rejected')}>Rejected</Dropdown.Item>
                <Dropdown.Item onClick={()=>handlestatus('pending')}>Pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
        </div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 p-5'>
          {recipes?.length>0?
          recipes.map((item)=>(
          <div className="col">
          <div className="card h-100" style={{ width: '10rem' }}>
            <img
              src={`${base_url}/fileuploads/${item.recipeimg}`}
              className="card-img-top"
              alt="Banh Mi"
              style={{ width: '100%',height:'100px',objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{fontSize:'15px'}}>{item.title}</h5>
              <p style={{fontSize:'10px'}}>{item.username}</p>
            </div>
            {item.status==='approved'?
            <div className="card-body text-center">
                 <button className='btn btn-success' style={{fontSize:'12px'}}>Approved</button>
            </div>
            
            :item.status==='rejected'?<div className="card-body text-center">
                 <button className='btn btn-danger' style={{fontSize:'12px'}}>Rejected</button>
            </div>
            :<div className="card-body text-center">
                 <button className='btn btn-info' style={{fontSize:'12px'}}>Pending</button>
            </div>}
          </div>
        </div>))
        :<p>nothing</p>}
</div>
      </div>
    </div>
  )
}

export default Status
