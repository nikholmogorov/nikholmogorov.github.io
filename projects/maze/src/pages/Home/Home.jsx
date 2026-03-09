import { useRef } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/index";
import styles from "./Home.module.css";

export default function Home() {
    const activatorRef = useRef(null);
    const setMode = useStore((state) => state.setMode);

    const handleGoFirst = () => {
        new Audio(`${import.meta.env.BASE_URL}door_sound.mp3`).play();
    };

    const activateUnusualMode = () => {
        new Audio(`${import.meta.env.BASE_URL}activate_unusual_mode_sound.mp3`).play();
        activatorRef.current.innerText = "¡";
        setMode(true);
    };

    return (
        <div className={styles.area}>
            <h1>The Maze</h1>
            <p>
                Test your maze navigation skills! <br />
                Navigate mazes carefully to reach goals without touching walls.{" "}
                <br />
                How steady is your hand? The maze will tell! <br />
                Complete all four challenging levels to prove your precision.{" "}
                <br />
                <br />
                Immersive sound effects enhance your navigation experience
                <span
                    className={styles.activator}
                    ref={activatorRef}
                    onClick={activateUnusualMode}
                >
                    !
                </span>
            </p>
            <Link className={styles.link} to="/first" onClick={handleGoFirst}>
                PLAY
            </Link>
        </div>
    );
}
