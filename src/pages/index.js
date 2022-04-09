import '../pages/index.css';

import * as constantes from "../scripts/utils/constants";
import { Card } from "../scripts/components/Card";
import { FormValidator } from "../scripts/components/FormValidator";
import { Section } from "../scripts/components/Section";
import { PopupWithForm } from "../scripts/components/PopupWithForm"
import { PopupWithImage } from "../scripts/components/PopupWithImage";
import { UserInfo } from "../scripts/components/UserInfo";
import { api } from "../scripts/components/Api";

let userId;

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
  avatarSelector: '.profile__avatar'
});

function openPopupEdit() {
  const { name, detail } = userInfo.getUserInfo();
  constantes.nameInput.value = name;
  constantes.detailInput.value = detail;
  formElementEditValidator.resetErrors();
  popupEditProfile.open();
}

function openPopupAdd() {
  formElementAddValidator.resetErrors();
  popupWithForm.open();
}
function OpenPopupEditAvatar() {
  formAvatarEditValidator.resetErrors();
  popupEditAvatar.open();
}

function submitEditAvatarForm({ link }) {
  api.editAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    })
};

function submitFormEditProfile({ name, detail }) {
  api.editProfile(name, detail)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupEditProfile.close();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
}

function submitFormAddImage({ card, link }) {
  api.addCard(card, link)
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
      popupWithForm.renderLoading(false);
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

          .finally(() => {
            popupDeleteCard.renderLoading(false);
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