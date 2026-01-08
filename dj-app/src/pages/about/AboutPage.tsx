import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { GradientText, HeroSection } from "../../theme/theme";

export const AboutPage = () => {
    return (
        <HeroSection>
            <Container maxWidth="lg">
                <Typography
                    variant="h1"
                    textAlign="center"
                >
                    <GradientText>Our Story</GradientText>
                </Typography>
                <Typography
                    variant="h6"
                    textAlign="center"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6, opacity: 0.9 }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                </Typography>
            </Container>
        </HeroSection>
    );
};
