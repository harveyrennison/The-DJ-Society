import {
    ACCOUNT_EXISTING_QUESTION,
    CREATE_ACCOUNT,
    CREATE_PORTFOLIO_IN_SECONDS,
    CREATING_ACCOUNT_LOADING,
    JOIN_THE_SOCIETY,
    LOG_IN,
} from "../strings";
import {
    FormatAccountPage,
    type AccountPageNavigationProps,
} from "./FormatAccountPage";

export const RegisterPage = ({
    onLogin,
    onSwitch,
}: AccountPageNavigationProps) => {
    return (
        <FormatAccountPage
            onLogin={onLogin}
            onSwitch={onSwitch}
            title={JOIN_THE_SOCIETY}
            subheader={CREATE_PORTFOLIO_IN_SECONDS}
            largeButtonText={CREATE_ACCOUNT}
            smallButtonText={LOG_IN}
            belowButton={ACCOUNT_EXISTING_QUESTION}
            buttonLoadingText={CREATING_ACCOUNT_LOADING}
        />
    );
};
