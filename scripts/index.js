const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editFormElement = document.forms["profile-form"];
const profileDescription = document.querySelector(".profile__description");
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const modalCard = document.querySelector("#add-card-modal");
const cardModalCloseButton = modalCard.querySelector(".modal__close-button");
const cardModalOpenButton = document.querySelector(".profile__add-button");
const cardForm = modalCard.querySelector(".modal__form");
const cardNameInput = modalCard.querySelector("#add-caption-input");
const cardLinkInput = modalCard.querySelector("#add-card-link");
const cardSubmitButton = modalCard.querySelector(".modal__submit-button");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button_type_preview"
);

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

cardModalOpenButton.addEventListener("click", () => {
  openModal(modalCard);
});

profileEditButton.addEventListener("click", () => {
  editModalDescriptionInput.value = profileDescription.textContent;
  editModalNameInput.value = profileName.textContent;
  resetValidation(
    editFormElement,
    [editModalDescriptionInput, editModalNameInput],
    settings
  );
  openModal(editProfileModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", keyHandler);
  modal.addEventListener("mousedown", handleOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", keyHandler);
  modal.removeEventListener("mousedown", handleOverlay);
}

editModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}
editFormElement.addEventListener("submit", handleEditFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardNameEl.textContent = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });
  return cardElement;
}
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}
initialCards.forEach((item) => renderCard(item, "append"));

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  renderCard(inputValues);
  cardsList.prepend(cardElement);
  cardForm.reset();
  closeModal(modalCard);
}
cardForm.addEventListener("submit", handleAddCardSubmit);

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}
