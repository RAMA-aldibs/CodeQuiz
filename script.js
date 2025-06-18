// ========== متغيرات عامة ==========
let questions = [
  {
    question: "اي  من الخيارات التالية ليست لغة برمجة",
    options: ["html", "c++", "python", "java"],
    correct: "html"
  },
  {
    question: "ما هو نوع المتغير 'let = 'hello",
    options: ["array", "string", "number", "boolean"],
    correct: "string"
  },
  {
    question: "كيف تُخفي عنصرًا في CSS",
    options: ["display: none", "visibility: hide", "opacity: zero", "hidden: true"],
    correct: "display: none"
  },
  {
    question: "ما الوسم المستخدم لاضافة صورة في html",
    options: ["picture", "src", "image", "img"],
    correct: "img"
  },
  {
    question: "ماهو امتداد ملفات ال jsvascript",
    options: ["js", "java", "css", "html"],
    correct: "js"
  }
];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer = 60;
let interval;
let playerName = "";

// ========== دالة بدء اللعبة ==========
function startGame() {
  const nameInput = document.getElementById("player-name");
  playerName = nameInput.value.trim();
  if (playerName === "") {
    alert("ادخل اسمك أولاً!");
    return;
  }
  showScreen("quiz-screen");
  resetGame();
  loadQuestion();
  startTimer();
}

// ========== دالة إظهار شاشة معينة ==========
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
  // عند عرض شاشة الإحصائيات، اعرض كل النتائج
  if(id === "stats-screen") renderStats();
}

// ========== إعادة تعيين القيم ==========
function resetGame() {
  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  timer = 60;
  document.getElementById("timer").textContent = timer;
  document.getElementById("correct-count").textContent = correctCount;
  document.getElementById("wrong-count").textContent = wrongCount;
}

// ========== تحميل السؤال الحالي ==========
function loadQuestion() {
  if (currentIndex >= questions.length) {
    endGame();
    return;
  }
  const q = questions[currentIndex];
  document.getElementById("question-text").textContent = q.question;
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsContainer.appendChild(btn);
  });
}

// ========== التحقق من الإجابة ==========
function checkAnswer(selected) {
  const correct = questions[currentIndex].correct;
  if (selected === correct) {
    correctCount++;
    document.getElementById("correct-count").textContent = correctCount;
  } else {
    wrongCount++;
    document.getElementById("wrong-count").textContent = wrongCount;
  }
  currentIndex++;
  setTimeout(loadQuestion, 300);
}

// ========== المؤقت ==========
function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = timer;
    if (timer <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

// ========== إنهاء اللعبة وعرض الإحصائيات ==========
function endGame() {
  clearInterval(interval);
  saveStats();
  showScreen("stats-screen");
}

// ========== حفظ نتيجة اللاعب في Local Storage ==========
function saveStats() {
  let stats = JSON.parse(localStorage.getItem("quizStats") || "[]");
  stats.push({
    name: playerName,
    correct: correctCount,
    wrong: wrongCount
  });
  localStorage.setItem("quizStats", JSON.stringify(stats));
}

// ========== عرض جميع النتائج في الجدول ==========
function renderStats() {
  const table = document.getElementById("stats-table");
  table.innerHTML = "";
  let stats = JSON.parse(localStorage.getItem("quizStats") || "[]");
  stats.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.name}</td><td>${entry.correct}</td><td>${entry.wrong}</td>`;
    table.appendChild(row);
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
});