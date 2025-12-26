import {
    CalendarMonth,
    Edit,
    Email,
    Instagram,
    LocationOn,
    Person,
    PlayArrow,
    QueueMusic,
    Search,
    Twitter,
    YouTube,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { DJ, Gig, Track } from "../../interfaces/userTypes";
import {
    BACK_TO_DIRECTORY,
    BOOK_NOW,
    EDIT_PROFILE,
    FOLLOW,
    NO_TRACKS_UPLOADED,
    NO_UPCOMING_GIGS,
    TOP_TRACKS,
    UPCOMING_GIGS,
} from "../strings";

export interface ProfilePageProps {
    dj: DJ;
    onBack: () => void;
    isOwner: boolean;
}

export const ProfilePage = ({ dj, onBack, isOwner }: ProfilePageProps) => {
    // Use optional chaining since tracks/upcoming are optional in the DJ interface
    const tracks: Track[] = dj.tracks || [];
    const upcoming: Gig[] = dj.upcoming || [];

    return (
        <Box sx={{ minHeight: "100vh", pb: 8 }}>
            {/* Cover Image */}
            <Box
                sx={{
                    height: 350,
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src={dj.cover}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.6,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, #0a0b14 0%, transparent 100%)",
                    }}
                />
                <Button
                    startIcon={isOwner ? <Edit /> : <Search />}
                    onClick={onBack}
                    sx={{
                        position: "absolute",
                        top: 100,
                        left: 20,
                        bgcolor: "rgba(0,0,0,0.5)",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                >
                    {isOwner ? EDIT_PROFILE : BACK_TO_DIRECTORY}
                </Button>
            </Box>

            <Container sx={{ mt: -10, position: "relative", zIndex: 2 }}>
                <Grid container spacing={4}>
                    {/* Left Column: Info */}
                    <Grid sx={{ pt: { xs: "12px", md: "4px" } }}>
                        <Card sx={{ p: 3, textAlign: "center" }}>
                            <Avatar
                                src={dj.image}
                                alt={dj.name}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    mx: "auto",
                                    border: "4px solid #0a0b14",
                                    mb: 2,
                                    boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                                }}
                            />
                            <Typography variant="h4" gutterBottom>
                                {dj.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="primary"
                                gutterBottom
                            >
                                {dj.genre}
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={1}
                                color="text.secondary"
                                mb={3}
                            >
                                <LocationOn fontSize="small" />
                                <Typography variant="body2">
                                    {dj.location}
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                mb={3}
                            >
                                <IconButton color="primary">
                                    <Instagram />
                                </IconButton>
                                <IconButton color="primary">
                                    <Twitter />
                                </IconButton>
                                <IconButton color="primary">
                                    <YouTube />
                                </IconButton>
                                <IconButton color="primary">
                                    <Email />
                                </IconButton>
                            </Stack>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mb: 2 }}
                            >
                                {BOOK_NOW}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                            >
                                {FOLLOW}
                            </Button>
                        </Card>
                    </Grid>

                    {/* Right Column: Content */}
                    <Grid sx={{ pt: { xs: "12px", md: "8px" } }}>
                        <Box sx={{ mb: 6 }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Person color="primary" /> About
                            </Typography>
                            <Typography color="text.secondary" lineHeight={1.8}>
                                {dj.bio}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 6 }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 3,
                                }}
                            >
                                <QueueMusic color="primary" />
                                {TOP_TRACKS}
                            </Typography>
                            <Stack spacing={2}>
                                {tracks.map((track, index) => (
                                    <Paper
                                        key={index}
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            bgcolor: "rgba(255,255,255,0.03)",
                                            "&:hover": {
                                                bgcolor:
                                                    "rgba(255,255,255,0.06)",
                                            },
                                        }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                            sx={{ width: 30 }}
                                        >
                                            {index + 1}
                                        </Typography>
                                        <IconButton
                                            color="primary"
                                            sx={{ mr: 2 }}
                                        >
                                            <PlayArrow />
                                        </IconButton>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1">
                                                {track.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {track.plays} plays
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {track.duration}
                                        </Typography>
                                    </Paper>
                                ))}
                                {tracks.length === 0 && (
                                    <Typography color="text.secondary">
                                        {NO_TRACKS_UPLOADED}
                                    </Typography>
                                )}
                            </Stack>
                        </Box>

                        <Box>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 3,
                                }}
                            >
                                <CalendarMonth color="primary" />{" "}
                                {UPCOMING_GIGS}
                            </Typography>
                            <Grid container spacing={2}>
                                {upcoming.map((gig, index) => (
                                    <Grid
                                        sx={{ pt: { xs: "12px", md: "6px" } }}
                                        key={index}
                                    >
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderColor:
                                                    "rgba(245, 0, 87, 0.3)",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Box
                                                    sx={{
                                                        textAlign: "center",
                                                        p: 1,
                                                        bgcolor:
                                                            "rgba(245, 0, 87, 0.1)",
                                                        borderRadius: 1,
                                                        minWidth: 60,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        color="secondary"
                                                        sx={{ lineHeight: 1 }}
                                                    >
                                                        {gig.date.split(" ")[1]}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            textTransform:
                                                                "uppercase",
                                                        }}
                                                    >
                                                        {gig.date.split(" ")[0]}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight="bold"
                                                    >
                                                        {gig.venue}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {gig.city}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                ))}
                                {upcoming.length === 0 && (
                                    <Typography
                                        color="text.secondary"
                                        sx={{ pl: 2 }}
                                    >
                                        {NO_UPCOMING_GIGS}
                                    </Typography>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
