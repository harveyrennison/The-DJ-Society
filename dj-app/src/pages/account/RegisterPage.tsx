import type { Page } from "../../interfaces/types";
import {
    ACCOUNT_EXISTING_QUESTION,
    CREATE_ACCOUNT,
    CREATE_PORTFOLIO_IN_SECONDS,
    CREATING_ACCOUNT_LOADING,
    JOIN_THE_SOCIETY,
    LOGIN,
    LOGIN_PAGE_NAVIGATION,
} from "../strings";
import { FormatAccountPage } from "./FormatAccountPage";

export const RegisterPage = () => {
    return (
        <FormatAccountPage
            title={JOIN_THE_SOCIETY}
            subheader={CREATE_PORTFOLIO_IN_SECONDS}
            largeButtonText={CREATE_ACCOUNT}
            smallButtonText={LOGIN}
            belowButton={ACCOUNT_EXISTING_QUESTION}
            buttonLoadingText={CREATING_ACCOUNT_LOADING}
            navigationPage={LOGIN_PAGE_NAVIGATION as Page}
            isRegister={true}
        />
    );
};
