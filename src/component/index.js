const service = require('./service');

async function getGiphs({ query: { query, watermark }, csrfToken }, res) {
  const giphs = await service.get10UrlGiphs(query);

  let giphsInf = await service.downloadGiphsInStore(giphs);

  if (watermark === 'true') {
    giphsInf = await Promise.all(giphsInf.map(service.addWatermark));
  }

  return res.render('search.ejs', {
    csrfToken: csrfToken(),
    photos: giphsInf,
    query,
  });
}

function getGiphsPage({ csrfToken }, res) {
  return res.render('search.ejs', {
    csrfToken: csrfToken(),
    photos: [],
    query: 'type smth hear',
  });
}

module.exports = {
  getGiphs,
  getGiphsPage,
};
