import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";

// DOM узлы
const placesContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewImage = document.querySelector(".popup_type_image");

const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloses = document.querySelectorAll(".popup__close");

const popupImage = popupNewImage.querySelector(".popup__image");
const popupCaption = popupNewImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

  const newCard = createCard(
    { name: placeName, link: placeLink },
    deleteCard,
    openImagePopup,
    toggleLike
  );
  placesContainer.prepend(newCard);

  closeModal({ target: popupNewCard });

  placeForm.reset();
});

// Обработчик событий для кнопок редактирования и добавления
btnEdit.addEventListener("click", () => {
  fillProfileInputs();
  openModal(popupEdit);
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
initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard, openImagePopup, toggleLike);
  placesContainer.append(newCard);
});

const profileForm = document.querySelector(".popup__form");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  closeModal({ target: popupEdit });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
