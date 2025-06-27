import { expect } from '@playwright/test';

export class Leads{

    constructor(page){
        this.page = page
    }

    async visit() {
        await this.page.goto('/')
    }

    async openLeadModal() {

        //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {

        //await page.locator('input[name=name]').fill('Henrique Gomes de Matos')
        //await page.fill('input[placeholder="Seu nome completo"]', 'Henrique Gomes de Matos')
        //await page.getByPlaceholder('Seu nome completo').fill('Henrique Gomes de Matos')

        await this.page.locator('#name').fill(name)
        await this.page.locator('#email').fill(email)

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}