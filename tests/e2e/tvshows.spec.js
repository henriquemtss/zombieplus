const { executeSQL } = require('../support/database')

const { test, expect } = require('../support');
const data = require('../support/fixtures/tvshows.json');


test.beforeAll(async ({ }) => {
    await executeSQL(`DELETE FROM tvshows`)

})

test('deve poder cadastrar um nova série', async ({ page }) => {

    const tvshow = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.create(tvshow)
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)
})