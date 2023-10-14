import { expect } from '@playwright/test';
import { test } from "./nvda.config";

test.describe("NVDA screen reader tests", () => {
    test('shows a dialog @nvda', async ({ page, nvda }) => {
        await page.waitForTimeout(3000)
        await page.goto('/');
        await expect(page).toHaveTitle(/Login/);

        await nvda.perform(nvda.keyboardCommands.exitFocusMode);
        await nvda.press("Tab");
        await nvda.click();

        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();

        const announcement = await nvda.lastSpokenPhrase();
        await expect(announcement).toMatch(/email address/i);

        await page.keyboard.press('Escape');

        await expect(dialog).not.toBeVisible();

        const inviteButton = page.getByRole('button');
        await expect(inviteButton).toBeFocused();
    });
});
