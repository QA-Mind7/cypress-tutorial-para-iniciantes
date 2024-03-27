import { elements as el } from './elements'

class Inventory {

  validarAcessoAPagina() {
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

    cy.screenshot('acesso a página de inventário')
  }

  adicionarProduto(itemName) {
    cy.get(el.addToCart(itemName)).click()
  }

  removerProduto(itemName) {
    cy.get(el.removeFromCart(itemName)).click()
  }
}

export default new Inventory()