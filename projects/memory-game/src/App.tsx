import { useState, useEffect } from "react";
import classNames from 'classnames';

import OrientationLock from "./components/OrientationLock";
import Card from "./components/Card";

import checkMark from "./assets/images/Check Mark Button.webp";
import Pizza from "./assets/images/Pizza.webp";
import Rocket from "./assets/images/Rocket.webp";
import Pumpkin from "./assets/images/Jack O Lantern.webp";
import Heart from "./assets/images/Heart On Fire.webp";
import Sun from "./assets/images/Sun With Face.webp";
import Bomb from "./assets/images/Bomb.webp";
import Clover from "./assets/images/Four Leaf Clover.webp";
import Alien from "./assets/images/Alien Monster.webp";

interface CardDataTypes {
    figure: string;
    src: string;
    isHidden?: boolean;
    isAnimatedHide?: boolean;
}

const initialCards: CardDataTypes[] = [
    { figure: "Pizza", src: Pizza },
    { figure: "Pizza", src: Pizza },
    { figure: "Rocket", src: Rocket },
    { figure: "Rocket", src: Rocket },
    { figure: "Pumpkin", src: Pumpkin },
    { figure: "Pumpkin", src: Pumpkin },
    { figure: "Heart", src: Heart },
    { figure: "Heart", src: Heart },
    { figure: "Sun", src: Sun },
    { figure: "Sun", src: Sun },
    { figure: "Bomb", src: Bomb },
    { figure: "Bomb", src: Bomb },
    { figure: "Clover", src: Clover },
    { figure: "Clover", src: Clover },
    { figure: "Alien", src: Alien },
    { figure: "Alien", src: Alien },
];

const shuffleArray = (array: CardDataTypes[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    };
    return shuffled;
};

const preloadedImages: string[] = [checkMark];

const preloadImages = () => {
    preloadedImages.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
};

const App = () => {

    const [cardsData, setCardsData] = useState(shuffleArray(initialCards));
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [isHiddenAll, setIsHiddenAll] = useState<boolean>(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isExitBlocked, setIsExitBlocked] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        preloadImages();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isExitBlocked) {
                e.preventDefault();
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isExitBlocked]);

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
            setTheme(e.matches ? "dark" : "light");
        };
        applyTheme(prefersDark);
        prefersDark.addEventListener("change", applyTheme);
        return () => {
            prefersDark.removeEventListener("change", applyTheme);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
        if (e.key === "Enter" || e.key === " ") {
            handleCardClick(index);
        };
    };

    const handleMatchedCards = (firstIndex: number, secondIndex: number) => {
        setIsExitBlocked(true);

        setTimeout(() => {
            setCardsData((prev) => {
                const newCards = [...prev];
                newCards[firstIndex] = { ...newCards[firstIndex], isAnimatedHide: true };
                newCards[secondIndex] = { ...newCards[secondIndex], isAnimatedHide: true };
                return newCards;
            });
        }, 1000);

        setTimeout(() => {
            setCardsData((prev) => {
                const newCards = [...prev];
                newCards[firstIndex] = { ...newCards[firstIndex], isHidden: true };
                newCards[secondIndex] = { ...newCards[secondIndex], isHidden: true };
                return newCards;
            });

            setSelectedCards([]);
            setIsBlocked(false);

            setCardsData((prev) => {
                const allHidden = prev.every((card) => card.isHidden);
                if (allHidden) {
                    setIsExitBlocked(false);
                    setTimeout(() => setIsHiddenAll(true), 500);
                    setTimeout(() => location.reload(), 12500);
                }
                return prev;
            });
        }, 3000);
    };

    const handleCardClick = (index: number) => {
        if (isBlocked) return;

        if (selectedCards.includes(index)) {
            setSelectedCards((prev) => prev.filter((i) => i !== index));
            return;
        }

        if (selectedCards.length === 0) {
            setSelectedCards([index]);
            return;
        }

        const firstIndex = selectedCards[0];
        setSelectedCards([firstIndex, index]);
        setIsBlocked(true);

        if (cardsData[firstIndex].figure === cardsData[index].figure) {
            handleMatchedCards(firstIndex, index);
        } else {
            setTimeout(() => {
                setSelectedCards([]);
                setIsBlocked(false);
            }, 2000);
        }
    };

    return (
        <>
            <OrientationLock>
                <main className={classNames("content", { "dark": theme === "dark" })}>
                    {!isHiddenAll && (
                        <div className="content__inner">
                            <div className="content__cards">
                                {cardsData.map((card, index) => (
                                    <Card
                                        key={index}
                                        src={card.src}
                                        isSelected={selectedCards.includes(index)}
                                        isHidden={card.isHidden}
                                        isAnimatedHide={card.isAnimatedHide}
                                        onClick={() => handleCardClick(index)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, index)}
                                        theme={theme} />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </OrientationLock>
        </>
    )
};

export default App;