import { all } from "redux-saga/effects";

import addWebsite from "./addWebsite";
import changePassword from "./changePassword";
import changePhone from "./changePhone";
import changeStatus from "./changeStatus";
import deleteWebsite from "./deleteWebsite";
import generateApiKey from "./generateApiKey";
import get from "./get";
import updateWebsite from "./updateWebsite";
import remove from "./remove";

export default function* ratingSaga() {
    yield all([
        addWebsite(),
        changePassword(),
        changePhone(),
        changeStatus(),
        deleteWebsite(),
        // generateApiKey(),
        get(),
        remove(),
        updateWebsite(),
    ]);
}