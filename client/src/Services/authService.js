import * as tokenService from './tokenService'

function getUser() {
    return tokenService.getUserFromToken()
  }


export {getUser }