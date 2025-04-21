// @ts-check
import { test, expect } from '@playwright/test';
const { LandingPage } = require('../page/LandingPage')
const {Toast} = require('../page/Components')

let landingPage 
let toast

test.beforeEach(async ({page})=>{
    landingPage = new LandingPage(page)
    toast = new Toast(page)
})

test('deve cadastrar um lead na fila de espera ', async ({ page }) => {

  await landingPage.visit()

  await landingPage.openLeadModal()

  await landingPage.submitLeadForm('Henrique Gomes de Matos', 'henriquemtss@gmail.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)

});

test('validação de email incorreto', async ({ page }) => {

  await landingPage.visit()

  await landingPage.openLeadModal()

  await landingPage.submitLeadForm('Henrique Gomes de Matos', 'henriquemtss.com')

  await landingPage.alertHaveText('Email incorreto')

});


test('validação campo de nome obrigatorio', async ({ page }) => {

  await landingPage.visit()

  await landingPage.openLeadModal()

  await landingPage.submitLeadForm('', 'henriquemtss@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('validação campo de email obrigatorio', async ({ page }) => {

  await landingPage.visit()

  await landingPage.openLeadModal()

  await landingPage.submitLeadForm('Henrique Gomes de Matos', '')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('validação campos obrigatorios no modal', async ({ page }) => {

  await landingPage.visit()

  await landingPage.openLeadModal()

  await landingPage.submitLeadForm('', '')

  await await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])

});
