import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import profPic from "../../assets/images/face.svg";
import sun from '../../assets/images/sun-50.png'
import moon from '../../assets/images/moon-50.png'
import cartDark from '../../assets/images/shopping-dark.svg'
import cartLight from '../../assets/images/shopping-light.svg'
import cartFullDark from '../../assets/images/shopping-dark-full.svg'
import cartFullLight from '../../assets/images/shopping-light-full.svg'
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({ isDark, setIsDark, cartItems, inventoryData, isLoggedIn }){

    const [cartImage, setCartImage] = useState(null);

    const inventory = isLoggedIn ? inventoryData : "";
    
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
            <nav className='flex items-center justify-between p-1'>
                <Link className='contents' to='/'><img className='size-20 scale-90 rounded-full m-1 ml-8 hover:scale-100' src={profPic} alt="profPic"/> </Link>
                <SearchBar inventoryData={inventory} />
                <ul className='flex'>
                    <button onClick={() => setIsDark(!isDark)} className=' origin-right scale-90 hover:scale-100 size-16 pt-3'>
                    <img src = {isDark ? sun : moon} />
                    </button>                    
                    <li className="grid grid-cols-2 ">
                        {isLoggedIn ? ( <NavLink className={({ isActive }) => ["m-2", "p-2", "pt-4","rounded-xl","border-textColor","bg-none", "scale-90", "text-lg/6", "text-textColor", "hover:scale-100", "font-mono", isActive ? "border" : ""].join(" ")} to='/account'> Account </NavLink> )
                       : ( <NavLink className={({ isActive }) => ["m-2", "p-2", "pt-4","rounded-xl","border-textColor","bg-none", "scale-90", "text-lg/6", "text-textColor", "hover:scale-100", "font-mono", isActive ? "border" : ""].join(" ")} to='/login'> SignIn </NavLink> )}
                       <div>
                        <NavLink className={({ isActive }) => ["absolute", "border-textColor", "rounded-xl", "bg-none", "mt-2", "scale-90", "px-4", "py-3", "hover:scale-100", isActive ? "border" : ""].join(" ")} to='/cart'> <img src={cartImage} alt="cartImg" className='size-12'/>  <p className="right-4 text-xs -top-0 top-3 fixed font-bold text-textColor"> { cartItems.length > 0 ?  cartItems.length : "" } </p> </NavLink>
                       </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}