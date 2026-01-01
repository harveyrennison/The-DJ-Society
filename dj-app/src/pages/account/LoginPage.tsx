import type { Page } from "../../interfaces/types";
import {
    ENTER_CREDENTIALS_ACCESS_ACCOUNT,
    LOGGING_IN_LOADING,
    LOGIN,
    NO_ACCOUNT_QUESTION,
    REGISTER_PAGE_NAVIGATION,
    SIGN_UP,
    WELCOME_BACK,
} from "../strings";
import { FormatAccountPage } from "./FormatAccountPage";

export const LoginPage = () => {
    return (
        <FormatAccountPage
            title={WELCOME_BACK}
            subheader={ENTER_CREDENTIALS_ACCESS_ACCOUNT}
            largeButtonText={LOGIN}
            smallButtonText={SIGN_UP}
            belowButton={NO_ACCOUNT_QUESTION}
            buttonLoadingText={LOGGING_IN_LOADING}
            navigationPage={REGISTER_PAGE_NAVIGATION as Page}
        />
    );
};
