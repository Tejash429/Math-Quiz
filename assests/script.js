'use strict';

let ans;
const html = document.querySelector('.html');
const sub = document.querySelector('.sub');
const question = document.querySelector('.question');
const newq = document.querySelector('.new');
const hint = document.querySelector('.hint');
const input = document.getElementById('answer');
const form = document.getElementById('math');

function doMath(op, a, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
  }
}

function random() {
  const operators = ['+', '-', '*', '/'];
  const a = Math.trunc(Math.random() * 20) + 1;
  const b = Math.trunc(Math.random() * 20) + 1;
  const randomOperator =
    operators[Math.floor(Math.random() * operators.length)];

  question.innerHTML = `what is ${a} ${randomOperator} ${b} ?`;

  const tempAns = doMath(randomOperator, a, b);
  const isFloat = !Number.isInteger(tempAns) ? true : false;
  const result = isFloat === true ? +tempAns.toFixed(2) : tempAns;
  ans = result;

  if (sub.addEventListener) {
    sub.addEventListener('submit', onSubmit(result));
  } else if (sub.attachEvent) {
    sub.attachEvent('onsubmit', onSubmit(result));
  }

  return result;
}

function onSubmit(result) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userAns = +input.value;

    if (isNaN(userAns)) {
      alert('Enter Answer');
    } else {
      const bool = result === userAns ? true : false;

      if (bool) {
        html.style.background = '#34a853';
        setTimeout(function () {
          html.style.background =
            'linear-gradient(90deg, #485563 10%, #29323c 90%)';
        }, 1000);

        input.value = '';

        random();
      } else {
        html.style.background = '#dc3545';
        setTimeout(function () {
          html.style.background =
            'linear-gradient(90deg, #485563 10%, #29323c 90%)';
        }, 1000);
      }
    }
  });
}

function answer() {
  if (!document.querySelector('.correctAnswer')) {
    question.innerHTML +=
      "<div class='text-center correctAnswer'>The Answer is " + ans + '</div>';
  } else {
    document.querySelector('.correctAnswer').remove();
  }
}
