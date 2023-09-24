import { VoiceOver } from "@accesslint/voiceover";
import { test as base } from "@playwright/test";

export type TestOptions = {
    voiceOver: VoiceOver;
};

export const test = base.extend<TestOptions>({
    voiceOver: async ({}, use) => {
        const voiceover = new VoiceOver();

        try {
            await voiceover.launch();
            await use(voiceover);
        } finally {
            await voiceover.quit();
        }
    }
});

