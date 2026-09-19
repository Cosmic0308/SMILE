const opening = document.getElementById("opening");
const level1 = document.getElementById("level1");

const startBtn = document.getElementById("startBtn");
const openLevel2 = document.getElementById("openLevel2");

function showScene(currentScene, nextScene) {
  currentScene.classList.remove("active");
  nextScene.classList.add("active");
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

let smilesCaught = 0;

smile.addEventListener("click", function () {
  smilesCaught++;
  catchCounter.textContent = "Smiles caught: " + smilesCaught + " / 5";

  if (smilesCaught < 5) {
    moveSmile();
  } else {
    smile.textContent = "✨";
    catchCounter.textContent = "You caught it! ✨ Now just hold it as it is!";
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

    projectile.classList.add(
        "spell-projectile",
        "spell-" + spell
    );

    spellEffect.appendChild(projectile);

    setTimeout(function () {
        projectile.remove();
    }, 500);
}
