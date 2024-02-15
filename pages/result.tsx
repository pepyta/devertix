import { trpc } from "@/trpc/client";
import { Button, Card, CircularProgress, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { DoneRounded as CorrectIcon, CloseRounded as IncorrectIcon } from "@mui/icons-material";

const QuizScreen = () => {
    const router = useRouter();
    const sessionId = router.query["session_id"] as string;

    const { data: answers } = trpc.answer.list.useQuery({
        sessionId,
    }, {
        enabled: !!sessionId,
    });

    if (!answers) {
        return (
            <div style={{ display: "flex", height: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={64} />
            </div>
        );
    }

    const correctCount = answers.filter((answer) => answer.question.answer === answer.choice).length;
    const totalCount = answers.length;

    return (
        <Container maxWidth={"md"} sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} align={"center"}>
                        You scored
                    </Typography>
                    <Typography variant={"h5"} align={"center"}>
                        {`${correctCount} / ${totalCount}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <List>
                            {answers.map((answer) => (
                                <ListItem>
                                    <ListItemIcon>
                                        {answer.question.answer === answer.choice ? (
                                            <CorrectIcon />
                                        ) : (
                                            <IncorrectIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={answer.question.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={"contained"}
                        fullWidth
                        onClick={() => router.push("/")}
                    >
                        Play again?
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default QuizScreen;
