// @todo: DOM узлы
const placesContainer = document.querySelector(".places__list");

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name; 
  cardTitle.textContent = item.name;
   
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
