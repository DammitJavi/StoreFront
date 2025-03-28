export default function Account ({ user, setLoggedIn }){

    const handleLogOff = () => {
        setLoggedIn(false);
    }

    return (
        <div className="text-center">
            <div>Hello {user}</div>
            <button className="border border-textColor rounded p-1" onClick={handleLogOff}>Log Off</button>
        </div>
    );
}