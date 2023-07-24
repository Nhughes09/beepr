import { test } from '@playwright/test';

test('has beep', async ({ page }) => {
  await page.goto('/', { timeout: 80000 });

  await page.goto('http://localhost:8081/');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('Test');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('User');
  await page.getByLabel('Email', { exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill('test@test.edu');
  await page.getByLabel('Phone').click();
  await page.getByLabel('Phone').fill('7049969999');
  await page.getByLabel('Venmo Username').click();
  await page.getByLabel('Venmo Username').fill('test');
  await page.getByLabel('Username', { exact: true }).click();
  await page.getByLabel('Username', { exact: true }).fill('test');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test12345');
  await page.getByLabel('--').locator('img').click();
  await page.setInputFiles("input[type='file']", '../app/assets/icon.png');
  // await page.locator('div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div > div > div > div > div:nth-child(3) > div').first().setInputFiles('../app/assets/icon.png');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByText("Ride");
  await page.getByText("Group Size");
});
