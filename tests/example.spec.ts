import { expect } from '@playwright/test';
import { test } from "./a11y.config";
import { startInteracting } from "@accesslint/voiceover";

test('has title', async ({ page, voiceOver }) => {
    await page.waitForTimeout(3000)
    await page.goto('/');
    await expect(page).toHaveTitle(/Login/);

    await voiceOver.rotor({ menu: "Window Spots", find: "Content" })
    await voiceOver.execute(startInteracting);

    await voiceOver.advance({ target: { text: "Username", role: "edit text" }, steps: 10 });

    await voiceOver.keyStrokes({ text: "cameron@ckundo.com" });
});

