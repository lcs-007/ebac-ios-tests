# Testes Mobile com CI - EBAC

Este projeto contém testes automatizados para aplicação mobile utilizando:

- WebdriverIO
- Appium
- SauceLabs
- GitHub Actions

## Estrutura do Projeto


pageobjects/
test/specs/
wdio.ios.sauce.conf.js


Os testes seguem o padrão **Page Objects** para melhor organização e reutilização de código.

## Integração Contínua (CI)

Foi configurado um pipeline de **Continuous Integration** utilizando **GitHub Actions**.

O workflow está localizado em:


.github/workflows/ci.yml


Sempre que ocorre um **push na branch `ci`**, o pipeline executa automaticamente:

1. Checkout do repositório
2. Instalação das dependências
3. Execução dos testes mobile

## Device Farm

Os testes foram configurados para execução na Device Farm **SauceLabs**.

## Repositório

https://github.com/lcs-007/ebac-ios-tests
