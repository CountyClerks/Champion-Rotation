
import {useEffect, useState} from 'react'
import champions from '../utils/championArray'

export default function Game() {
    const [championArray, setChampionArray] = useState(champions)
    const [renderedChampionArray, setRenderedChampions] = useState([{}])
    const [summonedChampions, setSummonedChampions] = useState({})
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const selectedChampions = 5

    useEffect(() => {
        function getChamps() {
            const shuffleArray = champions.sort(() => 0.5 - Math.random())
            const randomChampions = shuffleArray.slice(0, selectedChampions)
            setRenderedChampions(randomChampions)
        }
        getChamps()
    }, [summonedChampions, score])

    function handleClick(event) {
        let selectedChampionIndex = championArray.findIndex(champion => champion.name === event.target.id)
        if (championArray[selectedChampionIndex].summoned === true) {
            setSummonedChampions(championArray[selectedChampionIndex])
            championArray.map((champion, index) => {
                champion.summoned = false
                return champion
            })
            if(score > highScore) {
                setHighScore(score)
            }
            setScore(0)
        } else if (championArray[selectedChampionIndex].summoned === false) {
            setSummonedChampions(championArray[selectedChampionIndex])
            setScore(score + 1)
            if (score >= highScore) {
                setHighScore(score + 1)
            }
            champions[selectedChampionIndex].summoned = true
        }
    }

    const listChampions = renderedChampionArray.map((champion, index) => {
        return (
            <div className="champion--card" key={index}>
                <div className="button--wrap">
                    <button type="button"  onClick={handleClick} id={champion.name} style={{backgroundImage: "url(" + champion.image + ")"}} alt="Image of league of legends champion" className="champion--image"/>
                </div>
                <h2 className="champion--name">{champion.name}</h2>
            </div>
        )
    })

    return (
        <main className="game">
            <div className="champions">
                {listChampions}
            </div>
            <div className="score--card">
                <h2>Score: {score}</h2>
                <h2>High Score: {highScore}</h2>
            </div>
        </main>
    )
}
