const {test, expect} = require('../support');
const { faker } = require('@faker-js/faker');
const { executeSQL } = require('../support/database')


test.beforeEach(async ({page})=>{

    await page.leads.visit()
    await page.leads.openLeadModal()
})

test.beforeAll(async ({ }) => {
    await executeSQL(`DELETE FROM leads`)

})

test('deve cadastrar um lead na fila de espera ', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  

  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)

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

  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)

});

test('validação de email incorreto', async ({ page }) => {

  await page.leads.submitLeadForm('Henrique Gomes de Matos', 'henriquemtss.com')

  await page.leads.alertHaveText('Email incorreto')

});


test('validação campo de nome obrigatorio', async ({ page }) => {

  await page.leads.submitLeadForm('', 'henriquemtss@gmail.com')

  await page.leads.alertHaveText('Campo obrigatório')

});

test('validação campo de email obrigatorio', async ({ page }) => {
  
  await page.leads.submitLeadForm('Henrique Gomes de Matos', '')

  await page.leads.alertHaveText('Campo obrigatório')

});

test('validação campos obrigatorios no modal', async ({ page }) => {

  await page.leads.submitLeadForm('', '')

  await await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])

});
