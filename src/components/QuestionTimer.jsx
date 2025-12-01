import { useState, useEffect } from 'react';
export default function QuestionsTimer({ timeOut, onTimeOut }) {
    const [remaningTime, setRemaningTime] = useState();

    useEffect(() => {
        setTimeout(onTimeOut, timeOut);

    }, [onTimeOut, timeOut]);
    useEffect(() => {
        setInterval(() => {
            setRemaningTime(preState => { preState - 100 });
        }, 100)
    }, []);



    return (
        <progress id="question progress" max={timeOut} value= {remaningTime} />
    );
}