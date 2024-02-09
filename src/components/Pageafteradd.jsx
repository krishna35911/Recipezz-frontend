import React from 'react'
import Header from './Header'

function Pageafteradd() {
  return (
   <p>
        <Header/>
          <div className='d-flex justify-content-center align-items-center flex-column mt-5 mb-5'>
          <h2 className='text-success'> <i class="fa-solid fa-circle-check fa-bounce me-3 fa-2x"  ></i> Your recipe has been submitted</h2>
          <p style={{fontSize:'25px'}} className='mt-5'>We will review your recipe and get back to you soon.</p>
          {/* You can include additional information or styling as needed */}
        </div>
   </p>
  )
}

export default Pageafteradd
