const LoginPage = require('../../pageobjects/login.page');
const BrowsePage = require('../../pageobjects/browse.page');
const ProductPage = require('../../pageobjects/product.page');
const CartPage = require('../../pageobjects/cart.page');
const CheckoutPage = require('../../pageobjects/checkout.page');

describe('EBAC Store iOS - Smoke flow (Sauce Labs)', () => {
  const user = {
    email: 'cliente@ebac.art.br',
    password: '123456',
  };

  const address = {
    name: 'my first address',
    mobile: '98998900',
    address: 'my address',
    city: 'city',
    state: 'sp',
    zipCode: '24300000',
  };

  it('should login, add product, create address if needed, pay COD, and validate success', async () => {
    // 
    // 
    await driver.pause(1500);

    // Login
    await LoginPage.login(user.email, user.password);
    await LoginPage.assertLoggedIn();

    // Browse 
    await BrowsePage.openProduct('Ingrid Running Jacket');

    // Add to cart
    await ProductPage.addToCart();
    await ProductPage.openCart();

    // Cart -> address -> payment
    await CartPage.ensureAddressExists(address);
    await CartPage.continueToPayment();

    // Payment/Checkout
    await CheckoutPage.selectCashOnDelivery();
    await CheckoutPage.placeOrder();

    // Success
    await CheckoutPage.assertOrderSuccess();
  });
});