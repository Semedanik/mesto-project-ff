export function openModal(elem) {
  elem.classList.add("popup_is-opened");
}

export function closeModal(event) {
  const popup = event.target.closest(".popup");
  if (popup) {
    popup.classList.remove("popup_is-opened");
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup_is-opened");
    openPopups.forEach((popup) => {
      popup.classList.remove("popup_is-opened");
    });
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup")) {
    const popup = event.target.closest(".popup");
    if (popup) {
      popup.classList.remove("popup_is-opened");
    }
  }
});
