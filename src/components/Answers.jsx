import { useRef } from "react";
export default function Answers({answers,selectedAnswer,answerState,onSelect}) {
    const shuffledAnswer = useRef();
      if (!shuffledAnswer.current) {
        shuffledAnswer.current = [...answers];
        shuffledAnswer.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {shuffledAnswer.current.map(answer => {
                const isSelected = selectedAnswer === answer;
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
                            onClick={() => onSelect(answer)}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}