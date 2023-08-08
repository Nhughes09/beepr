import { Page } from "@playwright/test";
import { getRandomString } from "./random";

export async function signup(page: Page) {
  await page.getByRole('button', { name: 'Sign Up' }).click();

  const name = getRandomString();

  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('User');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill(name);
  await page.getByLabel('Email', { exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill(`${name}@test.edu`);
  await page.getByLabel('Phone').click();
  await page.getByLabel('Phone').fill('7049969999');
  await page.getByLabel('Venmo Username').click();
  await page.getByLabel('Venmo Username').fill('test');
  await page.getByLabel('Username', { exact: true }).click();
  await page.getByLabel('Username', { exact: true }).fill(name);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test12345');
  await page.getByLabel('--').locator('img').click();
  await page.setInputFiles("input[type='file']", '../app/assets/icon.png');

  await page.getByRole('button', { name: 'Sign Up' }).click();

  return { name };
}