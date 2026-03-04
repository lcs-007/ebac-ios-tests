class CheckoutPage {
  get cashOnDeliveryOption() {
    return $('-ios predicate string:(type == "XCUIElementTypeStaticText" OR type == "XCUIElementTypeCell") AND (name == "Cash on Delivery" OR label == "Cash on Delivery")');
  }

  get checkoutButton() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Checkout" OR label == "Checkout")');
  }

  get successTitle() {
    return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND (label CONTAINS "Order Success" OR name CONTAINS "Order Success" OR label CONTAINS "Transaction successful" OR name CONTAINS "Transaction successful")');
  }

  async selectCashOnDelivery() {
    await this.cashOnDeliveryOption.waitForDisplayed({ timeout: 60000 });
    await this.cashOnDeliveryOption.click();
  }

  async placeOrder() {
    await this.checkoutButton.waitForEnabled({ timeout: 60000 });
    await this.checkoutButton.click();
  }

  async assertOrderSuccess() {
    await this.successTitle.waitForDisplayed({ timeout: 90000 });
  }
}

module.exports = new CheckoutPage();