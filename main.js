const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=tradutor');

    const idiomaBase = readlineSync.question("Idioma: ") || "Português";
    const texto = readlineSync.question("Texto: ") || "Hello world";
    const idiomaFinal = readlineSync.question("Idioma para Traduzir: ") || "Inglês";

    await page.click('[class="source-language"]');
    await page.type('[class="tw-lp-search hide-focus-ring"]', idiomaBase);
    await page.keyboard.press(String.fromCharCode(13));

    await page.click('[class="target-language"]');
    await page.type('[class="tw-lp-search hide-focus-ring"]', idiomaFinal);
    await page.keyboard.press(String.fromCharCode(13));
    
    await page.type('[class="tw-ta tw-text-large XcVN5d goog-textarea"]', texto);
    
    await page.waitForTimeout(2000);
    const textoTraduzido = await page.evaluate(() => {
        return document.querySelector('#tw-target-text > span').textContent;
    });
    console.log(`O texto traduzido de ${idiomaBase} para ${idiomaFinal} é:\n`);
    console.log(textoTraduzido);
    await browser.close();
})();