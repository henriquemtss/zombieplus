// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera ', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  await page.getByRole('button', {name: /Aperte o play/}).click()

  //Checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  //await page.locator('input[name=name]').fill('Henrique Gomes de Matos')
  //await page.fill('input[placeholder="Seu nome completo"]', 'Henrique Gomes de Matos')
  //await page.getByPlaceholder('Seu nome completo').fill('Henrique Gomes de Matos')

  await page.locator('#name').fill('Henrique Gomes de Matos')
  await page.locator('#email').fill('henriquemtss@gmail.com')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  /* pega o codigo html de elemntos flutuantes

  await page.getByText('seus dados conosco').click()
  const content = await page.content()
  console.log(content);
  */

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message)
  
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000})

});

test('validação de email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  //Checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.locator('#name').fill('Henrique Gomes de Matos')
  await page.locator('#email').fill('henrique.com')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')

});


test('validação campo de nome obrigatorio', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  //Checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  
  await page.locator('#email').fill('henriquemtss@gmail.com')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('validação campo de email obrigatorio', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  //Checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.locator('#name').fill('Henrique Gomes de Matos')
  

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('validação campos obrigatorios no modal', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  //Checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')  

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])

});
