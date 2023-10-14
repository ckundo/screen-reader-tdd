import { nvda, windowsActivate, windowsRecord, WindowsKeyCodes, WindowsModifiers } from "@guidepup/guidepup";
import { test as base } from "@playwright/test";
import { join } from "path";

export type TestOptions = {
    nvda: typeof nvda;
};

export const test = base.extend<TestOptions>({
    nvda: async ({}, use) => {
        let stopRecording:() => void;

        try {
            const firefoxPath = join(__dirname, "../node_modules/playwright-core/.local-browsers/firefox-1424/firefox/firefox.exe");
            const recordingPath = join(__dirname, `../recordings/playwright-nvda-firefox-${+new Date()}.mp4`);
            await nvda.start();
            await windowsActivate(firefoxPath, "Firefox");
            stopRecording = windowsRecord(recordingPath);

            while (true) {
                await nvda.perform({
                    keyCode: [WindowsKeyCodes.Tab],
                    modifiers: [WindowsModifiers.Alt],
                });

                const lastSpokenPhrase = await nvda.lastSpokenPhrase();

                if (lastSpokenPhrase.includes("Firefox")) {
                    break;
                }
            }

            await use(nvda);
        } finally {
            stopRecording();
            await nvda.stop();
        }

    }
});

