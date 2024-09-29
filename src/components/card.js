// card.js

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(item, deleteCard, openImagePopup, toggleLike) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", deleteCard);

  cardImage.addEventListener("click", () =>
    openImagePopup(item.link, item.name)
  );

  likeButton.addEventListener("click", toggleLike);

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// Функция для переключения лайка
export function toggleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
