import * as tokenService from './tokenService'

function getUser() {
    return tokenService.getUserFromToken()
  }

  function logout() {
    tokenService.removeToken()
  }


export {getUser, logout }