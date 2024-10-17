import "../pages/index.css";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  likeCard,
  dislikeCard,
  updateAvatar,
} from "./api.js";

// DOM узлы
const placesContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");

const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloses = document.querySelectorAll(".popup__close");
const btnEditAvatar = document.querySelector(".profile__edit-avatar-button");

const popupImage = popupNewImage.querySelector(".popup__image");
const popupCaption = popupNewImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Добавить обработчик событий для каждой кнопки
btnCloses.forEach((btnClose) => {
  btnClose.addEventListener("click", (event) => closeModal(event));
});

// Обработчик событий для формы добавления новой карточки
const placeForm = document.querySelector(".popup__form[name='new-place']");
placeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const placeName = placeForm.elements["place-name"].value;
  const placeLink = placeForm.elements["link"].value;
  const submitButton = placeForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  addNewCard({ name: placeName, link: placeLink })
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        handleDeleteCard,
        openImagePopup,
        handleLikeCard,
        userId
      );
      placesContainer.prepend(cardElement);
      closeModal({ target: popupNewCard });
      placeForm.reset();
      clearValidation(placeForm, validationConfig);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
});

// Обработчик событий для кнопок редактирования и добавления
btnEdit.addEventListener("click", () => {
  fillProfileInputs();
  openModal(popupEdit);
  clearValidation(profileForm, validationConfig);
});
btnAdd.addEventListener("click", () => openModal(popupNewCard));
btnEditAvatar.addEventListener("click", () => openModal(popupAvatar));

// Функция для открытия попапа с изображением
function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupNewImage);
}

// Функция заправления профиля
function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Вывести карточки на страницу
const initialCards = [];

initialCards.forEach((item) => {
  const newCard = createCard(
    item,
    handleDeleteCard,
    openImagePopup,
    handleLikeCard,
    userId
  );
  placesContainer.append(newCard);
});

const profileForm = document.querySelector(".popup__form");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const submitButton = profileForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  updateUserInfo({ name: nameInputValue, about: jobInputValue })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal({ target: popupEdit });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Обработчик формы обновления аватара
const avatarForm = document.querySelector(".popup__form[name='avatar-form']");
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarInput = avatarForm.elements.avatar;
  const submitButton = avatarForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  updateAvatar({ avatar: avatarInput.value })
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal({ target: popupAvatar });
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
});

// Настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включение валидации
enableValidation(validationConfig);

// Загрузка данных с сервера
let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((item) => {
      const newCard = createCard(
        item,
        handleDeleteCard,
        openImagePopup,
        handleLikeCard,
        userId
      );
      placesContainer.append(newCard);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId, cardElement)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}

// Обработчик лайка карточки
function handleLikeCard(cardId, isLiked, likeButton, likeCount) {
  toggleLike(cardId, isLiked, likeButton, likeCount);
}
