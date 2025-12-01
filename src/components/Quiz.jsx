import { useState, useCallback } from 'react'
import QUESTIONS from '../QUESTIONS.js';
import summaryLogo from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'
export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswer.length;
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length;


    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswer((prevState) => {
            return [...prevState, selectedAnswer,];
        });
    }, []);
    const handleSkipAnser = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quisIsComplete) {
        return (
            <div id="summary">
                <img src={summaryLogo} alt="" />
                <h2>quiz completed</h2>
            </div>
        );
    }
    const shaffledArray = [...QUESTIONS[activeQuestionIndex].answers];
    shaffledArray.sort(() => Math.random() - 0.5);

    return (
        <div id='quiz'>
            <div id="questions">
                
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeOut={1000}
                    onTimeOut={handleSkipAnser}
                />

                <h2> {QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shaffledArray.map((answer) => {
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
