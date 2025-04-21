const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../page/LoginPage')
const {Toast} = require('../page/Components')

    let loginPage
    let toast

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        toast = new Toast(page)
        
    })

    test('logar como administrador', async ({page})=>{
        await loginPage.visit()

        await loginPage.submit('admin@zombieplus.com', 'pwd123')
        await loginPage.isLoggedIn()
    })

    test('não deve logar com senha incorreta', async ({page})=>{
        await loginPage.visit()

        await loginPage.submit('admin@zombieplus.com', 'pwd1234')

        const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'   
        await toast.haveText(message)
    })

    