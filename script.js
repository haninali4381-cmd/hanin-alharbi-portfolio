/* ==========================================================================
   Hanin Ali Alharbi — Portfolio Scripts
   1. Scroll-reveal: fades in any element with [data-reveal] as it enters view
   2. Certificate carousel: cycles through certificate photos, auto-advancing
      and pausable on hover/manual navigation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (!revealTargets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".cert-showcase .cert-photo")];
  if (!cards.length) return;

  const prevBtn = document.querySelector(".cert-prev");
  const nextBtn = document.querySelector(".cert-next");
  const showcase = document.querySelector(".cert-showcase");
  const total = cards.length;

  let active = 0;
  let timer = null;

  const mod = (n, m) => ((n % m) + m) % m;

  function render() {
    cards.forEach((card, i) => {
      card.classList.remove("is-active", "is-prev", "is-next", "is-far-prev", "is-far-next");
      const distance = mod(i - active, total);
      if (distance === 0) card.classList.add("is-active");
      else if (distance === 1) card.classList.add("is-next");
      else if (distance === total - 1) card.classList.add("is-prev");
      else if (distance === 2) card.classList.add("is-far-next");
      else if (distance === total - 2) card.classList.add("is-far-prev");
    });
  }

  function go(step) {
    active = mod(active + step, total);
    render();
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => go(1), 4500);
  }

  prevBtn?.addEventListener("click", () => {
    go(-1);
    startAutoplay();
  });
  nextBtn?.addEventListener("click", () => {
    go(1);
    startAutoplay();
  });
  showcase?.addEventListener("mouseenter", stopAutoplay);
  showcase?.addEventListener("mouseleave", startAutoplay);

  render();
  startAutoplay();
});


document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let raf = 0;
  let x = -400;
  let y = -400;

  const update = () => {
    document.body.style.setProperty("--cursor-x", `${x}px`);
    document.body.style.setProperty("--cursor-y", `${y}px`);
    raf = 0;
  };

  window.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
    document.body.style.setProperty("--cursor-glow-opacity", "1");
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    document.body.style.setProperty("--cursor-glow-opacity", "0");
  });
});
