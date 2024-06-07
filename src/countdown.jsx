import { useState, useEffect } from 'react';
import image2 from "./images/2.png";
import image4 from "./images/4.png";
import image8 from "./images/8.png";
import image24 from "./images/24.png";
import { findExpression } from './algorithm';

const targetTime = new Date(2025, 5, 7, 9).getTime();
let prevDay, prevHr, prevMin = -1;
let prevDayEle, prevHrEle, prevMinEle;

const Countdown = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  function operateNumber(source) {
    const expression = findExpression(source);
    let element = ""
    for (const c of expression) {
      if (c === "2") {
        element += `<img class="time" width="80" height="120" src="${image2}">&nbsp;`
      } else if (c === "4") {
        element += `<img class="time" width="80" height="120" src="${image4}">&nbsp;`
      } else if (c === "8") {
        element += `<img class="time" width="80" height="120" src="${image8}">&nbsp;`
      } else if (c === "*") {
        element += `<span>&nbsp;×&nbsp;</span>`
      } else if (c === "/") {
        element += `<span>&nbsp;÷&nbsp;</span>`
      } else if (c === "1") {
        element += `<img class="time" width="80" height="120" src="${image2}"> ➗ <img class="time" width="80" height="120" src="${image2}">&nbsp;`
      } else if (c === "9") {
        element += `<img class="time" width="80" height="120" src="${image2}"> ➗ <img class="time" width="80" height="120" src="${image2}"> + <img class="time" width="80" height="120" src="${image8}">&nbsp;`
      } else if (c === "7") {
        element += `<img class="time" width="80" height="120" src="${image8}"> ➖ <img class="time" width="80" height="120" src="${image2}"> ➗ <img class="time" width="80" height="120" src="${image2}">&nbsp;`
      } else if (c === "6") {
        element += `<img class="time" width="80" height="120" src="${image2}"> ➕ <img class="time" width="80" height="120" src="${image4}">&nbsp;`
      } else if (c === "5") {
        element += `<img class="time" width="80" height="120" src="${image2}"> ➕ <img class="time" width="80" height="120" src="${image4}">&nbsp;`
      } else if (c === "3") {
        element += `<img class="time" width="80" height="120" src="${image4}"> ➖ <img class="time" width="80" height="120" src="${image2}"> ➗ <img class="time" width="80" height="120" src="${image2}">&nbsp;`
      } else if (c === "0") {
        element += `<img class="time" width="80" height="120" src="${image2}"> ➖ <img class="time" width="80" height="120" src="${image2}">&nbsp;`
      } else {
        element += `<span>&nbsp;${c}&nbsp;</span>`
      }
    }
    return <span dangerouslySetInnerHTML={{ __html:element }} />
  }

  let timeLeft = targetTime - time.getTime();

  if (timeLeft <= 0) {
    return (
      <div>
        <h1>距离25届高考：</h1>
        <p id="blessing">祝各位考生金榜题名！</p>
      </div>
    )
  }

  const days = Math.floor(timeLeft / 86400000);
  timeLeft -= days * 86400000;
  const hours = Math.floor(timeLeft / 3600000);
  timeLeft -= hours * 3600000;
  const minutes = Math.floor(timeLeft / 60000);
  timeLeft -= minutes * 60000;
  const seconds = Math.floor(timeLeft / 1000);

  if (days !== prevDay) {
    prevDayEle = operateNumber(days);
  }
  if (hours !== prevHr) {
    prevHrEle = operateNumber(hours);
  }
  if (minutes !== prevMin) {
    prevMinEle = operateNumber(minutes);
  }

  return (
    <div>
      <h2>25届高考倒计时：</h2>
      {prevDayEle} <span>&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      
      {prevHrEle} <span>&nbsp;时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      
      {prevMinEle} <span>&nbsp;分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      
      {operateNumber(seconds)} <span>&nbsp;秒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>
  );
};

export default Countdown;
