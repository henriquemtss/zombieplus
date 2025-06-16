const {executeSQL} = require('../support/database')

const {test} = require('../support');
const data = require('../support/fixtures/movies.json')


test('deve poder cadastrar um novo filme', async ({page}) => {
    
    const movies = data.create

    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movies.title, movies.overview, movies.company, movies.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})