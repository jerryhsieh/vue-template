
const emptyPromise = function() {
  return new Promise((resolve) => {resolve(null);})
}

const isTokenExist = function(token) {
  if (localStorage.getItem(token)) {
    return true;
  } else if (sessionStorage.getItem(token)) {
    return true;
  } else {
    return false;
  }
}

const getToken = function(token) {
  if (localStorage.getItem(token)) {
    return localStorage.getItem(token);
  } else if (sessionStorage.getItem(token)) {
    return sessionStorage.getItem(token);
  } else {
    return null;
  }
}

const removeToken = function(token) {
  if (localStorage.getItem(token)) {
    localStorage.removeItem(token);
  } else if (sessionStorage.getItem(token)){
    sessionStorage.removeItem(token);
  }
}

const writeToken = function (isLocal, token, value) {
  if (isLocal)  {
    localStorage.setItem(token, value);
  } else {
    sessionStorage.setItem(token, value);
  }
}

const jwt = function(token) {
  let tokenVal = this.getToken(token);
  return {headers: {Authorization: 'Bearer ' + tokenVal}};
}


export default {
  emptyPromise: emptyPromise,
  isTokenExist: isTokenExist,
  removeToken: removeToken,
  writeToken: writeToken,
  getToken: getToken,
  jwt: jwt
}

