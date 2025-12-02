import { useState, useCallback,useRef  } from 'react'
import QUESTIONS from '../QUESTIONS.js';
import summaryLogo from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'

export default function Quiz() {
    const shuffledAnswer = useRef();
    const [userAnswer, setUserAnswer] = useState([]);
    const [answerState,setAnswerState] = useState('');
     let activeQuestionIndex =answerState === '' ? userAnswer.length : userAnswer.length - 1;
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length;



    if (activeQuestionIndex < 0) {
    activeQuestionIndex = 0;
  }
  if (activeQuestionIndex >= QUESTIONS.length) {
    activeQuestionIndex = QUESTIONS.length - 1;
  }

  
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswer((prevState) => {
            return [...prevState, selectedAnswer,];
        });

        setTimeout(()=>{
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }
            else{
                setAnswerState('wrong');
            }
            setTimeout(()=>{
                setAnswerState('');
            },2000)
        },1000)

    }, [activeQuestionIndex]);
    const handleSkipAnser = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quisIsComplete) {
        return (
            <div id="summary">
                <img src={summaryLogo} alt="" />
                <h2>quiz completed</h2>
            </div>
        );
    }
    if(!shuffledAnswer.current){
        shuffledAnswer.current = [...QUESTIONS[activeQuestionIndex].answers];
        shuffledAnswer.current.sort(() => Math.random() - 0.5);
    }

    return (
        <div id='quiz'>
            <div id="question">
                
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeOut={1000}
                    onTimeOut={handleSkipAnser}
                />

                <h2> {QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
          {shuffledAnswer.current.map(answer => {
            const isSelected = userAnswer[userAnswer.length - 1] === answer;
            let cssCalsses = '';

            if (answerState === 'answered' && isSelected) {
              cssCalsses = 'selected';
            }
            if (
              (answerState === 'correct' || answerState === 'wrong') &&
              isSelected
            ) {
              cssCalsses = answerState;
            }

            return (
              // give li the base .answer class, and put state class on the button
              <li key={answer} className="answer">
                <button
                  className={cssCalsses}
                  onClick={() => handleSelectAnswer(answer)}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
            </div>
        </div>
    );
}
