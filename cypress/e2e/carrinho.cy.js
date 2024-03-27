import Login from '../pages/login'
import Inventory from '../pages/inventory'
import Header from '../pages/header'
import Cart from '../pages/cart'

describe('Carrinho', () => {

  beforeEach(() => {
    // Arrange
    Login.visitarPagina()
    Login.preencherCredenciaisValidas()
  })

  it('Adicionar produto ao carrinho com sucesso', () => {
    // Act
    Inventory.adicionarProduto('Sauce Labs Backpack')

    // Assert
    const qtdItensAdicionados = 1
    Header.validarQueCarrinhoPossuiItens(qtdItensAdicionados)
    Header.navegarParaCarrinho()

    Cart.validarProdutoPresenteNoCarrinho('Sauce Labs Backpack')
  })

  it('Remover produto do carrinho com sucesso', () => {
    // Arrange
    Inventory.adicionarProduto('Sauce Labs Backpack')

    // Act
    Inventory.removerProduto('Sauce Labs Backpack')

    // Assert
    Header.validarQueCarrinhoNaoPossuiItens()
  })
})