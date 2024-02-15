import { trpc } from "@/trpc/client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Button, Card, CardContent, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { z } from "zod";

const QuizScreen = () => {
    const router = useRouter();
    const sessionId = router.query["session_id"] as string;

    const { data: answers } = trpc.answer.list.useQuery({
        sessionId,
    }, {
        enabled: !!sessionId,
    });

    const { data: questions } = trpc.question.list.useQuery();

    const { mutateAsync: createAnswer, isLoading: isCreatingAnswer } = trpc.answer.create.useMutation();

    const currentQuestion = useMemo(
        () => questions?.find((question) => (answers ?? []).every((answer) => answer.questionId !== question.id)),
        [questions, answers],
    );

    useEffect(
        () => {
            // If no more question available, then redirect to result page
            if (!!questions && !currentQuestion) {
                router.push(`/result?session_id=${sessionId}`);
            }
        },
        [router, sessionId, currentQuestion, questions]
    );

    if (!questions || !answers || !currentQuestion) {
        return (
            <div style={{ display: "flex", height: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={64} />
            </div>
        );
    }

    return (
        <Container maxWidth={"md"} sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} align={"center"}>
                        {currentQuestion.category.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant={"h6"} component={"h1"} align={"center"}>
                                {currentQuestion.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography align={"center"}>
                        {`${Object.keys(answers).length + 1} of ${questions?.length}`}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        color={"error"}
                        fullWidth
                        variant={"contained"}
                        disabled={isCreatingAnswer}
                        onClick={() => createAnswer({
                            questionId: currentQuestion.id,
                            sessionId,
                            choice: false,
                        })}
                    >
                        False
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        color={"success"}
                        fullWidth
                        variant={"contained"}
                        disabled={isCreatingAnswer}
                        onClick={() => createAnswer({
                            questionId: currentQuestion.id,
                            sessionId,
                            choice: true,
                        })}
                    >
                        True
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default QuizScreen;
