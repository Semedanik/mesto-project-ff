import { deleteCard as apiDeleteCard, likeCard, dislikeCard } from "./api"; // Импортируем функции из модуля API

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  item,
  userId,
  deleteCard,
  openImagePopup,
  toggleLike
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeCount.textContent = item.likes.length;

  // Set the data-card-id attribute
  cardElement.firstElementChild.setAttribute("data-card-id", item._id);

  if (item.owner._id === userId) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => deleteCard(item._id));

  cardImage.addEventListener("click", () =>
    openImagePopup(item.link, item.name)
  );

  likeButton.addEventListener("click", () =>
    toggleLike(item._id, likeButton, likeCount)
  );

  if (item.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

export function toggleLike(cardId, likeButton, likeCount) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    likeCard(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
