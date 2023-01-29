import { ReactElement } from "react";

const HowTo = (): ReactElement => {
    return (
        <section>
            <h2 className="board-word">How To Play</h2>
            <article className="howto">
                <p>
                    The aim of the game is to turn off all the lights on the board.<br/>
                    When you click on a light, it will toggle on/off along with its 4 neighbours (N,S,E,W).
                </p>
            </article>
        </section>
    )
};

export default HowTo;