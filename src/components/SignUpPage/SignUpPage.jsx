import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage(){
    
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    
    const emailRegex = /^[a-zA-Z0-9.+-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^[a-zA-z0-9!#@%\$\&]+$/;

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("This is email: ", email)

        // console.log(username);
        // console.log(email);
        // console.log(password);

        if(!username){
            console.log("Username error");
            setUsernameIsValid(false);
        }
        else if(!emailRegex.test(email)){
            setEmailIsValid(false);
        }
        else if(!passwordRegex.test(password)){
            setPasswordIsValid(false);
        }
        else if(emailRegex.test(email) && passwordRegex.test(password)){

            const data ={
                username: username,
                email: email,
                password: password,
            }
            
            try{
                const response = await fetch('http://localhost:3000/api/users/',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                const statusCode = response.status;
                console.log("Response: ", result)
                console.log("StatusCode: ", statusCode)

                if(statusCode === 400){
                    console.log("Status Code: ", statusCode)
                    setEmailIsValid(false);
                }
                else if(statusCode === 500){
                    console.log("Status Code: ", statusCode);
                    console.log("Everything went wrong")
                    setEmailIsValid(false);
                    setUsernameIsValid(false);
                    setPasswordIsValid(false);
                }
                else if(statusCode === 409){
                    console.log("Status Code: ", statusCode);
                    setUsernameIsValid(false);
                    setEmailIsValid(false);
                }
                else{
                    setUsernameIsValid(true);
                    setPasswordIsValid(true)
                    setEmailIsValid(true);
                    navigate(`/login`);
                }
            }
            catch(err){
                console.error("This is error:" ,err);
                setEmailIsValid(false);
                setUsernameIsValid(false);
                setPasswordIsValid(false);
            }
        }
        else{
            setEmailIsValid(false);
            console.log("Something wrong")
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
        !usernameIsValid ? 'border-red-500 border-2' : 'border-textColor border-1' ,  
    ].join(' ');

    const inputClassesEmail = [
        'bg-white',
        'border',
        'rounded',
        'pl-1',
        !emailIsValid ? 'border-red-500 border-2' : 'border-textColor border-1' , 
    ].join(' ');

    const inputClassesPassword = [
        'bg-white',
        'border',
        'rounded',
        'pl-1',
        !passwordIsValid ? 'border-red-500 border-2' : 'border-textColor border-1' , 
    ].join(' ');

      return(
        <div className='text-center text-textColor'>
            This is Sign Up Page!
            <form onSubmit={handleSubmit}>
                <div>
                    <input className={inputClassesUsername} placeholder="Username" value={username} onChange={ (e) => setUsername(e.target.value) } onKeyDown={handleKeyDown}/>
                </div>
                <br/>
                <div>
                    <input className={inputClassesEmail} placeholder="Email" value={email} onChange={ (e) => setEmail(e.target.value) } onKeyDown={handleKeyDown}/>
                </div>
                <br/>
                <div>
                    <input className={inputClassesPassword} placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                <div className='m-2'>
                    <button className='border border-textColor rounded p-1' type="submit" >Submit</button>
                </div>
            </form>
        </div>
    );
}

