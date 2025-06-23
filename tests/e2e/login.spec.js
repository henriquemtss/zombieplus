const {test} = require('../support');

test.beforeEach(async ({ page }) => {

    await page.login.visit()
})

test('logar como administrador', async ({ page }) => {
    

    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('não deve logar com senha incorreta', async ({ page }) => {
    

    await page.login.submit('admin@zombieplus.com', 'pwd1234')

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)
})

test('não deve logar quando o email é inválido', async ({ page }) => {
    

    await page.login.submit('www.test.com.br', 'pwd1234')

    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    

    await page.login.submit('', 'pwd1234')

    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchido', async ({ page }) => {
    

    await page.login.submit('test@gmail.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a nenhum não é preenchido', async ({ page }) => {
    

    await page.login.submit('', '')

    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
