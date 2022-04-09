export class UserInfo {

  constructor({ profileNameSelector, profileDetailSelector, avatarSelector }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._detailElement = document.querySelector(profileDetailSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      detail: this._detailElement.textContent,
    };
  }

  setUserInfo(title, detail, avatar) {
    this._nameElement.textContent = title;
    this._detailElement.textContent = detail;
    this._avatar.src = avatar;
    // this._avatar.style.backgroundSize = 'cover';
    // this._avatar.style.backgroundRepeat = 'no-repeat';
    // this._avatar.style.backgroundPosition = 'center center';
  }
}