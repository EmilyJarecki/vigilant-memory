import { jwtDecode } from "jwt-decode";

function setToken(token) {
  localStorage.setItem('token', token)
}

function getToken() {
  let token = localStorage.getItem('token')
  if (token) {
    const payload = jwtDecode(token)
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      token = null
    }
  } else {
    localStorage.removeItem('token')
  }
  return token
}

function getUserFromToken() {
  const token = getToken()
  return token ? jwtDecode(token).id : null
}

function removeToken() {
  localStorage.removeItem('token')
}

export { setToken, getToken, getUserFromToken, removeToken }