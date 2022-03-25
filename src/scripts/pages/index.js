import '../../styles/index.css';

import { initialCards } from "../utils/initial-card";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";

//import { PopupWithForm } from "../components/PopupWithForm";
//import { PopupWithImage } from "../components/PopupWithImage";
import { Section } from "../components/Section";
//import { UserInfo } from "../components/UserInfo";

const openEditButtonPopup = document.querySelector('.profile__button-edit');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const openAddButtonPopup = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_add');
const popupPic = document.querySelector('.popup_picture');
const formElementEdit = document.querySelector('.popup__form_type_profile-edit');
const formElementAdd = document.querySelector('.popup__form_type_image-add');
const nameInput = document.querySelector('.popup__input-name');
const detailInput = document.querySelector('.popup__input-detail');
const title = document.querySelector('.profile__id-title');
const subtitle = document.querySelector('.profile__id-subtitle');
const cardList = document.querySelector('.pictures__board');
const inputCardName = document.querySelector('.popup__input_card-name');
const inputLink = document.querySelector('.popup__input-link');
const popupOpenPic = document.querySelector('.popup__photo');
const popupOpenTitle = document.querySelector('.popup__photo-title');

const validationConfig = {

  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_active",
}
const formElementAddValidator = new FormValidator(validationConfig, formElementAdd);
const formElementEditValidator = new FormValidator(validationConfig, formElementEdit);

/*const userInfo = new UserInfo({
  profileNameSelector: ".profile__id-title",
  profileJobSelector: ".profile__id-subtitle",
});*/

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
  nameInput.value = title.textContent;
  detailInput.value = subtitle.textContent;
  formElementEditValidator.resetErrors(popupEdit);

  openPopup(popupEdit);
}

//----------------------------------Добавление фотографии PopUp----------------------------------------------------------------------------
function openPopupAdd() {
  formElementAdd.reset();

  formElementAddValidator.resetErrors(popupAdd);
  openPopup(popupAdd);
}

function submitFormEditProfile(event) {
  event.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = detailInput.value;
  closePopup(popupEdit);
}

function createCard(data) {
  const card = new Card(data, '.template-card');
  return card.createCard();
}

function renderCard(data) {
  cardList.prepend(createCard(data));
}


function submitFormAddImage(event) {
  event.preventDefault();
  renderCard({name: inputCardName.value, link: inputLink.value});

  closePopup(popupAdd);
}

function addLike(event) {
  event.target.classList.toggle('pictures__like_active');
}

function deleteCard(event) {
  event.target.closest('.pictures__item').remove();
}

function openPopupPic(name, link) {
  popupOpenPic.src = link;
  popupOpenPic.alt = name;
  popupOpenTitle.textContent = name;

  openPopup(popupPic);
}

// -----------------------------Универсальная функция закрытия попап----------------------------

popups.forEach(popup => popup.addEventListener('mousedown', event => {
  if (event.target.classList.contains('popup_open') | event.target.classList.contains('popup__close')) {

    closePopup(popup);
  }
}))


openEditButtonPopup.addEventListener('click', () => openPopupEdit(popupEdit));
formElementAdd.addEventListener('submit', submitFormAddImage);
formElementEdit.addEventListener('submit', submitFormEditProfile);
openAddButtonPopup.addEventListener('click', () => openPopupAdd(popupAdd));
initialCards.forEach(data => renderCard(data));
formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();