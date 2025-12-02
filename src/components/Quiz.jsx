import { useState, useCallback } from 'react'
import QUESTIONS from '../QUESTIONS.js';
import summaryLogo from '../assets/quiz-complete.png'
import Answers from './Answers.jsx'
import QuestionTimer from './QuestionTimer.jsx'

export default function Quiz() {
    
    const [userAnswer, setUserAnswer] = useState([]);
    const [answerState, setAnswerState] = useState('');
    let activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;
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

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            }
            else {
                setAnswerState('wrong');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)

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
  
    return (
        <div id='quiz'>
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeOut={10000}
                    onTimeOut={handleSkipAnser}
                />

                <h2> {QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers 
                    key={activeQuestionIndex*2}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    selectedAnswer={userAnswer[userAnswer.length - 1]}
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                    />
            </div>
        </div>
    );
}
