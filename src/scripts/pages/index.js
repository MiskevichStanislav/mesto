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

const section = new Section(renderCard, '.pictures__board');

const popupWithForm = new PopupWithForm('.popup_add', submitFormAddImage);
const popupEditProfile = new PopupWithForm('.popup_edit', submitFormEditProfile);
const popupWithImage = new PopupWithImage('.popup_picture');
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', submitEditAvatarForm);
const popupDeleteCard = new PopupWithForm('.popup_type_delete-confirm');


const formElementAddValidator = new FormValidator(constantes.validationConfig, constantes.formElementAdd);
const formElementEditValidator = new FormValidator(constantes.validationConfig, constantes.formElementEdit);
const formAvatarEditValidator = new FormValidator(constantes.validationConfig, constantes.formAvatarEdit);

const userInfo = new UserInfo({
  profileNameSelector: '.profile__id-title',
  profileDetailSelector: '.profile__id-subtitle',
  avatarSelector: '.profile__id-photo'
});

function openPopupEdit() {
  const { name, detail } = userInfo.getUserInfo();
  constantes.nameInput.value = name;
  constantes.detailInput.value = detail;
  formElementEditValidator.resetErrors(constantes.popupEdit);
  popupEditProfile.open();
}

function openPopupAdd() {
  formElementAddValidator.resetErrors(constantes.popupAdd);
  popupWithForm.open();
}
function OpenPopupEditAvatar(){
  formAvatarEditValidator.resetErrors(constantes.popupAvatar);
  popupEditAvatar.open();
}

function submitEditAvatarForm(data, buttonSubmit) {
  api.editAvatar(data.link, buttonSubmit)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      urlAvatar = res.avatar;
      popupEditAvatar.close();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => {
      api.renderLoading(false, buttonSubmit);
    })
};

function submitFormEditProfile(data, buttonSubmit) {
  const { name, detail } = data;
  api.editProfile(name, detail, buttonSubmit)
    .then(() => {
      userInfo.setUserInfo(name, detail);
      popupEditProfile.close();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => {
      api.renderLoading(false, buttonSubmit);
    })
}

function submitFormAddImage(data, buttonSubmit) {
  api.addCard(data.card, data.link, buttonSubmit)
  .then((res) => {
    section.addItem(createCard(res));
    popupWithForm.close();
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message)
    })
  })
  .finally(() => {
    api.renderLoading(false, buttonSubmit);
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
    },

    (id) => {
      popupDeleteCard.open();
      popupDeleteCard.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            err.then((res) => {
              console.log(res.message)
            })
          })
      });
    }
  )
  return card.generateCard();
}

function renderCard(data) {
section.addItem(createCard(data));
}

Promise.all([api.getProfile(), api.getCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id;
    urlAvatar = res.avatar;
    section.rendererItems(cards);
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message)
    })
  })

constantes.openEditButtonPopup.addEventListener('click', openPopupEdit);
constantes.openAddButtonPopup.addEventListener('click', openPopupAdd);
constantes.buttonOpenPopupEditAvatar.addEventListener('click', OpenPopupEditAvatar);

formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();
formAvatarEditValidator.enableValidation();

popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithForm.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();