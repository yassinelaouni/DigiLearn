import fakeAuthState from "../../__test__/fixtures/fakeAuthState"

export default function isOldPassword(password) {
  if (password === null) return false;
  return password === fakeAuthState().user.password;
}
