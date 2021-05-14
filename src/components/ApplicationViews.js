import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./games/GameProvider"
import { GameList } from "./games/GameList"
import { GameForm } from "./games/GameForm"

export const ApplicationViews = () => {
    return  <>
                <main style={{
                    margin: "5rem 2rem",
                    backgroundColor: "lightgoldenrodyellow",
                    lineHeight: "1.75rem"
                }}>
                    
                    <GameProvider>
                        <Route exact path='/'>
                            <GameList />
                        </Route>
                        <Route path='/games/new'>
                            <GameForm />
                        </Route>
                        <Route path='/games/:gameId(\d+)/edit'>
                            <GameForm />
                        </Route>

                    </GameProvider>
                </main>
            </>
}