const service = require('./service');

async function getGiphs({ query: { query, watermark }, csrfToken }, res) {
  const giphs = await service.get10UrlGiphs(query);
  let nameOfGiphs = await service.downloadGiphsInStore(giphs);

  if (watermark === 'true') {
    nameOfGiphs = await Promise.all(nameOfGiphs.map(service.addWatermark));
  }

  return res.render('search.ejs', {
    csrfToken: csrfToken(),
    photos: nameOfGiphs,
    message: '',
    query,
  });
}

function getGiphsPage(req, res) {
  return res.render('search.ejs', {
    csrfToken: req.csrfToken(),
    photos: [],
    message: '',
    query: 'type smth hear',
  });
}

module.exports = {
  getGiphs,
  getGiphsPage,
};
