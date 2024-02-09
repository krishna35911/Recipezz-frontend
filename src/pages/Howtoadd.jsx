import React from 'react'
import './Howtoadd.css'
import { Link } from 'react-router-dom'

function Howtoadd() {
  return (
    <div>
      <nav className="navbar navhow">
    <ul className="nav-links">
    <li className="dropdown">
          {/* Dropdown Trigger */}
          <p
            className="dropdown-toggle"
            type="button"
            id="aboutDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            About Recipez
          </p>

          {/* Dropdown Menu */}
          <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
            <li>
              <Link to="/howtoadd" className="dropdown-item">
                How to add recipes ?
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="dropdown-item">
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="dropdown-item">
                FAQs
              </Link>
            </li>
          </ul>
        </li>
      <li>
        <Link to="/add-recipes">
           Share Recipes
        </Link>
      </li>
      <li>
        <Link to="/view-recipes">
          Explore Recipes
        </Link>
      </li>
      <li>
         <a href='/login'> <i class="fa-solid fa-user me-2"></i>  Login/Signup</a>
      </li>
    </ul>
  </nav>
  
    </div>
  )
}

export default Howtoadd
