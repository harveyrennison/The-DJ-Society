import {
    ENTER_CREDENTIALS_ACCESS_ACCOUNT,
    LOG_IN,
    LOGGING_IN_LOADING,
    NO_ACCOUNT_QUESTION,
    SIGN_UP,
    WELCOME_BACK,
} from "../strings";
import {
    FormatAccountPage,
    type AccountPageNavigationProps,
} from "./FormatAccountPage";

export const LoginPage = ({
    onLogin,
    onSwitch,
}: AccountPageNavigationProps) => {
    return (
        <FormatAccountPage
            onLogin={onLogin}
            onSwitch={onSwitch}
            title={WELCOME_BACK}
            subheader={ENTER_CREDENTIALS_ACCESS_ACCOUNT}
            largeButtonText={LOG_IN}
            smallButtonText={SIGN_UP}
            belowButton={NO_ACCOUNT_QUESTION}
            buttonLoadingText={LOGGING_IN_LOADING}
        />
    );
};
