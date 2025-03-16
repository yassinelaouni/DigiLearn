import config from "../../config.json";

export default function parseUser({ user }) {
  let parsedUser = {};

  if (user?.profile?.split("/").length === 1) {
    parsedUser = { ...user, profile: `${config.apiUrl}/${user.profile}` };
  } else parsedUser = user;

  if (user?.identity) {
    if (user.identity.front?.split("/").length === 1)
      parsedUser = {
        ...parsedUser,
        identity: {
          ...user.identity,
          front: `${config.apiUrl}/${user.identity.front}`,
        },
      };

    if (user.identity.back?.split("/").length === 1)
      parsedUser = {
        ...parsedUser,
        identity: {
          ...parsedUser.identity,
          back: `${config.apiUrl}/${user.identity.back}`,
        },
      };
  }

  return parsedUser;
}
