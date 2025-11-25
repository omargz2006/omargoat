const QUESTIONS = [
  {
    q: "Qu’est-ce qu’une structure d’entreprise ?",
    choices: [
      "Une stratégie commerciale",
      "La manière d’organiser le travail et les responsabilités",
      "Un document financier"
    ],
    a: 1
  },
  {
    q: "Quel est le rôle principal de la structure de l’entreprise ?",
    choices: [
      "Augmenter les bénéfices",
      "Organiser les vacances des employés",
      "Clarifier les responsabilités et coordonner le travail"
    ],
    answer: 2
  },
  {
    q: "Quel élément fait partie des composantes de la structure ?",
    choices: [
      "Les règles et procédures",
      "Les clients",
      "Les fournisseurs"
    ],
    a: 0
  },
  {
    q: "Quel facteur influence le choix d’une structure ?",
    choices: [
      "Le nom de l’entreprise",
      "La taille de l’entreprise",
      "La couleur du logo"
    ],
    a: 1
  },
  {
    q: "Une petite entreprise adopte généralement :",
    choices: [
      "Une structure simple",
      "Une structure matricielle",
      "Une structure divisionnelle"
    ],
    a: 0
  },
  {
    q: "Dans une structure hiérarchique, chaque employé dépend de :",
    choices: [
      "Deux responsables",
      "Un seul supérieur",
      "Aucun supérieur"
    ],
    a: 1
  },
  {
    q: "Quel est l’avantage de la structure hiérarchique ?",
    choices: [
      "Très flexible",
      "Communication rapide",
      "Autorité claire"
    ],
    a: 2
  },
  {
    q: "La structure fonctionnelle organise l’entreprise selon :",
    choices: [
      "Les pays",
      "Les produits",
      "Les fonctions (marketing, finance, RH…)"
    ],
    a: 2
  },
  {
    q: "Quel est le principal inconvénient de la structure fonctionnelle ?",
    choices: [
      "Elle coûte cher",
      "Manque de communication entre services",
      "Trop de flexibilité"
    ],
    a: 1
  },
  {
    q: "Une structure matricielle combine :",
    choices: [
      "Structure hiérarchique et structure fonctionnelle",
      "Structure commerciale et structure géographique",
      "Structure virtuelle et structure divisionnelle"
    ],
    a: 0
  },
  {
    q: "Dans la structure matricielle, un employé peut avoir :",
    choices: [
      "Aucun responsable",
      "Deux responsables",
      "Trois responsables"
    ],
    a: 1
  },
  {
    q: "La structure divisionnelle organise l’entreprise selon :",
    choices: [
      "Les goûts du directeur",
      "Les produits, les régions ou les marchés",
      "L’âge des employés"
    ],
    a: 1
  },
  {
    q: "Quel est un avantage de la structure divisionnelle ?",
    choices: [
      "Autonomie des divisions",
      "Simplicité",
      "Faible coût"
    ],
    a: 0
  },
  {
    q: "L’entreprise virtuelle fonctionne principalement grâce :",
    choices: [
      "Aux outils numériques et au travail à distance",
      "Au travail manuel uniquement",
      "À l’absence de communication"
    ],
    a: 0
  },
  {
    q: "Quelle adaptation est nécessaire pour les entreprises virtuelles ?",
    choices: [
      "Plus de niveaux hiérarchiques",
      "Plus de flexibilité et une bonne communication digitale",
      "Éliminer les technologies"
    ],
    a: 1
  }
];


let state = {
  index: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  finished: false,
};

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const currentEl = document.getElementById("current");
const progEl = document.getElementById("prog");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const highscoreEl = document.getElementById("highscore");

highscoreEl.textContent = localStorage.getItem("quiz_highscore_v1") || 0;

function render() {
  const qObj = QUESTIONS[state.index];
  currentEl.textContent = state.index + 1;
  questionEl.textContent = qObj.q;
  progEl.style.width = (state.index / (QUESTIONS.length - 1)) * 100 + "%";

  choicesEl.innerHTML = "";
  qObj.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    if (state.answers[state.index] === i) btn.classList.add("selected");

    btn.onclick = () => {
      state.answers[state.index] = i;
      [...choicesEl.children].forEach((c) => c.classList.remove("selected"));
      btn.classList.add("selected");
    };
    choicesEl.appendChild(btn);
  });

  prevBtn.disabled = state.index === 0;
  nextBtn.disabled = state.index === QUESTIONS.length - 1;
  resultEl.style.display = state.finished ? "block" : "none";
}

prevBtn.onclick = () => {
  if (state.index > 0) {
    state.index--;
    render();
  }
};
nextBtn.onclick = () => {
  if (state.index < QUESTIONS.length - 1) {
    state.index++;
    render();
  }
};

submitBtn.onclick = () => {
  state.finished = true;
  let score = 0;
  QUESTIONS.forEach((q, i) => {
    if (state.answers[i] === q.a) score++;
  });
  localStorage.setItem(
    "quiz_highscore_v1",
    Math.max(score, parseInt(localStorage.getItem("quiz_highscore_v1") || 0))
  );
  highscoreEl.textContent = localStorage.getItem("quiz_highscore_v1");
  resultEl.innerHTML = `<h2 style = "font-size : 35px;">Score: ${score}/${QUESTIONS.length}</h2><button id="retry" onclick="resetQuiz()">Réessayer</button>`;
  render();
};

function resetQuiz() {
  state.index = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  state.finished = false;
  render();
}

render();
const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.4; 

function startMusicOnce() {
  bgMusic.play().catch(() => {});
  window.removeEventListener("click", startMusicOnce);
}

window.addEventListener("click", startMusicOnce);
