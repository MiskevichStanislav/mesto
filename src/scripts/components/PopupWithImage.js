import { Popup } from "../components/Popup.js";

import { popupOpenPic, popupOpenTitle } from "../utils/constants.js"

export class PopupWithImage extends Popup {
  open(name, link) {
    popupOpenPic.src = link;
    popupOpenPic.alt = name;
    popupOpenTitle.textContent = name;
    super.open();
  }
}