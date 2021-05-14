import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames, categories, getCategories } = useContext(GameContext)


    useEffect(() => {
        getGames()
    }, [])
    useEffect(() => {
        console.log(games)
    }, [games])

    const history = useHistory()

    return (
        <article className="games">
            <hr></hr>
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" })
            }}> Register New Game </button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__edit">
                            <button className="btn btn-3" onClick={e => history.push(`/games/${game.id}/edit`)}>
                                Edit
                            </button>
                        </div>
                        <div className="game__title">{game.title}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__description">{game.description}</div>
                        <div className="game__designer">{game.designer}</div>
                        <div className="game__duration">{game.duration}</div>
                        <div className="game__release">Released: {game.release}</div>
                        <div className="game__categories">Categories: &nbsp; {
                                game.categories.map(gc => gc.label).join(", ")
                            }
                        </div>
                    </section>
                })
            }
        </article>
    )
}