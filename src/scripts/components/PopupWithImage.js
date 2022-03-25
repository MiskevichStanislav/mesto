import { Popup } from "./components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(text, link) {
    const image = this._popup.querySelector(".popup__photo");
    const caption = this._popup.querySelector(".popup__photo-title");

    image.src = link;
    caption.textContent = text;

    super.open();
  }
}


/*popup__photo
popup__photo-title
const popup = new PopupWithImage();

popup.close();
popup.open();
*/