import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DJS } from "../../data/mockData";
import BComPhoto from "../../images/bcomhide.jpg";
import FoundryPhoto from "../../images/foundry.jpg";

export const ImageElements = () => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(245,0,87,0.2) 0%, rgba(0,229,255,0.1) 50%, transparent 70%)",
                    filter: "blur(40px)",
                    animation: "pulse 4s infinite",
                }}
            />
            <Card
                sx={{
                    position: "relative",
                    width: 320,
                    height: 420,
                    transform: "rotate(-5deg)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        transform: "rotate(0deg) scale(1.05)",
                        zIndex: 10,
                    },
                }}
            >
                <CardMedia
                    component="img"
                    height="420"
                    image={FoundryPhoto}
                    alt="DJ"
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background:
                            "linear-gradient(to top, black, transparent)",
                    }}
                >
                    <Typography variant="h6">{DJS[0].name}</Typography>
                </Box>
            </Card>
            <Card
                sx={{
                    position: "relative",
                    width: 320,
                    height: 420,
                    ml: -15,
                    mt: 10,
                    transform: "rotate(5deg)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        transform: "rotate(0deg) scale(1.05)",
                        zIndex: 10,
                    },
                }}
            >
                <CardMedia
                    component="img"
                    height="420"
                    image={BComPhoto}
                    alt="DJ"
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background:
                            "linear-gradient(to top, black, transparent)",
                    }}
                >
                    <Typography variant="h6">{DJS[0].name}</Typography>
                </Box>
            </Card>
        </Box>
    );
};
