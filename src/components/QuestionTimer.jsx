import { useState, useEffect } from 'react';
export default function QuestionsTimer({ timeOut, onTimeOut }) {
    const [remainingTime, setRemaningTime] = useState(timeOut);

    useEffect(() => {
        const timer = setTimeout(onTimeOut, timeOut);
        return ()=>{
            clearTimeout(timer);
        }
    }, [onTimeOut, timeOut]);


     useEffect(() => {
         const interval = setInterval(() => {
             setRemaningTime(preState =>  preState - 100 );
            }, 100)
            return () =>{
                clearInterval(interval)
            }

        }, [timeOut]);



    return (
        <progress id="question progress" max={timeOut} value= {remainingTime} />
    );
}