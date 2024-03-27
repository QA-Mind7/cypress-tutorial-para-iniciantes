describe('Login session', () => {
  beforeEach(() => {
    cy.visit('https://front.serverest.dev')
    cy.get('[data-testid=email]').type('qamind7@email.com')
    cy.get('[data-testid=senha]').type('q@mind7', { log: false })
    cy.get('[data-testid=entrar]').click()
    cy.url().should('be.equal', 'https://front.serverest.dev/home')

    // cy.login('qamind7@email.com', 'q@mind7')
  })

  it('Pesquisar produto válido', () => {
    cy.intercept('GET', '**/produtos**').as('getProdutos')

    cy.get('[data-testid=pesquisar]').type('Logitech')
    cy.get('[data-testid=botaoPesquisar]').click()

    cy.wait('@getProdutos')

    cy.get('.card-title').each((el) => {
      cy.wrap(el).invoke('text').should('include', 'Logitech')
    })
  })

  it('Pesquisar produto inexistente', () => {
    cy.intercept('GET', '**/produtos**').as('getProdutos')

    cy.get('[data-testid=pesquisar]').type('Inexistente')
    cy.get('[data-testid=botaoPesquisar]').click()

    cy.wait('@getProdutos')

    cy.contains('Nenhum produto foi encontrado')
  })

  it('Navegar para detalhes do produto', () => {
    cy.intercept('GET', '**/produtos**').as('getProdutos')

    cy.get('[data-testid=pesquisar]').type('Xbox')
    cy.get('[data-testid=botaoPesquisar]').click()

    cy.wait('@getProdutos')
    cy.get('.card-link')
      .click()

    cy.get('h1').should('contain.text', 'Detalhes do produto')
  })

  it('Adicionar produto a lista de compras', () => {
    cy.intercept('GET', '**/produtos**').as('getProdutos')

    cy.get('[data-testid=pesquisar]').type('Xbox')
    cy.get('[data-testid=botaoPesquisar]').click()

    cy.wait('@getProdutos')
    cy.get('[data-testid=adicionarNaLista]')
      .click()

    cy.get('h1').should('contain.text', 'Lista de Compras')
  })
})