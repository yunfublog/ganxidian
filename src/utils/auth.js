import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  const str = localStorage.getItem('zz-user')
  if (str) {
    return JSON.parse(str)
  } else {
    return {}
  }
}

export function setUser(user) {
  localStorage.setItem('zz-user', JSON.stringify(user))
}

export function removeUser() {
  localStorage.removeItem('zz-user')
}
