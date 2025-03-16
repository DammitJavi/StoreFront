export default function Card( { item } ) {
    return(
        <div className='max-w-md rounded overflow-hidden p-4 border-textColor w-40 border size-13 m-5 text-center text-textColor bg-card scale-90 hover:scale-100'>
            <h1 >{item.product_name}</h1>
            <div >
                {item.category}
            </div>
            <div>
                ${item.price}
            </div>
            <div>
                {item.status}
            </div>
        </div>
    );
}