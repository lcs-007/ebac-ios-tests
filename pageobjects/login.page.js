class LoginPage {


  get tabProfile() {

    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Profile" OR label == "Profile")');
  }

  get emailInput() {

    return $(
      '~email'
    );
  }

  get emailInputFallback() {
    return $('-ios predicate string:(type == "XCUIElementTypeTextField" OR type == "XCUIElementTypeSecureTextField") AND (name CONTAINS[c] "email" OR label CONTAINS[c] "email" OR value CONTAINS[c] "email")');
  }

  get passwordInput() {
    return $('~password');
  }

  get passwordInputFallback() {
    return $('-ios predicate string:type == "XCUIElementTypeSecureTextField" AND (name CONTAINS[c] "password" OR label CONTAINS[c] "password" OR value CONTAINS[c] "password" OR name CONTAINS[c] "senha" OR label CONTAINS[c] "senha" OR value CONTAINS[c] "senha")');
  }

  get loginButton() {

    return $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Login" OR label == "Login" OR name == "Sign In" OR label == "Sign In" OR name == "Entrar" OR label == "Entrar")');
  }

  get loggedInIndicator() {
    return $('-ios predicate string:(type == "XCUIElementTypeStaticText" AND (label CONTAINS[c] "cliente@ebac.art.br" OR name CONTAINS[c] "cliente@ebac.art.br")) OR (type == "XCUIElementTypeButton" AND (name == "Logout" OR label == "Logout" OR name == "Sair" OR label == "Sair"))');
  }



  async openProfileTab() {
    await this.tabProfile.waitForDisplayed({ timeout: 60000 });
    await this.tabProfile.click();
  }

  async typeEmail(email) {
    const input = await this.emailInput.isExisting() ? this.emailInput : this.emailInputFallback;
    await input.waitForDisplayed({ timeout: 60000 });
    await input.click();
    await input.setValue(email);
  }

  async typePassword(password) {
    const input = await this.passwordInput.isExisting() ? this.passwordInput : this.passwordInputFallback;
    await input.waitForDisplayed({ timeout: 60000 });
    await input.click();
    await input.setValue(password);
  }

  async submitLogin() {
    await this.loginButton.waitForEnabled({ timeout: 60000 });
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.openProfileTab();
    const loginEntry = $('-ios predicate string:type == "XCUIElementTypeStaticText" AND (label == "Login" OR name == "Login" OR label == "Entrar" OR name == "Entrar")');
    if (await loginEntry.isExisting()) {
      await loginEntry.waitForDisplayed({ timeout: 20000 });
      await loginEntry.click();
    }

    await this.typeEmail(email);
    await this.typePassword(password);
    await this.submitLogin();
  }

  async assertLoggedIn() {
    await this.loggedInIndicator.waitForDisplayed({ timeout: 90000 });
  }
}

module.exports = new LoginPage();