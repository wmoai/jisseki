import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../store';

import {CHANGE_LOGIN_STATE, changeLoginState} from '../actions/user';
import {Middleware, MiddlewareAPI, Dispatch} from 'redux';
import {State} from '../reducers';

export const app = firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: '',
});

const ui =
  firebaseui.auth.AuthUI.getInstance() ||
  new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
});

firebase.auth().onAuthStateChanged(user => {
  const {dispatch} = store;
  if (user) {
    dispatch(changeLoginState(user.uid));
  } else {
    dispatch(changeLoginState(null));
  }
});

export const db = firebase.firestore();
