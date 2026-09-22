import clsx from 'clsx';
import cardBackLight from '@images/card__back-image-light.webp';
import cardBackDark from '@images/card__back-image-dark.webp';
import checkMark from '@images/check_mark_button.webp';
import transparent from '@images/transparent.webp';

interface CardProps {
  src: string;
  onClick: () => void;
  isSelected?: boolean;
  isHidden?: boolean;
  isAnimatedHide?: boolean;
  theme: 'light' | 'dark';
}

export default function Card(props: CardProps) {
  const { src, onClick, isSelected, isHidden, isAnimatedHide, theme } = props;

  const cardBack = theme === 'dark' ? cardBackDark : cardBackLight;

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === `Enter` || e.key === ` `) onClick();
  }

  return (
    <div
      className={clsx('card', {
        selected: isSelected,
        hidden: isHidden,
      })}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="card__back">
        <img
          className="card__back-image"
          src={isAnimatedHide ? transparent : cardBack}
          alt="Card Back"
          draggable={false}
        />
      </div>
      <div
        className={clsx('card__front', {
          'card__front--transparent': isAnimatedHide,
          'card__front--dark': theme === 'dark',
        })}
      >
        <img
          className="card__front-image"
          src={isAnimatedHide ? checkMark : src}
          alt="Card Front"
          draggable={false}
        />
      </div>
    </div>
  );
}
