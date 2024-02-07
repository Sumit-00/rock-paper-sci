import React from 'react'
import { useNavigate } from "react-router-dom"
import "./styles.css"

function EntryScreen() {
    const navigate = useNavigate();
    const [userName, setUserName] = React.useState("");

    const handleSubmitClick = () => {
        const userList = JSON.parse(localStorage.getItem("userList")) || [];
        if(!userList.includes(userName)){
            const updatedUserList = [...userList, userName];
            localStorage.setItem("userList", JSON.stringify(updatedUserList));
            const channel = new BroadcastChannel("userList");
            channel.postMessage(updatedUserList);
            navigate(`/user-list/${userName}`)
        }else {
            alert("Enter a different user name")
        }
    }

    const handleUserNameChange = (e) => {
        const value = (e.target.value || "").trim();
        setUserName(value);
    }


  return (
    <section className='entryScreenWrapper'>
        <div>
            <label>Enter your username: </label>
            <input type='text' id="username" value={userName} onChange={handleUserNameChange}/>
        </div>
        <button onClick={handleSubmitClick}>Submit</button>
    </section>
  )
}

export default EntryScreen