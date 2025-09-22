const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

let lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.textContent = `Your score is ${lastScore} out of ${questions.length}.`;
}

function renderQuestions() {
  questionsElement.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", function () {
        userAnswers[i] = this.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

submitBtn.addEventListener("click", function () {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
