import { expect } from '@playwright/test';
import { test } from "./voiceover.config";
import { startInteracting, activate } from "@accesslint/voiceover";

test.describe("VoiceOver screen reader tests", () => {
    test('shows a dialog @voiceover', async ({ page, voiceOver }) => {
        await page.waitForTimeout(3000)
        await page.goto('/');
        await expect(page).toHaveTitle(/Login/);

        await voiceOver.rotor({ menu: "Window Spots", find: "Content" })
        await voiceOver.execute(startInteracting);

        // WCAG 4.1.2 Name Role Value
        await voiceOver.advance({ target: { text: "invite a friend", role: "button" }, steps: 10 });
        await voiceOver.execute(activate);

        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();

        await expect(await voiceOver.lastPhrase()).toMatch(/email address/i);

        await page.keyboard.press('Escape');

        await expect(dialog).not.toBeVisible();

        const inviteButton = page.getByRole('button');
        await expect(inviteButton).toBeFocused();
    });
});
