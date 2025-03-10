import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import profPic from "../../assets/images/face.svg";
import sun from '../../assets/images/sun-50.png'
import moon from '../../assets/images/moon-50.png'
import cartDark from '../../assets/images/shopping-dark.svg'
import cartLight from '../../assets/images/shopping-light.svg'
import cartFullDark from '../../assets/images/shopping-dark-full.svg'
import cartFullLight from '../../assets/images/shopping-light-full.svg'
import searchBar from '../../assets/images/search.svg'



export default function NavBar({ isDark, setIsDark, cartItems }){

    const [cartImage, setCartImage] = useState(null);
    
    let cartLength = Object.keys(cartItems).length;
    
    useEffect(() => {
        if( cartLength > 0 ) {
            if(isDark){
                setCartImage(cartFullLight);
            }
            else{
                setCartImage(cartFullDark);
            }
        }
        else{
            if(isDark){
                setCartImage(cartLight);
            }
            else{
                setCartImage(cartDark);
            }
        }
    })

    return(
        <div className="bg-navBar">
            <nav className='flex w-full items-center justify-between'>
                <Link className='contents' to='/'><img className='size-20 scale-90 rounded-full m-2 hover:scale-100' src={profPic} alt="profPic"/> </Link>
                <div className="w-2/3 pb-8" >
                    <input className='w-2/3 size-8 border border-textColor bg-white pl-8 rounded-lg flex absolute' type='input' placeholder="Search..."/>
                    <button className="pt-1 pl-1 absolute scale-90 hover:scale-100" > <img alt='search' src={searchBar} className="size-6" /> </button>
                </div>
                <ul className='flex'>
                    <button onClick={() => setIsDark(!isDark)} className=' origin-right scale-90 hover:scale-100 size-16'>
                    <img src = {isDark ? sun : moon} />
                    </button>                    
                    <li className="flex">
                        {/* <NavLink className='m-2 scale-90 text-lg/6 text-black px-4 py-3 hover:scale-100 font-mono' to='/about'> About</NavLink> */}
                       <NavLink className={({ isActive }) => ["m-3", "p-3","rounded-xl","border-textColor","bg-none", "scale-90", "text-lg/6", "text-textColor", "hover:scale-100", "font-mono", ,isActive ? "border" : ""].join(" ")} to='/about'> About </NavLink> 
                       <NavLink className={({ isActive }) => ["border-textColor", "rounded-xl", "bg-none", "m-2", "scale-90", "px-4", "py-3", "hover:scale-100", isActive ? "border" : ""].join(" ")} to='/cart'> <img src={cartImage} alt="cartImg" className='size-10'/> </NavLink>  

                    </li>
                </ul>
            </nav>
        </div>
    );
}