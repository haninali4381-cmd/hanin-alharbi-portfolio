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


// Professional profile copy: visible character-by-character typing when the section enters view.
document.addEventListener("DOMContentLoaded", () => {
  const targets = [...document.querySelectorAll("[data-typewriter]")];
  if (!targets.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeText(el) {
    if (el.dataset.typed === "true") return;
    el.dataset.typed = "true";

    const text = el.dataset.text || "";
    el.textContent = "";
    el.classList.add("is-typing");

    if (reduced) {
      el.textContent = text;
      el.classList.remove("is-typing");
      el.classList.add("typing-done");
      return;
    }

    let index = 0;

    const typeNext = () => {
      if (index >= text.length) {
        el.classList.remove("is-typing");
        el.classList.add("typing-done");
        return;
      }

      // One real character at a time so the typing motion is clearly visible.
      el.textContent += text[index];
      const ch = text[index];
      index += 1;

      let delay = 26;
      if (/[،؛,:]/.test(ch)) delay = 70;
      if (/[.!؟]/.test(ch)) delay = 115;
      if (ch === " ") delay = 14;

      window.setTimeout(typeNext, delay);
    };

    // Small pause after the section appears before typing begins.
    window.setTimeout(typeNext, 260);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeText(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });

  targets.forEach((el) => observer.observe(el));
});

// Subtle badge tilt inspired by an ID card, without changing its layout position.
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("[data-tilt-card]").forEach((shell) => {
    const card = shell.querySelector(".identity-card");
    if (!card) return;
    shell.addEventListener("mousemove", (e) => {
      const r = shell.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateX(${-py * 7}deg) rotateY(${px * 8}deg) translateY(-2px)`;
    });
    shell.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
});
