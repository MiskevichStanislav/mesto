import '../../styles/index.css';

import * as constantes from "../utils/constants";
import { initialCards } from "../utils/initial-card";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";

import { Section } from "../components/Section";
const section = new Section({ items: initialCards, renderer: renderCard }, '.pictures__board');
//import { PopupWithForm } from "../components/PopupWithForm";
//import { PopupWithImage } from "../components/PopupWithImage";
//import { UserInfo } from "../components/UserInfo";

const formElementAddValidator = new FormValidator(constantes.validationConfig, constantes.formElementAdd);
const formElementEditValidator = new FormValidator(constantes.validationConfig, constantes.formElementEdit);

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener("keydown", keyCloseEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener("keydown", keyCloseEsc);
}

function keyCloseEsc(event) {
  if (event.key === 'Escape') {
    const popupCloseEsc = document.querySelector('.popup_open');
   closePopup(popupCloseEsc);
  }
}

function openPopupEdit() {
  constantes.nameInput.value = constantes.title.textContent;
  constantes.detailInput.value = constantes.subtitle.textContent;
  formElementEditValidator.resetErrors(constantes.popupEdit);

  openPopup(constantes.popupEdit);
}

//----------------------------------Добавление фотографии PopUp----------------------------------------------------------------------------
function openPopupAdd() {
  constantes.formElementAdd.reset();

  formElementAddValidator.resetErrors(constantes.popupAdd);
  openPopup(constantes.popupAdd);
}

function submitFormEditProfile(event) {
  event.preventDefault();
  constantes.title.textContent = constantes.nameInput.value;
  constantes.subtitle.textContent = constantes.detailInput.value;
  closePopup(constantes.popupEdit);
}

function createCard(data) {
  const card = new Card(data, '.template-card');
  return card.createCard();
}

function renderCard(data) {
  constantes. cardList.prepend(createCard(data));
}


function submitFormAddImage(event) {
  event.preventDefault();
  renderCard({name: constantes.inputCardName.value, link:constantes.inputLink.value});

  closePopup(constantes.popupAdd);
}

function addLike(event) {
  event.target.classList.toggle('pictures__like_active');
}

function deleteCard(event) {
  event.target.closest('.pictures__item').remove();
}

function openPopupPic(name, link) {
  constantes.popupOpenPic.src = link;
  constantes.popupOpenPic.alt = name;
  constantes.popupOpenTitle.textContent = name;

  openPopup(constantes.popupPic);
}

// -----------------------------Универсальная функция закрытия попап----------------------------

constantes.popups.forEach(popup => popup.addEventListener('mousedown', event => {
  if (event.target.classList.contains('popup_open') | event.target.classList.contains('popup__close')) {

    closePopup(popup);
  }
}))


constantes.openEditButtonPopup.addEventListener('click', () => openPopupEdit(constantes.popupEdit));
constantes.formElementAdd.addEventListener('submit', submitFormAddImage);
constantes.formElementEdit.addEventListener('submit', submitFormEditProfile);
constantes.openAddButtonPopup.addEventListener('click', () => openPopupAdd(constantes.popupAdd));
initialCards.forEach(data => renderCard(data));
formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();