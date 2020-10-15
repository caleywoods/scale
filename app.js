const tesseract = require('node-tesseract-ocr');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname + '/credentials.json')));

const config = {
    lang: 'eng',
    oem: 1,
    psm: 3
};

const createTitle = () => {
    const today = new Date();
    const listTitle = `${today.getMonth()}/${today.getDay()}/${today.getFullYear()} List`;

    return listTitle;
}

const parseOCRText = (text) => {
    return text.split('\r\n')
            .reduce((acc, current) => {
                // Don't allow empty or blank lines from the OCR process
                if (current === '') return acc;
                acc.push(current.toLowerCase());
                return acc;
            }, [])
}

tesseract.recognize('./input2.PNG', config)
    .then(async text => {
        const browser = await puppeteer.launch({headless: false});
        let page = await browser.pages();
        page = page[0];
        await page.goto('https://www.spellingcity.com/Log-yourself-in.html');
        const educator = await page.$('.educator-login');
        await educator.click();
        const usernameInput = await page.$('.login-username > input');
        const passwordInput = await page.$('.login-password > input');
        const loginButton = await page.$('.btn-sign-in');
        await usernameInput.click();
        await usernameInput.type(credentials.username, {delay: 50});
        await passwordInput.click();
        await passwordInput.type(credentials.password, {delay: 50});
        await loginButton.click();
        await page.waitForNavigation();
        let listMgmtAnchor = await page.$$('#menu-main-navigation li:nth-child(5) > a');
        listMgmtAnchor = listMgmtAnchor[0];
        await listMgmtAnchor.click();
        await page.waitForNavigation();
        const newListButton = await page.$('a[href="#/create-a-list"]');
        await newListButton.click();
        await page.waitForNavigation();
        const listNameInput = await page.$('input[name="listName"]');
        const listTitle = createTitle();
        await listNameInput.type(listTitle);
        let batchEntryLink = await page.$$('.add-words-options a:nth-child(3)');
        batchEntryLink = batchEntryLink[0];
        await batchEntryLink.click();
        const wordsTextArea = await page.$('#batch-words');
        const words = parseOCRText(text);
        await wordsTextArea.type(words.join(','));
        const saveListButton = await page.$('#save-list-btn');
        await saveListButton.click();
    });