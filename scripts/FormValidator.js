export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._validationConfig;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }
  _hideInputError(inputElement){
    const { inputErrorClass, errorClass } = this._validationConfig;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  disableSubmitButton(buttonElement) {
    const { inactiveButtonClass } = this._validationConfig;
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {  
    if (this._hasInvalidInput()) {  
      this._disableSubmitButton();
    } else {  
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(); 
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }

  resetErrors() {
    this.form.reset();
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
    this._toggleButtonState(inputList, buttonElement);
  }
}