const {test, expect} = require('@playwright/test');

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

})


test('deve poder cadastrar um novo filme', async ({page}) => {
    
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})