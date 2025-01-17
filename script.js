const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix effect setup
const rows = Math.floor(canvas.height / 20);
const drops = Array.from({ length: rows }, () => Math.random() * canvas.width);

const drawMatrix = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = "20px monospace";

  for (let i = 0; i < rows; i++) {
    const text = Math.random() > 0.5 ? "0" : "1";
    ctx.fillText(text, drops[i], i * 20);

    drops[i] -= 20;

    if (drops[i] < 0) {
      drops[i] = canvas.width;
    }
  }
};

// Start matrix effect
setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops.length = rows;
  drops.fill(Math.random() * canvas.width);
});

const sfText = document.querySelector(".sf-container");

// Animation logic
gsap.to(sfText, {
  opacity: 1,
  duration: 1,
  delay: 1,
  onComplete: () => {
    // Transition to numbers forming "STACK FORGE"
    animateTextToWord();
  },
});

function animateTextToWord() {
  let currentText = "";
  const finalText = "STACK FORGE";
  const interval = setInterval(() => {
    if (currentText.length < finalText.length) {
      currentText += Math.random() > 0.5 ? "0" : "1";
      sfText.textContent = currentText;
    } else {
      clearInterval(interval);
      transitionToWord();
    }
  }, 100);
}

function transitionToWord() {
  const finalText = "STACK FORGE";
  let index = 0;

  const interval = setInterval(() => {
    if (index < finalText.length) {
      sfText.textContent =
        finalText.slice(0, index + 1) +
        "1".repeat(finalText.length - index - 1);
      index++;
    } else {
      clearInterval(interval);
      zoomSF();
    }
  }, 150);
}

function zoomSF() {
  // Highlight "STACK FORGE" and zoom in on the "S" and "F"
  sfText.textContent = "S                F";
  sfText.style.fontSize = "90px";

  gsap.to(sfText, {
    fontSize: "400px", // Enlarge to cover the screen
    duration: 4,
    delay: 2,
    onComplete: () => {
      // Transition to the final page
      setupFinalLayout();
    },
  });
}

function setupFinalLayout() {
  // Change the background to white
  document.body.style.backgroundColor = "white";

  // Remove the canvas and text
  canvas.remove();
  sfText.remove();

  // Create a centered logo with an image
  const logo = document.createElement("div");
  const logoImage = document.createElement("img");
  logoImage.src = "StackForge_Circular.png"; // Replace with the path to your image
  logoImage.alt = "STACK FORGE Logo";
  logoImage.style.cssText = `
    width: 500px; /* Adjust size as needed */
    height: auto;
  `;

  logo.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  logo.appendChild(logoImage);
  document.body.appendChild(logo);

  // Create navigation buttons
  const navContainer = document.createElement("div");
  navContainer.style.cssText = `
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const buttons = [
    { text: "About Us", link: "#about-us" },
    { text: "Club Activities", link: "#activities" },
  ];

  buttons.forEach(({ text, link }) => {
    const button = document.createElement("a");
    button.href = link;
    button.className = "nav-button";
    button.textContent = text;
    navContainer.appendChild(button);
  });

  document.body.appendChild(navContainer);
}