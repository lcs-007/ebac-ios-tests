class CartPage {
  get cartTitle() {
    return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND (name == "Cart" OR label == "Cart")');
  }

  get addNewAddressButton() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Add New Address" OR label == "Add New Address")');
  }

  get continueToPaymentButton() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Continue to payment" OR label == "Continue to payment" OR name == "Continue To Payment" OR label == "Continue To Payment")');
  }


  fieldByHint(hint) {
    return $(`-ios predicate string:(type == "XCUIElementTypeTextField") AND (name CONTAINS[c] "${hint}" OR label CONTAINS[c] "${hint}" OR value CONTAINS[c] "${hint}")`);
  }

  get nameField() { return this.fieldByHint('name'); }
  get mobileField() { return this.fieldByHint('mobile'); }
  get addressField() { return this.fieldByHint('address'); }
  get cityField() { return this.fieldByHint('city'); }
  get stateField() { return this.fieldByHint('state'); }
  get zipCodeField() { return this.fieldByHint('zip'); }

  get saveAddressButton() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Save" OR label == "Save")');
  }

  get addressAlreadyExistsIndicator() {
    return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND (label CONTAINS[c] "address" OR name CONTAINS[c] "address" OR label CONTAINS[c] "my first address" OR name CONTAINS[c] "my first address")');
  }

  async waitForCart() {
    if (await this.cartTitle.isExisting()) {
      await this.cartTitle.waitForDisplayed({ timeout: 60000 });
    } else {
      await this.continueToPaymentButton.waitForDisplayed({ timeout: 60000 });
    }
  }

  async ensureAddressExists(addressData) {
    await this.waitForCart();
    if (await this.addNewAddressButton.isExisting()) {
      await this.addNewAddressButton.waitForDisplayed({ timeout: 30000 });
      await this.addNewAddressButton.click();


      await this.nameField.waitForDisplayed({ timeout: 60000 });
      await this.nameField.setValue(addressData.name);

      await this.mobileField.waitForDisplayed({ timeout: 60000 });
      await this.mobileField.setValue(addressData.mobile);

      await this.addressField.waitForDisplayed({ timeout: 60000 });
      await this.addressField.setValue(addressData.address);

      await this.cityField.waitForDisplayed({ timeout: 60000 });
      await this.cityField.setValue(addressData.city);

      await this.stateField.waitForDisplayed({ timeout: 60000 });
      await this.stateField.setValue(addressData.state);

      await this.zipCodeField.waitForDisplayed({ timeout: 60000 });
      await this.zipCodeField.setValue(addressData.zipCode);

      await this.saveAddressButton.waitForEnabled({ timeout: 60000 });
      await this.saveAddressButton.click();


      await driver.waitUntil(
        async () => !(await this.saveAddressButton.isDisplayed().catch(() => false)),
        { timeout: 60000, timeoutMsg: 'Address form did not close after Save' }
      );
    }
  }

  async continueToPayment() {
    await this.continueToPaymentButton.waitForEnabled({ timeout: 60000 });
    await this.continueToPaymentButton.click();
  }
}

module.exports = new CartPage();