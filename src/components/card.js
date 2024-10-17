import { deleteCard as deleteCardFromServer, likeCard, dislikeCard } from "./api.js";
import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  item,
  handleDeleteCard,
  openImagePopup,
  handleLikeCard,
  userId
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

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (item.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      openModal(document.querySelector(".popup_type_confirm"));
      document.querySelector(".popup__button_confirm").addEventListener("click", () => {
        handleDeleteCard(item._id, cardElement);
        closeModal(document.querySelector(".popup_type_confirm"));
      }, { once: true });
    });
  }

  // Проверяем, лайкнул ли пользователь карточку
  if (item.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => {
    openImagePopup(item.link, item.name);
  });

  likeButton.addEventListener("click", () => {
    handleLikeCard(
      item._id,
      likeButton.classList.contains("card__like-button_is-active"),
      likeButton,
      likeCount
    );
  });

  return cardElement;
}

export function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function toggleLike(cardId, isLiked, likeButton, likeCount) {
  const likeAction = isLiked ? dislikeCard : likeCard;

  likeAction(cardId)
    .then((cardData) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = cardData.likes.length;
    })
    .catch((err) => {
      console.error(err);
    });
}
