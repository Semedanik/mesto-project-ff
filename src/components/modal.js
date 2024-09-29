// modal.js

// Функция для открытия попапа
export function openModal(elem) {
  elem.classList.add("popup_is-opened");
}

// Функция для закрытия попапа
export function closeModal(event) {
  const popup = event.target.closest(".popup");
  if (popup) {
    popup.classList.remove("popup_is-opened");
  }
}

// Обработчик событий для клавиатуры
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup_is-opened");
    openPopups.forEach((popup) => {
      popup.classList.remove("popup_is-opened");
    });
  }
});

// Обработчик событий для клика на тёмный фон
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup")) {
    const popup = event.target.closest(".popup");
    if (popup) {
      popup.classList.remove("popup_is-opened");
    }
  }
});
