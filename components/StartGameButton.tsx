import { trpc } from "@/trpc/client";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/router";

export type StartGameButtonProps = Partial<ButtonProps>;

export const StartGameButton = (props: StartGameButtonProps) => {
    const router = useRouter();
    const { mutateAsync, isLoading } = trpc.session.create.useMutation();

    const createSession = async () => {
        const session = await mutateAsync();
        router.push(`/quiz?session_id=${session.id}`);
    };
    
    return (
        <Button
            variant={"contained"}
            disabled={isLoading}
            onClick={createSession}
            data-testid={"start-game-button"}
            {...props}
        >
            Begin
        </Button>
    );
};
