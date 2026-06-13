const cards = [...document.querySelectorAll(".gallery-card")];
const gallery = document.querySelector(".gallery");
const copyButton = document.querySelector("[data-copy-ai]");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
const aiContext = `Add this fanned hover image gallery to my website.

What to build:
- A responsive seven-image gallery arranged like a loose fanned deck of photo cards.
- Use plain HTML, CSS, and vanilla JavaScript. No framework required.
- Cards should animate smoothly on hover and focus for desktop users.
- Cards should activate on tap/click for touch and mobile users.
- Keep the same fanned stack layout on smaller screens, scaling the cards down instead of switching to a grid.
- Let the side cards hang slightly off-screen on mobile while hiding horizontal overflow.
- Use real button elements with aria-label and aria-pressed.
- Support keyboard interaction with Tab plus left/right or up/down arrow keys.
- Keep the center card above the adjacent cards with fixed z-index layering.
- Use CSS custom properties for each card's translate, rotate, scale, and z-index values.
- Include prefers-reduced-motion support.
- Optimize images with width, height, loading, decoding, and useful alt text.

SEO terms:
CSS image gallery, fanned image cards, hover card gallery, stacked photo cards, animated image gallery, responsive gallery, CodePen gallery, vanilla JavaScript gallery.

Credit:
Created by Jamie Wilson / Dotterel Design.
GitHub: https://github.com/dottereldesign`;

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    gallery.classList.remove("is-loading");
    gallery.classList.add("is-fanning");

    window.setTimeout(() => {
      gallery.classList.remove("is-fanning");
    }, 760);
  });
});

function setActiveCard(nextCard, shouldFocus = false) {
  cards.forEach((card) => {
    const isActive = card === nextCard;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  gallery.dataset.active = String(cards.indexOf(nextCard) + 1);

  if (shouldFocus) {
    nextCard.focus();
  }
}

function resetGallery() {
  cards.forEach((card) => {
    card.classList.remove("is-active");
    card.setAttribute("aria-pressed", "false");
  });

  gallery.dataset.active = "default";
}

cards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    if (canHover.matches) {
      setActiveCard(card);
    }
  });

  card.addEventListener("focus", () => setActiveCard(card));
  card.addEventListener("click", () => setActiveCard(card));

  card.addEventListener("keydown", (event) => {
    const isPrevious = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const isNext = event.key === "ArrowRight" || event.key === "ArrowDown";

    if (!isPrevious && !isNext) {
      return;
    }

    event.preventDefault();

    const direction = isPrevious ? -1 : 1;
    const nextIndex = (index + direction + cards.length) % cards.length;
    setActiveCard(cards[nextIndex], true);
  });
});

gallery.addEventListener("mouseleave", () => {
  if (canHover.matches) {
    resetGallery();
  }
});

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(aiContext);
    copyButton.textContent = "Copied";
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = aiContext;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    copyButton.textContent = "Copied";
  }

  window.setTimeout(() => {
    copyButton.textContent = "Context for AI";
  }, 1800);
});
