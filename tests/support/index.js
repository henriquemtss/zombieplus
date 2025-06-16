const {test: base, expect} = require('@playwright/test');

const { LandingPage } = require('../page/LandingPage')
const { LoginPage } = require('../page/LoginPage')
const { Toast } = require('../page/Components')
const { MoviesPage } = require('../page/MoviesPages')

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['toast'] = new Toast(page)
        context['movies'] = new MoviesPage(page)

        await use(context)
    },
});

export {test, expect};