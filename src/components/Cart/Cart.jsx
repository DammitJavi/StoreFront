import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import trashDark from '../../assets/images/trash-dark.svg'
import trashLight from '../../assets/images/trash-light.svg'

function deleteFromCart( cartItems, setCartItems, setNumCartItems, index ){

    const updateItems = cartItems.filter(item => item.index !== index );
    setCartItems(updateItems);
    setNumCartItems(Object.keys(cartItems).length);
}

export default function Cart ( { cartItems, setCartItems, numCartItems, setNumCartItems, isDark }){

    const [ trashImg, setTrashImg ] = useState(null);

    useEffect(() => {
        (isDark ? setTrashImg(trashDark) : setTrashImg(trashLight) )
    })

    const listItems = cartItems.map((d)=> <div className="justify-center flex border border-textColor w-48 m-auto list-none p-2 space-y-2" key={d.index}> 
                                                <div className='p-2'>
                                                    <li> {d.item.product_name} </li> 
                                                    <li> {d.item.price} </li>
                                                </div>
                                                <div className='pt-3 pl-4'>
                                                    <button onClick={() => deleteFromCart(cartItems, setCartItems, setNumCartItems, d.index)}><img src={trashImg} className='size-6 scale-90 hover:scale-100' /></button>
                                                </div>
                                            </div>);

    return(
        <div className='flex justify-center'>
            <div className="text-textColor text-center border border-textColor space-y-2">
                <h1>This is Cart!</h1>
                {listItems}
            
            </div>
            <div className="absolute inset-y-28 right-2 flex ">
                <div>
                    <Link to="/">
                        <button className=" p-2">Proceed to Checkout</button>            
                    </Link>
                </div>
            </div>
        </div>
    );
}