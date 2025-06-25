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

test('não deve cadastrar quando o titulo é duplicado', async ({ page, request }) => {

    const tvshow = data.duplicate

    await request.api.postTvshow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.create(tvshow)
    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})