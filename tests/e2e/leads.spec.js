const {test, expect} = require('../support');
const { faker } = require('@faker-js/faker');


test.beforeEach(async ({page})=>{

    await page.landing.visit()
    await page.landing.openLeadModal()
})

test('deve cadastrar um lead na fila de espera ', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  

  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)

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

  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)

});

test('validação de email incorreto', async ({ page }) => {

  await page.landing.submitLeadForm('Henrique Gomes de Matos', 'henriquemtss.com')

  await page.landing.alertHaveText('Email incorreto')

});


test('validação campo de nome obrigatorio', async ({ page }) => {

  await page.landing.submitLeadForm('', 'henriquemtss@gmail.com')

  await page.landing.alertHaveText('Campo obrigatório')

});

test('validação campo de email obrigatorio', async ({ page }) => {
  
  await page.landing.submitLeadForm('Henrique Gomes de Matos', '')

  await page.landing.alertHaveText('Campo obrigatório')

});

test('validação campos obrigatorios no modal', async ({ page }) => {

  await page.landing.submitLeadForm('', '')

  await await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])

});
