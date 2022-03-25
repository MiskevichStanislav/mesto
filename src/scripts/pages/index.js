import '../../styles/index.css';

import * as constantes from "../utils/constants";
import { initialCards } from "../utils/initial-card";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from "../components/Section";
import { PopupWithForm } from "../components/PopupWithForm"
import { PopupWithImage } from "../components/PopupWithImage";
import { UserInfo } from "../components/UserInfo";

const section = new Section({ items: initialCards, renderer: renderCard }, '.pictures__board');
const popupWithForm = new PopupWithForm('.popup_add', submitFormAddImage);
const popupEditProfile = new PopupWithForm('.popup_edit', submitFormEditProfile);
const popupWithImage  = new PopupWithImage('.popup_picture');
const formElementAddValidator = new FormValidator(constantes.validationConfig, constantes.formElementAdd);
const formElementEditValidator = new FormValidator(constantes.validationConfig, constantes.formElementEdit);
const userInfo = new UserInfo({
  profileNameSelector: '.profile__id-title',
  profileDetailSelector: '.profile__id-subtitle'
});

function openPopupEdit() {
  const { name, detail } = userInfo.getUserInfo();
  constantes.nameInput.value = name;
  constantes.detailInput.value = detail;
  formElementEditValidator.resetErrors(constantes.popupEdit);
  popupEditProfile.open();
}

function openPopupAdd() {
  constantes.formElementAdd.reset();
  formElementAddValidator.resetErrors(constantes.popupAdd);
  popupWithForm.open();
}

function submitFormEditProfile(data) {
  const { name, detail } = data;
  userInfo.setUserInfo(name, detail);
  popupEditProfile.close();
}

function submitFormAddImage(data) {
  section.addItem(createCard({
    name: data.card,
    link: data.link
  }));
  popupWithForm.close();
}

function createCard(data) {
  const card = new Card(data, '.template-card', () => {
    popupWithImage.open(data.name, data.link);
  });
  return card.generateCard();
}

function renderCard(data) {
  constantes.cardList.prepend(createCard(data));
}

constantes.openEditButtonPopup.addEventListener('click', openPopupEdit);
constantes.openAddButtonPopup.addEventListener('click', openPopupAdd);

formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();
section.rendererItems();
popupWithForm.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();