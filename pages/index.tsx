import { StartGameButton } from "@/components/StartGameButton";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

const HomePage = () => {
    return (
        <Container maxWidth={"sm"} sx={{ p: 4 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                gutterBottom
                                variant={"h5"}
                                component={"h1"}
                                align={"center"}
                            >
                                Welcome to the Trivia Challenge!
                            </Typography>
                            <Typography
                                align={"center"}
                            >
                                You will be peresnted with 10 True or False questions.
                            </Typography>
                            <Typography
                                align={"center"}
                            >
                                Can you score 100%?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <StartGameButton fullWidth />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default HomePage;
