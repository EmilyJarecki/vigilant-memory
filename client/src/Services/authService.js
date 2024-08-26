import * as tokenService from './tokenService'

const BASE_URL = "http://localhost:4000/auth"

function getUser() {
    return tokenService.getUserFromToken()
  }

export {getUser}