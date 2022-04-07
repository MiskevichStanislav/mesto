import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector,) { 
    super(popupSelector);
    this._popupOpenTitle = this._popup.querySelector('.popup__photo-title');
    this._popupOpenPic = this._popup.querySelector('.popup__photo');
  }

  open(name, link) {
    this._popupOpenPic.src = link;
    this._popupOpenPic.alt = name;
    this._popupOpenTitle.textContent = name;
    super.open();
  }
}