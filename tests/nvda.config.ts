import { nvda } from "@guidepup/guidepup";
import { test as base } from "@playwright/test";

export type TestOptions = {
    nvda: typeof nvda;
};

export const test = base.extend<TestOptions>({
    nvda: async ({}, use) => {
        try {
            await nvda.start();
            await use(nvda);
        } finally {
            await nvda.stop();
        }
    }
});

