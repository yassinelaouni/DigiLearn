import types from "../actionsTypes";
import produce from "immer";
import helpers from "../../../helpers";


import fakeState from "../../../__test__/fixtures/fakeAuthState"

const initState = {
  token: null,
  user: {},
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case types.userSet:
        draft.user = payload.user;
        break;
      case types.tokenSet:
        draft.token = payload.token;
        break;
      case types.logout:
        draft.token = null;
        draft.user = {};
        break;
      case types.firstNameUpdated:
        const { firstName } = payload;          
        console.log("reducer work avatar : ", firs)

        if (
          !helpers.validator.isEmptyString(firstName)
        ) {
          draft.user.firstName = firstName;
        }
        break;

      case types.lastNameUpdated:
        const { lastName } = payload;
        if (
          !helpers.validator.isEmptyString(lastName)
        ) {
          draft.user.lastName = lastName;
        }
        break;

      case types.avatarUpdated:
        const { avatar } = payload;
        if (
          !helpers.validator.isEmptyString(avatar)
        ) {
          draft.user.avatar = avatar;
        }
        break;
      default:
        break;
    }
  });
};

export default authReducer;
