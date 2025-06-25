const { expect } = require('@playwright/test')

export class TvShows{
    constructor(page) {
        this.page = page;
    }

    async goForm(){
        await this.page.locator('a[href$="/admin/tvshows"]').click()
        await this.page.locator('a[href$="tvshows/register"]').click()
    }

    async submitForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(tvshow){

        await this.goForm()

        await this.page.getByLabel('Titulo da série').fill(tvshow.title)
        await this.page.getByLabel('Sinopse').fill(tvshow.overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()

        //const = html await this.page.content()
        //console.log(html)
        await this.page.locator('.react-select__option')
        .filter({ hasText: tvshow.company })
        .click()

        await this.page.locator('#select_year .react-select__indicator').click()      

        await this.page.locator('.react-select__option')
        .filter({ hasText: tvshow.release_year })
        .click()

        await this.page.getByLabel('Temporadas').fill(tvshow.season.toString())

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + tvshow.cover)
        
        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click()
        } 

        await this.submitForm()
        
    }
}