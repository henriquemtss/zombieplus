const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../page/LoginPage')
const { Toast } = require('../page/Components')
const { MoviesPage } = require('../page/MoviesPages')

let loginPage
let toast
let moviesPage

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)

    await loginPage.visit()
})

test('logar como administrador', async ({ page }) => {
    

    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
    

    await loginPage.submit('admin@zombieplus.com', 'pwd1234')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
})

test('não deve logar quando o email é inválido', async ({ page }) => {
    

    await loginPage.submit('www.test.com.br', 'pwd1234')

    await loginPage.alertHaveText('Email incorreto')
})

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    

    await loginPage.submit('', 'pwd1234')

    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchido', async ({ page }) => {
    

    await loginPage.submit('test@gmail.com', '')

    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a nenhum não é preenchido', async ({ page }) => {
    

    await loginPage.submit('', '')

    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
