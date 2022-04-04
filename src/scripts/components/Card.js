export class Card {
  constructor(data, selectorTemplateCard, handleImageClick) {   //handleDeleteClick
    this._name = data.name;
    this._link = data.link;
    // this._likes = data.likes;
    // this._id = data.id;

    this._selectorTemplateCard = selectorTemplateCard;
    this._handleImageClick = handleImageClick;
    // this._handleDeleteClick = handleDeleteClick;
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
    //this._setLikes();
    // if (this._ownerId !== this._userId) {
    //   this._element.querySelector('.pictures__delete').style.display = 'none';
    // };

    return this._element;
  }
  //   ОБРАБОТЧИКИ ПОПАП ЛАЙК КОРЗИНА
  _setLikes() {
    const likeCountElement = this._element.querySelector(".pictures__like-count")
    likeCountElement.textContent = this._likes.length
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.elements__number-likes');
    likeCountElement.textContent = this._likes.length;
    if (this.isLiked()) {
      this._fillLike()
    } else {
      this._removeLike();
    }
  }


  _setListeners() {
    this._image.addEventListener("click", this._handleImageClick);
    //this._element.querySelector('.pictures__delete').addEventListener('click', () => this._handleDeleteClick(this._id));

    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._element.querySelector(".pictures__like")) {
        evt.target.classList.toggle("pictures__like_active");
      } else if (evt.target === this._element.querySelector(".pictures__delete")) {
        this._element.remove();
      }
    })
  }
}