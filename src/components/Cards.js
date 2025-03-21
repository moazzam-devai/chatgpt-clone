import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../style/genric-cards.css';

const Cards = ({ questions, onCardClick }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isMediumScreen = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  const getDisplayedCards = () => {
    if (isSmallScreen) {
      return questions.slice(0, 2);
    }
    if (isMediumScreen) {
      return questions.slice(0, 4);
    }
    return questions;
  };

  return (
    <div className='flex justify-center sFlex'>
      {getDisplayedCards().map((question, index) => (
        <div
          key={index}
          className='cardStyle text-start'
          onClick={() => onCardClick(question)}
        >
          <i className={`fa-solid ${index === 0 ? 'fa-pen sky' : index === 1 ? 'fa-graduation-cap purple' : index === 2 ? 'fa-lightbulb yellow' : 'fa-code red'}`}></i>
          <p className='text-slate-500 mt-1'>{question}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
