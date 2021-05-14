import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./games/GameProvider"
import { GameList } from "./games/GameList"

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

                    </GameProvider>
                </main>
            </>
}