export default function Cart ( { cartItems }){
    const listItems = cartItems.map((d)=> <h1 className="border border-textColor w-48 m-auto list-none" key={d.item.id}> <li > {d.item.product_name} </li> 
                                                                <li> {d.item.price} </li> 
                                            
                                            </h1>);
    return(
        <div className='text-textColor text-center'>
            <h1>This is Cart!</h1>
            {listItems}
        </div>
    );
}