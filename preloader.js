(() => {
  const preloaderStyles = `
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: radial-gradient(900px 700px at 20% 10%, #2a163f 0%, transparent 60%),
    linear-gradient(135deg, var(--bg) 0%, var(--bg-deep) 100%);
  transition: opacity 0.6s ease, visibility 0.6s ease;
}

.preloader.hide {
  opacity: 0;
  visibility: hidden;
}

.preloader-content {
  display: grid;
  place-items: center;
  gap: 1.2rem;
  text-align: center;
}

.preloader-logo {
  width: min(180px, 60vw);
  height: auto;
  border-radius: 16px;
  filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.55));
  animation: preloader-pulse 2.2s ease-in-out infinite;
}

.preloader-bar {
  width: min(220px, 70vw);
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  position: relative;
}

.preloader-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, var(--gold), var(--magenta), transparent);
  transform: translateX(-60%);
  animation: preloader-sweep 1.8s ease-in-out infinite;
}

.preloader-text {
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

@keyframes preloader-pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.04);
  }
}

@keyframes preloader-sweep {
  0% {
    transform: translateX(-70%);
  }

  100% {
    transform: translateX(70%);
  }
}
`;

  const style = document.createElement("style");
  style.textContent = preloaderStyles;
  document.head.appendChild(style);

  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.id = "preloader";
  preloader.setAttribute("aria-label", "Loading");
  preloader.innerHTML = `
    <div class="preloader-content">
      <img src="logo.png" alt="GraphCarry logo" class="preloader-logo" />
      <div class="preloader-bar" aria-hidden="true"></div>
      <div class="preloader-text">Loading GraphCarry</div>
    </div>
  `;

  if (document.body) {
    document.body.prepend(preloader);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.prepend(preloader);
    });
  }

  window.addEventListener("load", () => {
    const target = document.getElementById("preloader");
    if (!target) return;
    setTimeout(() => {
      target.classList.add("hide");
      setTimeout(() => target.remove(), 900);
    }, 2500);
  });
})();
