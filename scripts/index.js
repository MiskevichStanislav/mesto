" use strict ";

const openEditButtonPopup = document.querySelector('.profile__button-edit');
//const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const closePopupButton = document.querySelector('.popup__close');
const openAddButtonPopup = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_add');
const closePopupButtonAdd = document.querySelector('.popup__close_add');
const popupPic = document.querySelector('.popup_picture');
const popupPicClose = document.querySelector('.popup_picture');
const closePopupButtonPic = document.querySelector('.popup__close_pic');

const formElement = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input-name'); 
const detailInput = document.querySelector('.popup__input-detail'); 
const title = document.querySelector('.profile__id-title');
const subtitle = document.querySelector('.profile__id-subtitle');


//--------------------------------------Отрываем PopUp----------------------------------------------------------------------
function openPopup(popup) {
popup.classList.add('popup_open');
document.addEventListener("keydown", keyCloseEsc);
}

//--------------------------------------Закрываем PopUp-----------------------------------------------------------------
function closePopup(popup) {
popup.classList.remove('popup_open');
document.removeEventListener("keydown", keyCloseEsc);
}

function keyCloseEsc(evt) {
  if (evt.key === 'Escape') {
    const popupCloseEsc = document.querySelector('.popup_open');
    closePopup(popupCloseEsc);
  }
}


/*function closeWithOverlay(evt) {
  const popupOpen = document.querySelector('.popup_open');
  if(evt.target === popupOpen) {
    closePopup(popupOpen);
  }
}
*/

//-----------------------------------Редактирование профиля---------------------------------------------------------
function openPopupEdit() {
    formElement.reset();
    nameInput.value = title.textContent;
    detailInput.value = subtitle.textContent;
    openPopup(popupEdit);
  }
  
  function closePopupEdit() {
    closePopup(popupEdit);
  }
openEditButtonPopup.addEventListener('click', () => openPopupEdit(popupEdit));
closePopupButton.addEventListener('click', () => closePopup(popupEdit));

//----------------------------------Добавление фотографии PopUp----------------------------------------------------------------------------
function openPopupAdd() {
    formElementAdd.reset();
    openPopup(popupAdd);
}

function closePopupAdd() {
    closePopup(popupAdd);
}

openAddButtonPopup.addEventListener('click', () => openPopupAdd(popupAdd));
closePopupButtonAdd.addEventListener('click', () => closePopup(popupAdd));

//-----------------------------------Фотография при нажатии--------------------------------------------------------------------------------------------------------------------------
  
  closePopupButtonPic.addEventListener('click', () => closePopup(popupPic));

//--------------------------------------Редактирование--------------------------------------------------------------------------------------------------------------
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value; 
    subtitle.textContent = detailInput.value;
    closePopup(popupEdit);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

const initialCards = [
    {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1630535879508-9a3a8967d9be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
    },
    {
      name: 'Казань',
      link: 'https://images.unsplash.com/photo-1591996641407-2bb7e90db46a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Владивосток',
      link: 'https://images.unsplash.com/photo-1634887042266-3651a54b9a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Сочи',
        link: 'https://images.unsplash.com/photo-1589783383891-585baca1e191?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
      },
    {
      name: 'Томск',
      link: 'https://cs7.pikabu.ru/post_img/2017/12/22/7/og_og_1513942085292990561.jpg'
    }
   
  ];

  const cards = document.querySelector('.cards').content;
  const cardList = document.querySelector('.pictures__board');
  const inputCardName = document.querySelector('.popup__input_card-name');
  const inputLink = document.querySelector('.popup__input-link');
  const cardButton = document.querySelector('.popup__button_card');
  
  function createCard(card){
    const cardElement = cards.cloneNode(true);
    const cardImages = cardElement.querySelector('.pictures__images');
    const cardTitle = cardElement.querySelector('.pictures__title');
    
    //---------------------------------------Ставим лайк----------------------------------------------------------
    const likeActive = cardElement.querySelector('.pictures__like');
    likeActive.addEventListener('click', addLike);
  
    //-------------------------------удалить добавленную фотографию---------------------------------------------------
    const deleteButton = cardElement.querySelector('.pictures__delete');
    deleteButton.addEventListener('click', deleteCard);
  
    cardImages.addEventListener('click', () => openPopupPic(card));
    cardTitle.textContent = card.name;
    cardImages.alt = card.name
    cardImages.src = card.link;
    return cardElement;
    
  }
  function renderCard(card) { 
    cardList.prepend(createCard(card)); 
    cardButton.classList.add('popup__button_disabled');
    cardButton.setAttribute('disabled', true);
  } 
  
  initialCards.forEach(renderCard);
  
  
  function addItem(event) {
    event.preventDefault();
    closePopupAdd();
    renderCard({name: inputCardName.value, link: inputLink.value});
  }
  
  
  cardButton.addEventListener('click', addItem);
  
//---------------------------------------------------лайк----------------------------------------------- 
function addLike(e) {
    e.target.classList.toggle('pictures__like_active');
}

 
function deleteCard(e) {
  e.target.closest('.pictures__item').remove();
}


const popupOpenPic = document.querySelector('.popup__photo');
const popupOpenTitle = document.querySelector('.popup__photo-title');


function openPopupPic(data) {
 
  openPopup(popupPic);
  popupOpenPic.src = data.link;
  popupOpenPic.alt = data.name;
  popupOpenTitle.textContent = data.name;
}


