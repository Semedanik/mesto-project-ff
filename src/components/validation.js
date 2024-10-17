// Функция для включения валидации форм
export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

// Функция для установки обработчиков событий на форму
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config);
    }, 0);
  });
}

// Функция для проверки валидности поля ввода
function checkInputValidity(form, inputElement, config) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, errorElement, config);
  } else {
    hideInputError(form, inputElement, errorElement, config);
  }
}

// Функция для показа ошибки валидации
function showInputError(form, inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция для скрытия ошибки валидации
function hideInputError(form, inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// Функция для переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция для очистки ошибок валидации
export function clearValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    hideInputError(form, inputElement, errorElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}
