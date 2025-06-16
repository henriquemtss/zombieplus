const {test: base, expect} = require('@playwright/test');

const { LandingPage } = require('../page/LandingPage')
const { LoginPage } = require('../page/LoginPage')
const { Toast } = require('../page/Components')
const { MoviesPage } = require('../page/MoviesPages')

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            toast: new Toast(page),
            movies: new MoviesPage(page),
        })
    },
});

export {test, expect};