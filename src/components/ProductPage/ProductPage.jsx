import { useLocation } from 'react-router-dom'

export default function ProductPage (){
    const { state } = useLocation();
    const item = state?.item;

    if (!item) return <p> No user data</p>

    return(
        <div className="text-textColor">
            <h1>
                This is product page!
            </h1>
        </div>
    );
}