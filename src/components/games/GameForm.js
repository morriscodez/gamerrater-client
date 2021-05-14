import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getCategories, gameCategories, updateGame, getGamebyId } = useContext(GameContext)

    const { gameId } = useParams()

    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        numberOfPlayers: 0,
        categories: [],
        designer: "",
        release: "",
        duration: "",
        age: "",
        playerId: 0,
    })

    useEffect(() => {
        getCategories()
        if (gameId) {
            getGamebyId(gameId)
                .then(res => {
                    setCurrentGame({
                        title: res.title,
                        description: res.description,
                        numberOfPlayers: res.number_of_players,
                        categories: res.categories,
                        designer: res.designer,
                        release: res.release,
                        duration: res.duration,
                        age: res.age,
                        playerId: res.player
                    })
                })
        }
    }, [])

    const handleInput = (e) => {
        const newGameState = {...currentGame}
        let selectedVal = e.target.value

        newGameState[e.target.id] = selectedVal

        setCurrentGame(newGameState)
    }

    return (
        <>
            <form className="gameForm">
                <h2 className="gameForm__title">{ gameId ? "Edit Game" : "Register New Game"}</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="label">Title: </label>
                        <input type="text" id="label" required autoFocus className="form-control"
                            value={currentGame.label}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">description: </label>
                        <input type="text" id="description" required className="form-control"
                            value={currentGame.description}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="numberOfPlayers">Players Needed: </label>
                        <input type="text" id="numberOfPlayers" required className="form-control"
                            value={currentGame.numberOfPlayers}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="designer">designer: </label>
                        <input type="text" id="designer" required className="form-control"
                            value={currentGame.designer}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="release">Released: </label>
                        <input type="text" id="release" required className="form-control"
                            value={currentGame.release}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="duration">Duration: </label>
                        <input type="text" id="duration" required className="form-control"
                            value={currentGame.duration}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="age">age: </label>
                        <input type="text" id="age" required className="form-control"
                            value={currentGame.age}
                            onChange={handleInput}
                        />
                    </div>
                </fieldset>
                {/* <fieldset>
                    <div className="form-group">
                        <label htmlFor="gameCategoryId">Category: </label>
                        <select id="gameCategoryId" onChange={handleInput}>
                            {
                                gameTypes.map(type => {
                                    return <option key={type.id} value={type.id}>{type.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset> */}

                <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    if (gameId) {
                        const game = {
                            id: gameId,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            description: currentGame.description,
                            categories: currentGame.categories,
                            designer: currentGame.designer,
                            duration: currentGame.duration,
                            age: currentGame.age,
                            playerId: currentGame.playerId
                        }
                        updateGame(game)
                            .then(() => history.push("/games"))
                    } else {
                        const game = {
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            description: currentGame.description,
                            categories: currentGame.categories,
                            designer: currentGame.designer,
                            duration: currentGame.duration,
                            age: currentGame.age,
                            playerId: currentGame.playerId
                        }

                        // Send POST request to your API
                        createGame(game)
                            .then(() => history.push("/games"))
                    }
                    

                }}
                className="btn btn-primary">{ gameId ? "Update" : "Create"}</button>




            </form>

        </>
    )
}