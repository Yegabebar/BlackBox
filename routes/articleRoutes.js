const express = require('express');
const router = express.Router();
const utils = require('../kernel/utils');
const { success, error } = require("../kernel/formatResponse");
const articleController = require('../controllers/articleController')

router.get('/', (req, res) => {
  res.write('Envoie une requête pour créer un nouvel article');
  res.write(`
        Pour tester l'API, utiliser Postman, Insomnia ou autre moyen
        permettant d'inclure un body avec les requetes HTTP.
    `);
  res.send();
});

router.post('/create', async (req, res) => {
  const token = req.cookies.token;
  try {
    const payload = utils.verifyToken(res, token);
    if (payload.status) {
      res.end();
      return payload.status;
    }
  } catch (e) {
    return res.status(401).end();
  }
  // TODO: appeler un controller pour stocker des données dans BigchainDB
  // Ajouter gestion d'erreurs
  await articleController.createArticle(req.body.data, req.body.metadata).then(resp => {
    console.log('route got',resp)
    // Si la réponse est une erreur, on formatte la réponse en erreur. Sinon, success
    const response = resp.status['error']
    ? error(resp.message, resp.status.code)
    : success('Successful', resp.status.code, resp.id);
    res.status(response.code);
    res.write(JSON.stringify(response));
  }).catch(err => {
    res.status(500);
    res.write(JSON.stringify(err));
  })
  
  res.send();
  // TODO: add create operation to store pics and videos and check the result here
  // TODO: check if the file is of valid type before storing it
  // exemple d'implémentation de réponse de controller, permet de retourner un statut cohérent avec le résultat
  // rendu par le controller.
  /* baseController.createDocument(req.body, resource, ['_id','__v'], titleAndImageSchema).then(resp => {
        if(resp.statusMessage){ res.statusMessage = resp.statusMessage }
        if(resp.data){(res.write(JSON.stringify(resp.data)))}
        res.status(Number(resp.status))
        res.send()
    }) */
  
  
});

router.post('/read', async (req, res) => {
  const token = req.cookies.token;
  try {
    const payload = utils.verifyToken(res, token);
    if (payload.status) {
      res.end();
      return payload.status;
    }
  } catch (e) {
    return res.status(401).end();
  }
  // TODO: appeler un controller pour lire des données dans BigchainDB

  // TODO: add orbitDB read operation to store and check the result here

  // exemple d'implémentation de réponse de controller, permet de retourner un statut cohérent avec le résultat
  // rendu par le controller.
  /* baseController.createDocument(req.body, resource, ['_id','__v'], titleAndImageSchema).then(resp => {
        if(resp.statusMessage){ res.statusMessage = resp.statusMessage }
        if(resp.data){(res.write(JSON.stringify(resp.data)))}
        res.status(Number(resp.status))
        res.send()
    }) */
});

router.post('/update', async (req, res) =>{
  const token = req.cookies.token;
  try {
    const payload = utils.verifyToken(res, token);
    if (payload.status) {
      res.end();
      return payload.status;
    }
  } catch (e) {
    return res.status(401).end();
  }
  // Va permettre de mettre à jour le score
  /* TODO: appeler un controller pour stocker des données dans BigchainDB (pas besoin de orbitdb et IPFS
    dans ce cas car les données stockées sur IPFS ne seront pas modifiables après création) */
});

module.exports = router;
