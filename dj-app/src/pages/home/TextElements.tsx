import GraphicEq from "@mui/icons-material/GraphicEq";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useUrlBuilder } from "../../context/NavigationContext";
import { GradientText } from "../../theme/theme";
import {
    CREATE_PORTFOLIO,
    EXPLORE_DJS,
    PERFORM,
    SHOWCASE,
    TOP_PLATFORM_FOR_DJS,
    UNITE_CREATE,
} from "../strings";

export const TextElements = () => {
    const { navigate } = useUrlBuilder();
    return (
        <>
            <Chip
                icon={<GraphicEq sx={{ color: "#00e5ff !important" }} />}
                label={TOP_PLATFORM_FOR_DJS}
                variant="outlined"
                sx={{
                    borderColor: "rgba(0, 229, 255, 0.3)",
                    color: "primary.main",
                    mb: 3,
                }}
            />
            <Typography
                variant="h1"
                mb={2}
                sx={{
                    fontSize: { xs: "2.5rem", md: "4.5rem" },
                    lineHeight: 1.1,
                }}
            >
                {UNITE_CREATE} <br />
                <GradientText>{PERFORM}</GradientText>
            </Typography>
            <Typography
                variant="h6"
                color="text.secondary"
                maxWidth="600px"
                fontWeight="400"
                mb={4}
            >
                {SHOWCASE}
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<PlayArrow />}
                    onClick={() => navigate("home")}
                    sx={{ py: 1.5, px: 4 }}
                >
                    {EXPLORE_DJS}
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("signup")}
                    sx={{
                        py: 1.5,
                        px: 4,
                        borderColor: "rgba(255,255,255,0.2)",
                    }}
                >
                    {CREATE_PORTFOLIO}
                </Button>
            </Stack>
        </>
    );
};
