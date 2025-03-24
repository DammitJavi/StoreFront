import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function LoginPage ( { setLoggedIn, setUser } ){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [userValid, setUserValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    
    let navigate = useNavigate();

    const submitInfo = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password, 
        }

        if(!username){
            console.log("Username is empty.")
        }
        else if(!password){
            console.log("Password is empty");
        }
        else if( username && password){
            try{
                const response = await fetch('http://localhost:3000/api/login/',{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                const result = await response.json();
                const statusCode = response.status;
                if(statusCode === 200){
                    setLoggedIn(true);
                    setUserValid(true);
                    setPasswordValid(true);
                    setUser(username);
                    navigate(`/`);
                }
                else{
                    setUserValid(false);
                    setPasswordValid(false);
                }
                
            }
            catch(err){
                console.error("This is error: ", err);
            }
        }
        else{
            console.log("Something went wrong.")
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
    }

    const inputClassesUsername = [
        'bg-white',
        'border',
        'rounded',
        'pl-1',
        !userValid ? 'border-red-500 border-2' : 'border-textColor border-1',
    ].join(' ');

    const inputClassesPassword = [
        'bg-white',
        'border',
        'rounded',
        'pl-1',
        !passwordValid ? 'border-red-500 border-2' : 'border-textColor border-1',
    ].join(' ');

    return (
        <div className="text-textColor text-center p-10">
            <p> You are not logged in! Please Login. </p>
            <form onSubmit={submitInfo}>
                <div>
                    <input className={inputClassesUsername} value={username} onChange={ e => setUsername(e.target.value)} placeholder='Username' onKeyDown={handleKeyDown} />
                </div>
                <br/>
                <div>
                    <input className={inputClassesPassword} value={password} onChange={ e => setPassword(e.target.value)} placeholder='Password'onKeyDown={handleKeyDown} />
                </div>
                <div className='m-2'>
                    <button className='border border-textColor rounded p-1' type="submit" >Submit</button>
                </div>
            </form>
            <Link className="hover:underline" to="/signup" >Need an Account? Click Here.</Link>

        </div>
    );
}