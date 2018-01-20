const config = require('../config/keys');
const mongoose = require('mongoose');
const {
  Kayn,
  REGIONS,
  METHOD_NAMES,
  BasicJSCache,
  RedisCache,
} = require('kayn');

const Summoner = mongoose.model('summoners');
const User = mongoose.model('users');

const kayn = Kayn(config.riotAPI)({
  region: 'na', // default region
  debugOptions: {
    isEnabled: true,
    showKey: false,
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: true,
  },
  cacheOptions: {
    cache: null,
    ttls: {}, 
  },
});

const calcTimeDifference = (date1, date2) => {
  const day = 1000 * 60 * 60 * 24;
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();
  let difference = date2_ms - date1_ms;
  return Math.round(difference/day);
}

const checkIfFollowing = (userAccount, requestedSummoner) =>{
  return(userAccount.following.some(followedSummoner => {
    // break if this returns true, indicating the requested summoner is already followed
    return followedSummoner.id === requestedSummoner.id;
  }));
}

exports.followSummoner = async (user, region, summonerName) => {
  const userAccount = await User.findById(user.id);
  const summoner = await this.findSummoner(region, summonerName);
  if(!summoner){
    throw 'Summoner not found.';
  }
  else if(checkIfFollowing(userAccount, summoner)){
    throw 'Already following user.';
  }
  else {
    await userAccount.following.push({region: region, id: summoner.id});
    userAccount.save();
  }
}

exports.processList = async (user) => {
  const userAccount = await User.findById(user.id).lean();    
  const followedSummoners = userAccount.following;  
  const currentDate = new Date();
  let ranksOfFollowedSummoners = followedSummoners.map(async summoner => {
    const storedSummoner = await Summoner.findOne({ summonerId: summoner.id }).lean();    
    const lastUpdate = new Date(storedSummoner.lastUpdate);
    if(calcTimeDifference(lastUpdate, currentDate) >= 1){
      const updatedSummoner = await findSummonerRank(summoner.region, summoner.id);
      return formatSummonerInformation(updatedSummoner, summoner.region);  
    }
    return formatSummonerInformation (storedSummoner, summoner.region);
  });
  return (await Promise.all(ranksOfFollowedSummoners));
}

const formatSummonerInformation = (summoner, region) => {
  return {
    summoner: summoner.summonerName,
    region: region,
    icon: summoner.profileIcon,
    lastUpdate: summoner.lastUpdate,
    solo: summoner.soloHistory[summoner.soloHistory.length - 1],
    flex: summoner.flexHistory[summoner.flexHistory.length - 1],
    threes: summoner.threesHistory[summoner.threesHistory.length - 1]
  };
}

const checkIfUserExists = async (summonerId) => {
  const existingUser = await Summoner.findOne({ summonerId: summonerId }).lean();
  if (existingUser) return existingUser;
  return false; // user does not exist
}

exports.findSummoner = async (region, summonerName) => {
  try {
    const summoner = await kayn.Summoner.by.name(summonerName).region(region);
    if(!await checkIfUserExists(summoner.id)){  
      // if user doesn't exist, create information for them  
      await new Summoner({
                  summonerName: summoner.name,
                  summonerId: summoner.id,
                  profileIcon: summoner.profileIconId,
                  lastUpdate: new Date()
                }).save();   
      await findSummonerRank(region, summoner.id);            
    }
    return summoner;  
  } catch(err) {
    return false;
  }
};

const findSummonerRank = async (region, id) => {
  const storedSummoner = await Summoner.findOne({ summonerId: id }); 
  const summonerRanks = await kayn.LeaguePositions.by.summonerID(id).region(region);
  const currentDate = new Date();
  summonerRanks.forEach((queue) => {
    let queueInfo = {
      date: currentDate,
      rank: queue
    }
    switch(queue.queueType){
      case "RANKED_SOLO_5x5":
        storedSummoner.soloHistory.push(queueInfo);
        break;
      case "RANKED_FLEX_TT":
        storedSummoner.threesHistory.push(queueInfo);      
        break;
      case "RANKED_FLEX_SR":
        storedSummoner.flexHistory.push(queueInfo);      
        break;
    }
  })
  storedSummoner.lastUpdate = currentDate;
  storedSummoner.save();  
  return storedSummoner;
}
