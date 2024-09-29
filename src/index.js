import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// DOM узлы
const placesContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewImage = document.querySelector(".popup_type_image");

const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".profile__add-button");
const btnCloses = document.querySelectorAll(".popup__close");

// Добавить обработчик событий для каждой кнопки
btnCloses.forEach((btnClose) => {
  btnClose.addEventListener("click", closeModal);
});

// Обработчик событий для формы добавления новой карточки
const formPopup = document.querySelector(".popup__form[name='new-place']");
formPopup.addEventListener("submit", (event) => {
  event.preventDefault();

  const placeName = formPopup.elements["place-name"].value;
  const placeLink = formPopup.elements["link"].value;

  const newCard = createCard(
    { name: placeName, link: placeLink },
    deleteCard,
    openImagePopup,
    toggleLike
  );
  placesContainer.prepend(newCard);

  popupNewCard.classList.remove("popup_is-opened");
  formPopup.reset();
});

// Обработчик событий для кнопок редактирования и добавления
btnEdit.addEventListener("click", () => openModal(popupEdit));
btnAdd.addEventListener("click", () => openModal(popupNewCard));

// Функция для открытия попапа с изображением
function openImagePopup(link, name) {
  const popupImage = popupNewImage.querySelector(".popup__image");
  const popupCaption = popupNewImage.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupNewImage);
}

// Вывести карточки на страницу
initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard, openImagePopup, toggleLike);
  placesContainer.append(newCard);
});

// Начало работы формы с редактированием
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
}

formElement.addEventListener("submit", handleFormSubmit);
