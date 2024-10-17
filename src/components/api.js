const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "fe092b0c-102d-4587-92ce-49a4ec67b845",
    "Content-Type": "application/json",
  },
};

// Функция для проверки ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция для получения информации о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для получения начальных карточек
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для обновления информации о пользователе
export function updateUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(checkResponse);
}

// Функция для добавления новой карточки
export function addNewCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(checkResponse);
}

// Функция для удаления карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для постановки лайка
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для снятия лайка
export function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для обновления аватара пользователя
export function updateAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then(checkResponse);
}
