export function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("click", closeByOverlay);
}

export function closeModal(event) {
  const popup = event.target.closest(".popup");
  if (popup) {
    popup.classList.remove("popup_is-opened");
  }
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("click", closeByOverlay);
}

export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal({ target: openedPopup });
    }
  }
}

function closeByOverlay(event) {
  if (event.target.classList.contains("popup")) {
    const popup = event.target.closest(".popup");
    if (popup) {
      closeModal({ target: popup });
    }
  }
}

