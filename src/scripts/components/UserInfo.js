export class UserInfo {

  constructor({ profileNameSelector, profileDetailSelector }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._detailElement = document.querySelector(profileDetailSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      detail: this._detailElement.textContent,
    };
  }

  setUserInfo(title, detail) {
    this._nameElement.textContent = title;
    this._detailElement.textContent = detail;
  }
}