const {executeSQL} = require('../support/database')

const {test} = require('../support');
const data = require('../support/fixtures/movies.json')

test.beforeEach(async ({page}) => {
    
})
    

test('deve poder cadastrar um novo filme', async ({page}) => {
    
    const movies = data.create

    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn()
    await page.movies.create(movies.title, movies.overview, movies.company, movies.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos são obrigatórios não são preenchidos', async ({page}) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn()

    await page.movies.goForm()
    await page.movies.submitForm()
    await page.movies.alertHaveText([       
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])


})