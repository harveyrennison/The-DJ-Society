import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { HeroSection } from "../../theme/theme";
import { ImageElements } from "./ImageElements";
import { TextElements } from "./TextElements";

export const HomePage = () => {
    return (
        <HeroSection>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid>
                        <TextElements />
                    </Grid>
                    <Grid>
                        <ImageElements />
                    </Grid>
                </Grid>
            </Container>
        </HeroSection>
    );
};
