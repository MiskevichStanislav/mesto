" use strict ";

const openEditButtonPopup = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');



function openPopup() {
    popup.classList.add('popup_open');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function closePopup() {
popup.classList.remove('popup_open');

}


openEditButtonPopup.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name'); 
let jobInput = document.querySelector('.popup__input_type_job'); 
let title = document.querySelector('.profile__id-title');
let subtitle = document.querySelector('.profile__id-subtitle');


function formSubmitHandler (evt) {
    evt.preventDefault(); 
  
title.textContent = nameInput.value; 
subtitle.textContent = jobInput.value;

closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
