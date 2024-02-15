import { trpc } from "@/trpc/client";
import { useEffect, useMemo } from "react";
import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { LoadingScreen } from "@/components/LoadingScreen";

const filterDuplicates = <T,>(array: T[], equals: (a: T, b: T) => boolean): T[] => {
    const result: T[] = [];
    for (const item of array) {
        if (result.every((el) => !equals(el, item))) {
            result.push(item);
        }
    }
    return result;
};

const QuizScreen = () => {
    const router = useRouter();
    const sessionId = router.query["session_id"] as string;
    const { mutateAsync: createAnswer, isLoading: isCreatingAnswer } = trpc.answer.create.useMutation();

    const { data: answers } = trpc.answer.list.useQuery({
        sessionId,
    }, {
        enabled: !!sessionId,
    });

    const { data: questionsData } = trpc.question.list.useQuery({
        sessionId,
    }, {
        enabled: !!sessionId,
    });

    const questions = useMemo(
        () => questionsData
            // The API might return the same item twice, this is why this extra filter is here
            ? filterDuplicates(questionsData, (a, b) => a.id === b.id)
            : undefined,
        [questionsData],
    );

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
            <LoadingScreen />
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
                        {`${answers.length + 1} of ${questions.length}`}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        color={"error"}
                        fullWidth
                        variant={"contained"}
                        data-testid={"answer-false-button"}
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
                        data-testid={"answer-true-button"}
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
