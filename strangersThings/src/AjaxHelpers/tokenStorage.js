export function setToken(token) {
    localStorage.setItem('jwtToken', token);
  }

  
  export function getToken() {
    return localStorage.getItem('jwtToken');
  }
  