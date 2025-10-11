import classNames from 'classnames';

import cardBackLight from "../assets/images/card__back-image.webp";
import cardBackDark from "../assets/images/card__back-image-dark.webp";
import checkMark from "../assets/images/Check Mark Button.webp";
import transparent from "../assets/images/transparent.webp";

const Card = ({ src, onClick, onKeyDown, isSelected, isHidden, isAnimatedHide, theme }) => {
    let cardBack = theme === "dark" ? cardBackDark : cardBackLight;
    return (
        <>
            <div className={classNames("card", { "selected": isSelected, "hidden": isHidden })} onClick={onClick} tabIndex={0} onKeyDown={onKeyDown}>
                <div className="card__back">
                    <img className="card__back-image" src={isAnimatedHide ? transparent : cardBack} alt="Card Back" width="" height=""
                        loading="lazy" draggable="false" />
                </div>
                <div className={classNames("card__front", { "card__front--transparent": isAnimatedHide, "card__front--dark": theme === "dark" })}>
                    <img className="card__front-image" src={isAnimatedHide ? checkMark : src} alt="Card Front" width="" height="" loading="lazy"
                        draggable="false" />
                </div>
            </div>
        </>
    )
};

export default Card;