// @todo: DOM узлы
const placesContainer = document.querySelector(".places__list");
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const newCard = createCard(item, deleteCard);
  placesContainer.append(newCard);
});
