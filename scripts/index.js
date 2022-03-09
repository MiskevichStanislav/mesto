import {initialCards} from "./initial-card.js";

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
const templateCard = document.querySelector('.template-card').content;
const cardList = document.querySelector('.pictures__board');
const inputCardName = document.querySelector('.popup__input_card-name');
const inputLink = document.querySelector('.popup__input-link');
const popupOpenPic = document.querySelector('.popup__photo');
const popupOpenTitle = document.querySelector('.popup__photo-title');

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
  formElementEdit.reset();
  nameInput.value = title.textContent;
  detailInput.value = subtitle.textContent;
  openPopup(popupEdit);
}

//----------------------------------Добавление фотографии PopUp----------------------------------------------------------------------------
function openPopupAdd() {
  formElementAdd.reset();
  openPopup(popupAdd);
}

function submitFormEditProfile(event) {
  event.preventDefault(); 
  title.textContent = nameInput.value; 
  subtitle.textContent = detailInput.value;
  closePopup(popupEdit);
}

function createCard(card) {
  const cardElement = templateCard.cloneNode(true);
  const cardImages = cardElement.querySelector('.pictures__images');
  const cardTitle = cardElement.querySelector('.pictures__title');
  const likeActive = cardElement.querySelector('.pictures__like');
  likeActive.addEventListener('click', addLike);
  const deleteButton = cardElement.querySelector('.pictures__delete');
  deleteButton.addEventListener('click', deleteCard);
  cardImages.addEventListener('click', () => openPopupPic(card));
  cardTitle.textContent = card.name;
  cardImages.alt = card.name
  cardImages.src = card.link;
  return cardElement;
}

function renderCard(card) { 
  cardList.prepend(createCard(card)); ;
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

function openPopupPic(data) {
  openPopup(popupPic);
  popupOpenPic.src = data.link;
  popupOpenPic.alt = data.name;
  popupOpenTitle.textContent = data.name;
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

initialCards.forEach(renderCard);