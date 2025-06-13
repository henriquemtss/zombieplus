const {executeSQL} = require('../support/database')

const {test, expect} = require('@playwright/test');
const data = require('../support/fixtures/movies.json')
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
    
    const movies = data.create

    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)

    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    await moviesPage.create(movies.title, movies.overview, movies.company, movies.release_year)

    await toast.containText('Cadastro realizado com sucesso!')
})