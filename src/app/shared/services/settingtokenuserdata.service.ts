import { Injectable } from '@angular/core';


export class JwtUserDataService {

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }
  saveUserName(username: string) {
    window.localStorage['username'] = username;
  }

  settingUserType(usertype: String) {
    window.localStorage['usertype'] = usertype;
  }

  // getting data
  getUserType(): String {
    return window.localStorage['usertype'];
  }
  getToken(): String {
    return window.localStorage['jwtToken'];
  }
  getUserName(): String {
    return window.localStorage['username'];
  }


  // destroying everything
  destroyUserType() {
    window.localStorage.removeItem('usertype');

  }
  destroyUserName() {
    window.localStorage.removeItem('username');
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
