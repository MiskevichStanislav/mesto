const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__error");
  errorElement.classList.remove("popup__error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {
  

    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
 
  if (hasInvalidInput(inputList)) {
 
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.setAttribute('disabled', '');
  } else {
   
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
 
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement); 
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement); 
    });
  });
};



const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_active",
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}


enableValidation(validationConfig);