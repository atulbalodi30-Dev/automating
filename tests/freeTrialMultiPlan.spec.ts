import { test } from '@playwright/test';
import { runFreeTrialFlow, TestFlowConfig } from '../utils/free-trial-runner';

// MONTHLY billing flows. Yearly flows live in freeTrialYearly.spec.ts
const TEST_FLOWS: TestFlowConfig[] = [
  // No-card trial: no plan is selected in this flow (the 'plan' value is only written to the CSV)
  {
    testTitle: 'Flow 1: Free Trial WITHOUT Card (LaunchPad - No Card)',
    plan: 'launchpad',
    flowType: 'no-card',
    billing: 'monthly',
  },
  {
    testTitle: 'Flow 2: Free Trial WITH Card (LaunchPad - Monthly)',
    plan: 'launchpad',
    flowType: 'with-card',
    billing: 'monthly',
  },
  {
    testTitle: 'Flow 3: Free Trial WITH Card (Pro - Monthly)',
    plan: 'pro',
    flowType: 'with-card',
    billing: 'monthly',
  },
  {
    testTitle: 'Flow 4: Free Trial WITH Card (FlexiFunnels - Monthly)',
    plan: 'flexifunnels',
    flowType: 'with-card',
    billing: 'monthly',
  },
];

test.describe('Free Trial Plan Flows', () => {
  test.setTimeout(300000); // 5 minutes per test for manual OTP and payment steps

  // Prints a clear line after every test so you can see the run moving on to the next plan
  test.afterEach(async ({}, testInfo) => {
    console.log(
      `\n>>> [${String(testInfo.status).toUpperCase()}] ${testInfo.title} (${(testInfo.duration / 1000).toFixed(1)}s) - next test starts automatically.\n`
    );
  });

  for (const config of TEST_FLOWS) {
    test(config.testTitle, async ({ page }) => {
      await runFreeTrialFlow(page, config);
    });
  }
});
