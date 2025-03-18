import { useState } from 'react';

export default function SignUpPage(){
    
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    
    const emailRegex = /^[a-zA-Z0-9.+-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("This is email: ", email)

        // console.log(username);
        // console.log(email);
        // console.log(password);


        console.log(email)

        if(emailRegex.test(email)){
            console.log(true)
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
                console.log("Response: ", result)
                setEmailIsValid(true);
            }
            catch(err){
                console.error(err);
                
            }
        }
        else{
            setEmailIsValid(false);
            console.log("email wrong")
        }
    }


    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
    }

    const inputClasses = [
        'border',
        'rounded',
        'pl-1',
        !emailIsValid ? 'border-red-500' : 'border-textColor',
        !emailIsValid ? 'border-2' : '',
      ].join(' ');
    
    return(
        <div>
            This is Sign Up Page!
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="border border-textColor rounded pl-1" placeholder="Username" value={username} onChange={ (e) => setUsername(e.target.value) } onKeyDown={handleKeyDown}/>
                </div>
                <br/>
                <div>
                    <input className={inputClasses} placeholder="Email" value={email} onChange={ (e) => setEmail(e.target.value) } onKeyDown={handleKeyDown}/>
                </div>
                <br/>
                <div>
                    <input className="border border-textColor rounded pl-1" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                <button className='border border-textColor rounded' type="submit" >Submit</button>
            </form>
        </div>
    );
}

