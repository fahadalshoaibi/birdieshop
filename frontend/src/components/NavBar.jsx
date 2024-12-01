import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import { IoCartOutline } from "react-icons/io5";
import avatarImage from '../assets/avatar.png'
import { useState } from 'react';
import { useSelector } from 'react-redux';
const navigation = [
    { name: "Dashboard", href:"/dashboard" },
    { name: "Orders", href:"/orders" },
    { name: "Cart", href:"/cart" },
    { name: "Checkout", href:"/checkout" },
]

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentuser = true;
    const cartItems = useSelector((state) => state.cart.cartItems);


  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
        <nav className='flex justify-between items-center'>
            {/* left side */}
            <div className='flex items-center md:gap-16 gap-4'>
                <Link to='/'><FaBars />
                </Link>
                {/* search input */}
                <div className='relative sm:w-72 w-40 space-x-1'>
                <CiSearch className='absolute inline-block left-3 inset-y-2'/>
                <input type='text' placeholder='Search' className='border-b-2 border-black w-full py-1 md:px-8 px-6 rounded-md focus:outline-none' />
                </div>
            </div>
            {/* right side */}
            <div className='relative flex items-center md:space-x-3 space-x-2'>
                <div >
                    {currentuser ? <>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen) }>
                        <img src={avatarImage} alt="" className={`size-7 rounded-full 
                            ${currentuser ? 'ring-2 ring-blue-400' : ''}`}/>
                    </button>
                    {/* show dropdown */}
                    {isDropdownOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                        <ul className='py-2'>
                            {navigation.map((item) => (
                                <li key={item.name} onClick={()=>setIsDropdownOpen(false)}>
                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-primary '>
                                    {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        </div>)}
                    
                    </> : <Link to="/login"> <FaRegUser className='size-6' /></Link>
                    }
                </div>
           
            <button className='hidden sm:block'>
                <TiHeartOutline className='size-7'/>
            </button>
            <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm size-70'>
                <IoCartOutline />
                {
              cartItems.length > 0 ? (
                <span className='text-sm font-semibold sm:ml-1'>
                  {cartItems.length}
                </span>
              ) : (
                <span className='text-sm font-semibold sm:ml-1'>0</span>
              )
            }
            </Link>
        </div>
    </nav>
</header>
  )
}

export default NavBar
