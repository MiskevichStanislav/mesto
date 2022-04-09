export class Card {
  constructor(data, selectorTemplateCard, handleImageClick, userId, handleLikeClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._selectorTemplateCard = selectorTemplateCard;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  };
  //создaет копию template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplateCard)
      .content
      .querySelector(".pictures__item")
      .cloneNode(true);
    return cardElement;
  };
  //создает карточку
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".pictures__title").textContent = this._name;
    this._likeCountElement = this._element.querySelector('.pictures__like-count');
    this._likeButton = this._element.querySelector('.pictures__like');
    this._deleteButton = this._element.querySelector('.pictures__delete');
    this._image = this._element.querySelector(".pictures__images");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setListeners();
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.pictures__delete').style.display = 'none';
    };

    return this._element;
  }

  _fillLike() {
    this._likeButton.classList.add('pictures__like_active');
  };

  _removeLike() {
    this._likeButton.classList.remove('pictures__like_active');
  };
  //   ОБРАБОТЧИКИ ПОПАП ЛАЙК КОРЗИНА
  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement
      .textContent = this._likes.length;
    if (this.isLiked()) {
      this._fillLike()
    } else {
      this._removeLike();
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setListeners() {
    this._image.addEventListener("click", this._handleImageClick);
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
  }
}
