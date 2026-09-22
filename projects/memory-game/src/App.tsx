import { useState, useEffect } from 'react';
import OrientationLock from '@components/OrientationLock';
import Card from '@components/Card';
import checkMark from '@images/check_mark_button.webp';
import Pizza from '@images/pizza.webp';
import Rocket from '@images/rocket.webp';
import Pumpkin from '@images/jack_o_lantern.webp';
import Heart from '@images/heart_on_fire.webp';
import Sun from '@images/sun_with_face.webp';
import Bomb from '@images/bomb.webp';
import Clover from '@images/four_leaf_clover.webp';
import Alien from '@images/alien_monster.webp';

interface CardDataTypes {
  id: string;
  figure: string;
  src: string;
  isHidden?: boolean;
  isAnimatedHide?: boolean;
}

const uniqueCards = [
  { figure: 'Pizza', src: Pizza },
  { figure: 'Rocket', src: Rocket },
  { figure: 'Pumpkin', src: Pumpkin },
  { figure: 'Heart', src: Heart },
  { figure: 'Sun', src: Sun },
  { figure: 'Bomb', src: Bomb },
  { figure: 'Clover', src: Clover },
  { figure: 'Alien', src: Alien },
];

const initialCards: CardDataTypes[] = uniqueCards.flatMap((card) => [
  { ...card, id: crypto.randomUUID() },
  { ...card, id: crypto.randomUUID() },
]);

function shuffleArray(array: CardDataTypes[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function App() {
  const [cardsData, setCardsData] = useState(() => shuffleArray(initialCards));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isFinishedGame, setIsFinishedGame] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const promises = [...uniqueCards, { figure: 'Check', src: checkMark }].map(
      (card) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = card.src;
        })
    );
    Promise.all(promises).then(() => setIsLoading(false));
  }, []);

  function handleMatchedCards(firstIndex: number, secondIndex: number) {
    const isAllHidden = cardsData.every(
      (card, index) =>
        card.isHidden || index === firstIndex || index === secondIndex
    );

    setTimeout(() => {
      setCardsData((prev) => {
        const newCards = [...prev];
        newCards[firstIndex] = {
          ...newCards[firstIndex],
          isAnimatedHide: true,
        };
        newCards[secondIndex] = {
          ...newCards[secondIndex],
          isAnimatedHide: true,
        };
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
      if (isAllHidden) {
        setTimeout(() => setIsFinishedGame(true), 500);
        setTimeout(() => location.reload(), 12500);
      }
      setSelectedCards([]);
    }, 3000);
  }

  function handleCardClick(index: number) {
    if (selectedCards.length >= 2) return;

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

    if (cardsData[firstIndex].figure === cardsData[index].figure) {
      handleMatchedCards(firstIndex, index);
    } else {
      setTimeout(() => {
        setSelectedCards([]);
      }, 2000);
    }
  }

  const selectedCardsSet = new Set(selectedCards ?? []);

  return (
    <OrientationLock>
      {isLoading ? (
        <div className="loader">
          <div className="loader__spinner"></div>
        </div>
      ) : (
        <main className="content">
          {!isFinishedGame && (
            <div className="content__inner">
              <div className="content__cards">
                {cardsData.map((card, index) => (
                  <Card
                    key={card.id}
                    src={card.src}
                    isSelected={selectedCardsSet.has(index)}
                    isHidden={card.isHidden}
                    isAnimatedHide={card.isAnimatedHide}
                    onClick={() => handleCardClick(index)}
                    theme={isDark ? 'dark' : 'light'}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      )}
    </OrientationLock>
  );
}
