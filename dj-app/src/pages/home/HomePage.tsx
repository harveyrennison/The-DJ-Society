import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import type { Page } from "../../interfaces/types";
import { HeroSection } from "../../theme/theme";
import { ImageElements } from "./ImageElements";
import { TextElements } from "./TextElements";

export interface HomePageProps {
    onNavigate: (page: Page) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
    return (
        <HeroSection>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid>
                        <TextElements onNavigate={onNavigate} />
                    </Grid>
                    <Grid>
                        <ImageElements />
                    </Grid>
                </Grid>
            </Container>
        </HeroSection>
    );
};
