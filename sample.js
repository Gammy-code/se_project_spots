modalClose.addEventListener("click", () => {
  closeModal(modalCard);
});
modalOpen.addEventListener("click", () => {
  openModal(modalCard);
});
const modalCard = document.querySelector("#add-card-modal");
const modalClose = modalCard.querySelector(".modal__close-button");
const modalOpen = document.querySelector(".profile__add-button");

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: "" };
  const cardElement = getCardElement(inputValues);
  cardsList.append(cardElement);

  closeModal(modalClose);
}
cardForm.addEventListener("submit", handleAddCardSubmit);
const cardForm = modalCard.querySelector("modal__container");
const cardNameInput = modalCard.querySelector("#add-caption-input");
const cardLinkInput = modalCard.querySelector("#add-card-link");
