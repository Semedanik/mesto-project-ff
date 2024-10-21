import "../pages/index.css";
import { createCard, toggleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  editProfile,
  addCard,
  updateAvatar,
  likeCard,
  dislikeCard,
  deleteCard, 
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

const popupImage = popupNewImage.querySelector(".popup__image");
const popupCaption = popupNewImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const profileForm = document.querySelector(".popup__form[name='edit-profile']");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const placeForm = document.querySelector(".popup__form[name='new-place']");
const avatarForm = document.querySelector(".popup__form[name='avatar-form']");

// Добавить обработчик событий для каждой кнопки
btnCloses.forEach((btnClose) => {
  btnClose.addEventListener("click", (event) => closeModal(event));
});

// Обработчик событий для формы добавления новой карточки
placeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const placeName = placeForm.elements["place-name"].value;
  const placeLink = placeForm.elements["link"].value;

  const submitButton = placeForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  addCard(placeName, placeLink)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        userId,
        deleteCard, // Используем deleteCard из модуля API
        openImagePopup,
        toggleLike
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
function renderCards(cards, userId) {
  cards.forEach((item) => {
    const newCard = createCard(
      item,
      userId,
      deleteCard, // Используем deleteCard из модуля API
      openImagePopup,
      toggleLike
    );
    placesContainer.append(newCard);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const submitButton = profileForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  editProfile(nameInputValue, jobInputValue)
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

// Обработчик событий для кнопки редактирования аватара
const profileAvatarEditButton = document.querySelector(
  ".profile__edit-avatar-button"
);

profileAvatarEditButton.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(avatarForm, validationConfig);
});

// Функция для проверки URL на изображение (опционально)
function isValidImageUrl(url) {
  return fetch(url, { method: "HEAD" })
    .then((response) => {
      if (
        response.ok &&
        response.headers.get("content-type").startsWith("image/")
      ) {
        return true;
      }
      throw new Error("Invalid image URL");
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

// Обработчик событий для формы обновления аватара
avatarForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const avatarLink = avatarForm.elements.avatar.value;

  const isValid = await isValidImageUrl(avatarLink);
  if (!isValid) {
    // Показать ошибку пользователю
    const errorElement = avatarForm.querySelector(".avatar-error");
    errorElement.textContent = "Неверный URL изображения";
    return;
  }

  const submitButton = avatarForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  updateAvatar(avatarLink)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal({ target: popupAvatar });
      avatarForm.reset();
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

// Загрузка данных пользователя и карточек с сервера
let userId;
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    renderCards(cards, userId);
  })
  .catch((err) => {
    console.error(err);
  });
