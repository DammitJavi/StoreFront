import { Link } from 'react-router-dom';
import SignUpPage from '../SignUpPage/SignUpPage.jsx';

export default function LoginPage (){
    return (
        <div className="text-textColor text-center p-10 ">
           
            <p> You are not logged in! Please Login. </p>
            <Link to="/signup" >Need an Account? Click Here.</Link>

        </div>
    );
}