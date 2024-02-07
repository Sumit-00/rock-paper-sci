import React from 'react'
import { useParams } from 'react-router-dom';
import { ROCK, PAPER, SCISSORS } from '../../utils/constants';

function PlayScreen() {
    const {id, oppId} = useParams();
    const [userChoice, setUserChoice] = React.useState("");
    const [winningText, setWinningText] = React.useState("");

    // TODO: Create a singleton class for the brodcast user
    const userChoiceChannel = new BroadcastChannel("userChoice");

    const handleSubmitClick = () => {
        const value = (userChoice || "").trim();
        const lowerCaseValue = value.toLowerCase();
        if((lowerCaseValue === ROCK) || (lowerCaseValue === PAPER) || (lowerCaseValue === SCISSORS)) {
            const data = {
                userChoice: lowerCaseValue,
                id,
                oppId
            }
            userChoiceChannel.postMessage(data)
        }else {
            alert("Please select one of the following: Rock, Paper, Scissor")
        }
    }

    const handleInputChange = (e) => {
        setUserChoice(e.target.value);
    }

    const winningCondition = (oppChoice) => {
        if(userChoice === oppChoice) {
            setWinningText("Draw");
            return;
        }
        if(userChoice === ROCK && oppChoice === SCISSORS) {
            setWinningText(`${oppId} wins`)
        }else if(userChoice === PAPER && oppChoice === SCISSORS) {
            setWinningText(`${oppId} wins`)
        }else if(userChoice === SCISSORS && oppChoice === PAPER) {

        }
    }

    React.useEffect(() => {
        userChoiceChannel.addEventListener("message", (event) => {
            const data = event.data;
            if(data.id !== id) {
                winningCondition(data.userChoice)
            }
        })
    }, [])




  return (
    <section>
        <label>Enter your choice</label>
        <input type='text' placeholder='Rock, paper, scissors' onChange={handleInputChange}/>
        <button onClick={handleSubmitClick}>Submit</button>
        {winningText && <p>{winningText}</p>}
    </section>
  )
}

export default PlayScreen