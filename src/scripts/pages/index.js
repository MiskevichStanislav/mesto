import '../../styles/index.css';

import * as constantes from "../utils/constants";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from "../components/Section";
import { PopupWithForm } from "../components/PopupWithForm"
import { PopupWithImage } from "../components/PopupWithImage";
import { UserInfo } from "../components/UserInfo";
import { api } from "../components/Api";

let userId;
let urlAvatar;

Promise.all([api.getProfile(), api.getCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    urlAvatar = res.avatar;
    section.rendererItems(cards);
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message)
    })
  })

const section = new Section(renderCard, '.pictures__board');

const popupWithForm = new PopupWithForm('.popup_add', submitFormAddImage);
const popupEditProfile = new PopupWithForm('.popup_edit', submitFormEditProfile);

const popupWithImage = new PopupWithImage('.popup_picture');

//const confirmPopup = new PopupWithForm('.popup_type_delete-confirm', () => { api.deleteCard(id) })
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
  api.editProfile(name, detail)
    .then(() => {
      userInfo.setUserInfo(name, detail)
    })
  popupEditProfile.close();
}

function submitFormAddImage(data) {
  api.addCard(data.card, data.link)
  .then((res) => {
    section.addItem(createCard(res));
    popupWithForm.close();
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message)
    })
  })
}

function createCard(data) {
  const card = new Card(

    data,

    '.template-card',

    () => {
      popupWithImage.open(data.name, data.link);
    },
    userId,
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
      }
    }
    // (id) => {
    //   confirmPopup.open();
    //   confirmPopup.changeSubmitHandler(() => {
    //     api.deleteCard(id)
    //       .then(res => {
    //         addCardPopup.close()
    //       })
    //   })
    // }
  )            //
  return card.generateCard();
}


function renderCard(data) {
  section.addItem(createCard(data));
}

constantes.openEditButtonPopup.addEventListener('click', openPopupEdit);
constantes.openAddButtonPopup.addEventListener('click', openPopupAdd);


formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();



//confirmPopup.setEventListeners();
popupWithForm.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();