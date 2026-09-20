const opening = document.getElementById("opening");
const level1 = document.getElementById("level1");

const startBtn = document.getElementById("startBtn");
const openLevel2 = document.getElementById("openLevel2");

function showScene(currentScene, nextScene) {
  const transition = document.getElementById("sceneTransition");

  transition.classList.add("transitionActive");

  setTimeout(function () {
    currentScene.classList.remove("active");
    nextScene.classList.add("active");
  }, 500);

  setTimeout(function () {
    transition.classList.remove("transitionActive");
  }, 1200);
}

/* Opening → Level 1 */
startBtn.addEventListener("click", function () {
  showScene(opening, level1);
});

/* Level 1 → Level 2 */
openLevel2.addEventListener("click", function () {
  showScene(level1, document.getElementById("level2"));
});

/* Level 2 - Catch the Smile */

const smile = document.getElementById("smile");
const catchCounter = document.getElementById("catchCounter");

const meterFill = document.getElementById("meterFill");
const meterText = document.getElementById("meterText");
const smileMessage = document.getElementById("smileMessage");

let smilesCaught = 0;

const smileMessages = [
  "✨ Smile detected...",
  "💛 There's another one...",
  "🌟 There it is. Keep smiling.",
  "🪄 One more...",
  "❤️ Smile meter: FULL. There you are. ✨",
];

smile.addEventListener("click", function () {
  smilesCaught++;

  /* Update Smilelometer */
  const percentage = (smilesCaught / 5) * 100;

  meterFill.style.width = percentage + "%";
  meterText.textContent = smilesCaught + " / 5";

  /* Show small message */
  smileMessage.textContent = smileMessages[smilesCaught - 1];

  catchCounter.textContent = "Smiles caught: " + smilesCaught + " / 5";

  if (smilesCaught < 5) {
    moveSmile();
  } else {
    smile.textContent = "✨";

    catchCounter.textContent = "You caught it! ✨ Now just hold it as it is!";

    smileMessage.textContent = "❤️ Smile meter: FULL. There you are. ✨";

    document.getElementById("smilemessage").style.display = "flex";

    document.getElementById("level2").classList.add("completed");
  }
});

function moveSmile() {
  const area = document.getElementById("smileArea");

  const maxX = area.clientWidth - 70;
  const maxY = area.clientHeight - 70;

  const randomX = Math.random() * maxX + 35;
  const randomY = Math.random() * maxY + 35;

  smile.style.left = randomX + "px";
  smile.style.top = randomY + "px";
}

const nextChapterBtn = document.getElementById("nextChapterBtn");

nextChapterBtn.addEventListener("click", function () {
  showScene(
    document.getElementById("level2"),
    document.getElementById("level3")
  );
});
/* Level 3 */

const level3 = document.getElementById("level3");
const level3Sparkle = document.getElementById("level3Sparkle");
const magicKey = document.getElementById("magicKey");
const takeKeyBtn = document.getElementById("takeKeyBtn");

/* Level 3 Easter Egg */

const cornerKey = document.getElementById("cornerKey");
const cornerKeyMessage = document.getElementById("cornerKeyMessage");

let cornerKeyClicks = 0;

cornerKey.addEventListener("click", function () {
  cornerKeyClicks++;

  if (cornerKeyClicks === 1) {
    cornerKeyMessage.textContent = "Smile more to earn this one too. ✨";
  } else {
    cornerKeyMessage.textContent =
      "There you go… it's all yours now, Parkhi. 🔑✨";

    cornerKey.style.opacity = "1";
  }

  cornerKeyMessage.style.opacity = "1";
});

level3Sparkle.addEventListener("click", function () {
  level3.classList.add("key-found");
});

takeKeyBtn.addEventListener("click", function () {
  showScene(level3, document.getElementById("level4"));
});

/* Level 4 */

const unlockBtn = document.getElementById("unlockBtn");
const finalChapterBtn = document.getElementById("finalChapterBtn");

unlockBtn.addEventListener("click", function () {
  document.getElementById("level4").classList.add("unlocked");
});

finalChapterBtn.addEventListener("click", function () {
  showScene(
    document.getElementById("level4"),
    document.getElementById("level5")
  );
});

/* Level 4 Easter Egg */

const magicDoor = document.getElementById("magicDoor");
const doorEasterMessage = document.getElementById("doorEasterMessage");

magicDoor.addEventListener("click", function () {
  doorEasterMessage.textContent =
    "Trying to open it manually? Cute. Click the button, Queen. 👑😭";

  doorEasterMessage.style.opacity = "1";
});

/* ---------------- LEVEL 5 ---------------- */

let bossHealth = 3;
const spellButtons = document.querySelectorAll(".spellBtn");
const bossHealthBar = document.getElementById("bossHealthBar");
const boss = document.getElementById("boss");
const battleMessage = document.getElementById("battleMessage");
const bossDefeated = document.getElementById("bossDefeated");

spellButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const spell = button.dataset.spell;

    castSpell(spell);
  });
});

function castSpell(spell) {
  // 25% chance to dodge
  const dodgeChance = 0.25;

  if (Math.random() < dodgeChance) {
    showTrollMessage();
    return;
  }

  createSpellEffect(spell);
  bossHealth--;

  bossHealthBar.style.width = (bossHealth / 3) * 100 + "%";

  if (spell === "expelliarmus") {
    battleMessage.textContent = "Expelliarmus! ✨";
  } else if (spell === "incendio") {
    battleMessage.textContent = "Incendio! 🔥";
  } else if (spell === "avada") {
    battleMessage.textContent = "Avada Kedavra! 🟢";
  }

  boss.style.transform = "translate(-50%, -50%) scale(1.15)";

  setTimeout(function () {
    boss.style.transform = "translate(-50%, -50%) scale(1)";
  }, 250);

  if (bossHealth <= 0) {
    defeatBoss();
  }
}

function showTrollMessage() {
  const trollMessages = [
    "Was that supposed to hit me?",
    "Parkhi… respectfully, WHAT was that? 😂",
    "Parkhi.exe has stopped casting spells",
    "Parkhi… was that supposed to scare me? 😂",
    "Parkhi… that was adorable. 😂",
  ];

  const randomIndex = Math.floor(Math.random() * trollMessages.length);

  battleMessage.textContent = trollMessages[randomIndex];
}

function defeatBoss() {
  spellButtons.forEach(function (button) {
    button.disabled = true;
  });

  boss.style.opacity = "0";
  battleMessage.textContent = "The final spell has been cast... ✨";

  setTimeout(function () {
    bossDefeated.style.display = "block";
  }, 700);
}

function createSpellEffect(spell) {
  const spellEffect = document.getElementById("spellEffect");

  const projectile = document.createElement("div");

  projectile.classList.add("spell-projectile", "spell-" + spell);

  spellEffect.appendChild(projectile);

  setTimeout(function () {
    projectile.remove();
  }, 500);
}

/* Level 5 Easter Egg */

boss.addEventListener("click", function () {
  battleMessage.textContent = "Stop touching me. 😭";
});

playerWizard.addEventListener("click", function () {
  battleMessage.textContent = "Stop touching me. 😭";
});

const finalMessageBtn = document.getElementById("finalMessageBtn");

finalMessageBtn.addEventListener("click", function () {
  showScene(
    document.getElementById("level5"),
    document.getElementById("finalScene")
  );
});

/* ---------------- MAGIC WAND CURSOR ---------------- */

const wandCursor = document.getElementById("wandCursor");
const wandSparkle = document.getElementById("wandSparkle");

document.addEventListener("mousemove", function (event) {
  wandCursor.style.left = event.clientX + "px";
  wandCursor.style.top = event.clientY + "px";

  wandSparkle.style.left = event.clientX - 12 + "px";
  wandSparkle.style.top = event.clientY + 12 + "px";

  wandSparkle.style.opacity = "1";

  wandSparkle.style.transform = "translate(-50%, -50%) scale(1)";
});

document.addEventListener("click", function (event) {
  wandSparkle.style.left = event.clientX + "px";
  wandSparkle.style.top = event.clientY + "px";

  wandSparkle.style.opacity = "0";

  wandSparkle.style.transform = "translate(-50%, -50%) scale(2.5)";
});

/* ---------------- HOGWARTS LOADING SCREEN ---------------- */

window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loadingScreen");

  setTimeout(function () {
    loadingScreen.classList.add("loadingDone");
  }, 10000);
});
