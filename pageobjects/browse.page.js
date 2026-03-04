class BrowsePage {
  get tabBrowse() {
    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Browse" OR label == "Browse")');
  }

  get productsList() {
    return $('-ios predicate string:type == "XCUIElementTypeCollectionView" OR type == "XCUIElementTypeTable"');
  }

  productByName(name) {
    return $(`-ios predicate string:(type == "XCUIElementTypeStaticText" OR type == "XCUIElementTypeCell") AND (label == "${name}" OR name == "${name}")`);
  }

  get firstProductCell() {
    return $('-ios predicate string:(type == "XCUIElementTypeCell")');
  }

  async openBrowseTab() {
    await this.tabBrowse.waitForDisplayed({ timeout: 60000 });
    await this.tabBrowse.click();
    await this.productsList.waitForDisplayed({ timeout: 60000 });
  }

  async scrollDownOnce() {
    await driver.execute('mobile: scroll', { direction: 'down' });
  }

  async openProduct(name = 'Ingrid Running Jacket') {
    await this.openBrowseTab();

    const product = this.productByName(name);

    if (await product.isExisting()) {
      await product.waitForDisplayed({ timeout: 30000 });
      await product.click();
      return;
    }


    await this.scrollDownOnce();

    if (await product.isExisting()) {
      await product.waitForDisplayed({ timeout: 30000 });
      await product.click();
      return;
    }


    await this.firstProductCell.waitForDisplayed({ timeout: 30000 });
    await this.firstProductCell.click();
  }
}

module.exports = new BrowsePage();