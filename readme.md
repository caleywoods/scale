# SCALE - Spelling City Automated List Expediter

Create spelling lists automatically on [Spelling City](https://www.spellingcity.com/) using [Tesseract OCR](https://en.wikipedia.org/wiki/Tesseract_(software)) via the `node-tesseract-ocr` wrapper and [Puppeteer](https://github.com/puppeteer/puppeteer).

You'll will need a few things in order to use this project:
  * You need to install Tesseract. You can follow the installation instructions [here](https://github.com/tesseract-ocr/tesseract/wiki#installation)
    * Make sure that once it's installed you can perform a `tesseract --version` in terminal and receive valid output. I created this using `tesseract v5.0.0-alpha.20191030`
  * You need to have Node JS installed. You can find it [here](https://nodejs.org/en/download/)
    * Just like with tesseract, once Node is installed, make sure you can perform a `node -v` in the terminal and not receive an error. I am currently using `v10.16.2`
  * You will need an account on [Spelling City](https://spellingcity.com)

You can see it working in [this short video](https://www.youtube.com/watch?v=cGnwAUjya38) I created.

## How to use
* `git clone https://github.com/caleywoods/scale.git`
* `cd scale && npm install`
* `cp ./credentials_example.json ./credentials.json`
* Open `credentials.json` and replace the placeholder username and password with your own
* To create an example list using the default input photo, run `node app.js`
* You should see a Chrome window open and quickly run through all the steps to create a new spelling list
* The process will end and leave you at the list verification screen, here you can verify:
  * All words were created correctly
  * All definitions are the ones intended
  * Optionally rename the list
* If you're satisfied with the list, you can save it or save and assign it to your child

## Notes
There are two test files included in the repo. `input.jpg` is a photo taken with a Google Pixel 2 of a list of spelling words. The font is less than ideal but it seems to work even without training the Tesseract engine. I think if you were going to have to make due with a font like this in the long term you would want to feed Tesseract some more images with the same font.

The second file, `input2.PNG` is a screenshot of words from the internet in a very clear font, ideally this is what you would want to be working with albeit maybe with larger text. To use this second file, just provide it as the argument to `tesseract.recognize()` in `app.js`.

To use your own images, just drop them in the directory and point `tesseract.recognize()` at them.

## Useful Links
* [Tuning Tesseract OCR](https://mlichtenberg.wordpress.com/2015/11/04/tuning-tesseract-ocr/) - A nice article that digs into some of the details about how to tweak Tesseract to make it work better with the type of input you want to give it.
* [Node Tesseract Usage](https://www.npmjs.com/package/node-tesseract-ocr#usage) - Contains a link to all of the config parameters you can send in the `config` portion for Tesseract within `app.js`.