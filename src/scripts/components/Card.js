export class Card {
  constructor(data, selectorTemplateCard, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplateCard = selectorTemplateCard;
    this._handleImageClick = handleImageClick;
  }
  //создaет копию template
  _getTemplate() {
    const cardElement = document
    .querySelector(this._selectorTemplateCard)
    .content
    .querySelector(".pictures__item")
    .cloneNode(true);
    return cardElement;
  }
  //создает карточку
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".pictures__title").textContent = this._name;
    this._image = this._element.querySelector(".pictures__images");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setListeners();
    return this._element;
  }
  //   ОБРАБОТЧИКИ ПОПАП ЛАЙК КОРЗИНА
  _setListeners() {
    this._image.addEventListener("click", this._handleImageClick);

    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._element.querySelector(".pictures__like")) {
        evt.target.classList.toggle("pictures__like_active");
      } else if (evt.target === this._element.querySelector(".pictures__delete")) {
        this._element.remove();
      }
    })
  }
}