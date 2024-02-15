import { trpc } from "@/trpc/client";
import { Fragment } from "react";

const HomePage = () => {
    const { data } = trpc.question.list.useQuery();

    return (
        <Fragment />
    );
};

export default HomePage;
