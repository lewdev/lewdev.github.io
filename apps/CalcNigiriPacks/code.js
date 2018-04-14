var nigiriValue = document.getElementById("nigiriValue")
  , spicyValue = document.getElementById("spicyValue")
  , tekkaValue = document.getElementById("tekkaValue")
  , spicyNakaochiValue = document.getElementById("spicyNakaochiValue")
  , nigiriInput = document.getElementById("nigiriInput")
  , spicyInput = document.getElementById("spicyInput")
  , tekkaInput = document.getElementById("tekkaInput")
  , problemNumber = document.getElementById("problemNumber")
  , answerHistory = document.getElementById("answerHistory")
  , message = document.getElementById("message")
  , problems = [
    {
      nigiriValue : 0
    , spicyValue : 0
    , tekkaValue : 0
    , spicyNakaochiValue : 0
    }
  ]
  , totalProblems = 5
  , correctAnswerCount = 0
  , currentIndex = 0
;

window.onload = function() {
  message.innerHTML = '';
  // generate problems
  var i;
  problems = [];
  for (i = 0; i < totalProblems; i++) {
    var problem = {
      nigiriValue : genRandom(300, 0)
    , spicyValue : genRandom(5, 2)
    , tekkaValue : genRandom(10, 0)
    , spicyNakaochiValue : genRandom(10, 2)
    };
    problems.push(problem);
  }
  console.log(problems);
  // start problem
  setUpProblem(currentIndex);
};

function genRandom(maxValue, precision) {
  return precisionRound(Math.random() * maxValue, precision);
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function setUpProblem(index) {
  nigiriInput.value = '';
  spicyInput.value = '';
  tekkaInput.value = '';
  problemNumber.innerHTML = index + 1 + " of " + totalProblems;
  nigiriValue.innerHTML = problems[index].nigiriValue;
  spicyValue.innerHTML = problems[index].spicyValue;
  tekkaValue.innerHTML = problems[index].tekkaValue;
  spicyNakaochiValue.innerHTML = problems[index].spicyNakaochiValue;
  nigiriInput.focus();
}

function submitInputs() {
  nigiriInput.style.borderColor = (nigiriInput.value == '' ? 'red' : 'black');
  spicyInput.style.borderColor = (spicyInput.value == '' ? 'red' : 'black');
  tekkaInput.style.borderColor = (tekkaInput.value == '' ? 'red' : 'black');
  if (nigiriInput.value == ''
    || spicyInput.value == ''
    || tekkaInput.value == '') {
    message.innerHTML = "Please fill all fields!";
    return;
  }
  var problem = problems[currentIndex];
  console.log("submit totals");
  message.innerHTML = '';
  var nigiriAnswer = problem.nigiriValue / 20
    , spicyAnswer = problem.spicyValue + problem.spicyNakaochiValue
    , tekkaAnswer = problem.tekkaValue
    , isNigiriCorrect = nigiriInput.value == nigiriAnswer
    , isSpicyCorrect = spicyInput.value == spicyAnswer
    , isTekkaCorrect = tekkaInput.value == tekkaAnswer
    , isAllCorrect = isNigiriCorrect && isSpicyCorrect && isTekkaCorrect
    , tr = document.createElement("tr")
    , indexCell = document.createElement("td")
    , nigiriCell = document.createElement("td")
    , spicyCell = document.createElement("td")
    , tekkaCell = document.createElement("td")
    , checkCell = document.createElement("td")
  ;
  indexCell.innerHTML = currentIndex + 1;
  nigiriCell.innerHTML = printAnswer(nigiriInput.value, nigiriAnswer);
  spicyCell.innerHTML = printAnswer(spicyInput.value, spicyAnswer);
  tekkaCell.innerHTML = printAnswer(tekkaInput.value, tekkaAnswer);
  checkCell.innerHTML = isAllCorrect ? "<span style='color:green;'>O</span>" : "<span style='color:red;'>X</span>";
  tr.appendChild(indexCell);
  tr.appendChild(nigiriCell);
  tr.appendChild(spicyCell);
  tr.appendChild(tekkaCell);
  tr.appendChild(checkCell);
  answerHistory.appendChild(tr);
  correctAnswerCount += isAllCorrect ? 1 : 0;

  message.innerHTML = "Answered " + correctAnswerCount + " of " + totalProblems + " problems correct.";

  if (currentIndex < totalProblems - 1) {
    setUpProblem(++currentIndex);
  }
  else {
    message.innerHTML = "DONE! Answered " + correctAnswerCount + " of " + totalProblems + " problems correct.";
  }
}

function printAnswer(input, answer) {
  if (input == answer) {
    return "<span style='color:green;'>" + answer + "</span>";
  }
  else {
    return "<span style='color:red;'>" + input + "</span> (Correct answer: <span style='color:green;'>" + answer + "</span>)";
  }
}
