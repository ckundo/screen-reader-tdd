import { nvda, windowsActivate, windowsRecord } from "@guidepup/guidepup";
import { test as base } from "@playwright/test";
import { join } from "path";

export type TestOptions = {
    nvda: typeof nvda;
};

export const test = base.extend<TestOptions>({
    nvda: async ({}, use) => {
        let stopRecording:() => void;

        try {
            const recordingPath = join(__dirname, `../recordings/playwright-nvda-firefox-${+new Date()}.mp4`);
            await nvda.start();
            stopRecording = windowsRecord(recordingPath);
            await use(nvda);
        } finally {
            stopRecording();
            await nvda.stop();
        }

    }
});

