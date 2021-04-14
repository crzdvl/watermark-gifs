const stream = require('stream');
const { promisify } = require('util');
const fs = require('fs');
const got = require('got');
const gm = require('gm');

const pipeline = promisify(stream.pipeline);

async function get10UrlGiphs(search) {
  const { data } = await got('https://api.giphy.com/v1/gifs/search', {
    searchParams: {
      api_key: '9uJuRf8JlsqzOulpEZIc2JpIq4JuSO5Y',
      q: search,
      limit: 10,
      rating: 'pg',
    },
  }).json();

  const result = await data.map((giph) => giph.images.downsized_medium.url);

  return result;
}

function downloadGiphsInStore(urls) {
  return Promise.all(
    urls.map(async (url) => {
      const dateNow = Date.now();

      await pipeline(
        got.stream(url),
        fs.createWriteStream(`./src/public/store/${dateNow}.gif`),
      );

      return dateNow;
    }),
  );
}

async function addWatermark(name) {
  return new Promise((resolve) =>
    gm(`./src/public/store/${name}.gif`)
      .fill('#1eaaf1')
      .font('Helvetica.ttf', 25)
      .drawText(0, 0, 'ONIX', 'South')
      .write(`./src/public/store/${name}-withWatermark.gif`, () =>
        resolve(`${name}-withWatermark`),
      ),
  );
}

module.exports = {
  get10UrlGiphs,
  downloadGiphsInStore,
  addWatermark,
};
