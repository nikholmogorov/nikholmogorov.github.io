import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/index";
import styles from "./Fourth.module.css";

export default function Fourth() {
    const navigate = useNavigate();
    const hasPlayed = useRef(false);

    const { unusualMode, setMode, asciiArt } = useStore();

    const { bsod, usualAscii, unusualAscii } = asciiArt;

    const handleGoHome = () => {
        let soundExit = unusualMode
            ? `${import.meta.env.BASE_URL}exit_unusual_sound.mp3`
            : `${import.meta.env.BASE_URL}exit_usual_sound.mp3`;
        new Audio(soundExit).play();
        setMode(false);
        navigate("/");
    };

    useEffect(() => {
        const playOnce = async () => {
            if (!hasPlayed.current) {
                let soundEntry = unusualMode
                    ? `${import.meta.env.BASE_URL}entry_unusual_sound.mp3`
                    : `${import.meta.env.BASE_URL}entry_usual_sound.mp3`;
                await new Audio(soundEntry).play();
                hasPlayed.current = true;
            }
        };

        document.addEventListener("mousemove", playOnce, { once: true });
    }, []);

    return (
        <div className={styles.area} onClick={handleGoHome}>
            <pre className={styles.ascii}>
                {unusualMode ? unusualAscii : usualAscii}
            </pre>
            <p className={styles.bsod}>{unusualMode ? "" : bsod}</p>
        </div>
    );
}
