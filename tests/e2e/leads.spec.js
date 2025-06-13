// @ts-check
import { test, expect } from '@playwright/test';
const { LandingPage } = require('../page/LandingPage')
const {Toast} = require('../page/Components')
const { faker } = require('@faker-js/faker');

let landingPage 
let toast

test.beforeEach(async ({page})=>{
    landingPage = new LandingPage(page)
    toast = new Toast(page)

    await landingPage.visit()
    await landingPage.openLeadModal()
})

test('deve cadastrar um lead na fila de espera ', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  

  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.containText(message)

});

test('não deve cadastrar quando um email já existe ', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

   const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.containText(message)

});

test('validação de email incorreto', async ({ page }) => {

  await landingPage.submitLeadForm('Henrique Gomes de Matos', 'henriquemtss.com')

  await landingPage.alertHaveText('Email incorreto')

});


test('validação campo de nome obrigatorio', async ({ page }) => {

  await landingPage.submitLeadForm('', 'henriquemtss@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('validação campo de email obrigatorio', async ({ page }) => {
  
  await landingPage.submitLeadForm('Henrique Gomes de Matos', '')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('validação campos obrigatorios no modal', async ({ page }) => {

  await landingPage.submitLeadForm('', '')

  await await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])

});
