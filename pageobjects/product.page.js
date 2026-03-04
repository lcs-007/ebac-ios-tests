class ProductPage {
  get addToCartButton() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Add To Cart" OR label == "Add To Cart" OR name == "Add to Cart" OR label == "Add to Cart")');
  }

  get cartButton() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Cart" OR label == "Cart" OR name CONTAINS[c] "cart" OR label CONTAINS[c] "cart")');
  }

  get tabCart() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Cart" OR label == "Cart")');
  }

  async addToCart() {
    await this.addToCartButton.waitForEnabled({ timeout: 60000 });
    await this.addToCartButton.click();
  }

  async openCart() {
    if (await this.tabCart.isExisting()) {
      await this.tabCart.waitForDisplayed({ timeout: 30000 });
      await this.tabCart.click();
      return;
    }

    await this.cartButton.waitForDisplayed({ timeout: 60000 });
    await this.cartButton.click();
  }
}

module.exports = new ProductPage();