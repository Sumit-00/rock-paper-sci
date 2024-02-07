import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function UsersList() {
    const navigate = useNavigate();
    const {id} = useParams();
    const userList = JSON.parse(localStorage.getItem("userList"))
    const [list, setList] = React.useState(userList || []);

    // TODO: create a singleton classes for all the channels
    const channel = new BroadcastChannel("userList");
    const playChannel = new BroadcastChannel("play")

    const handlePlayButtonClick = (selectedUser) => {
        const data = {
            primaryUser: id,
            selectedUser
        }
        playChannel.postMessage(data)
        navigate(`/play/${id}/${selectedUser}`)
    }

    // listening for the new users that join in the list
    React.useEffect(() => {
        channel.addEventListener("message", (event) => {
            setList(event.data);
        })
    }, [])

    // listen for the opponent play button click
    React.useEffect(() => {
        playChannel.addEventListener("message", (event) => {
            const opponentData = event.data || {};
            if(Object.keys(opponentData).length > 0 && opponentData.primaryUser !== id){
                navigate(`/play/${id}/${opponentData.primaryUser}`)
            }
        })
    }, [])

    // to remove the current user when the user closed the tab
    // React.useEffect(() => {
    //     window.onbeforeunload = function(e) {
    //         const removedCurrUser = list.filter((item) => item !== id);
    //         channel.postMessage(removedCurrUser);
    //         localStorage.setItem("userList", JSON.stringify(removedCurrUser));
    //     }
    // }, [])


  return (
    <div>
        {list.length > 0 && list.filter((item) => item !== id).map((item) => {
            return (
                <div key={item}>
                    <p>{item}</p>
                    <button onClick={() => handlePlayButtonClick(item)}>Play</button>
                </div>
            )
        })}
        {list.length === 1 && <h3>No user found</h3>}
    </div>
  )
}

export default UsersList