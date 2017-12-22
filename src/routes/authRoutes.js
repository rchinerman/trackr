const passport = require('passport');
const riotRequest = require('../services/riot');

module.exports = app => {
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.json(req.user);
  });

  app.get('/api/follow/:region/:summoner', async (req, res) => {
    const completion = await riotRequest.followSummoner(req.user, req.params.region, req.params.summoner);
    if(completion){
      res.send(completion);
      return;
    }
    res.send("Summoner not found.");
  });

  app.get('/api/profile', async (req, res) => {
    const following = await riotRequest.processList(req.user);
    res.send(following);
  })

  app.get('/api/search/:region/:summoner', async (req, res) => {
    await riotRequest.findSummoner(req.params.region, req.params.summoner);
    res.send("success");
  });

  app.get('/api/rank/:region/:summoner', async (req, res) => {
    const data = await riotRequest.findRank(req.params.region, req.params.summoner);
    res.json(data);
  });
};