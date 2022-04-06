import { Popup } from "../components/Popup.js";

import { popupOpenPic, popupOpenTitle } from "../utils/constants.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  
  open(name, link) {
    popupOpenPic.src = link;
    popupOpenPic.alt = name;
    popupOpenTitle.textContent = name;
    super.open();
  }
}