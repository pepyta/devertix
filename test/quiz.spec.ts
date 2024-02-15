import { test, expect } from "@playwright/test";

test("Complete the quiz", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("start-game-button").click();

    const NUMBER_OF_QUESTIONS = 5;
    for(let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
        await page.getByTestId("answer-true-button").click();
    }

    await expect(page.getByTestId("result-text")).toContainText(`${NUMBER_OF_QUESTIONS}`);

    await page.getByTestId("play-again-button").click();

    await expect(page.getByTestId("start-game-button")).toBeVisible();
});
