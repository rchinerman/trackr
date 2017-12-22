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
    burst: false,
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

const checkFollowing = (userAccount, summoner) =>{
  return(userAccount.following.some(follow => {
    return follow.id === summoner.id;
  }));
}

exports.followSummoner = async (user, region, summonerName) => {
  const userAccount = await User.findById(user.id); 
  const summoner = await this.findSummoner(region, summonerName);
  if(summoner.id === false) return false;
  if(checkFollowing(userAccount, summoner)){
    return "already following";
  }
  await userAccount.following.push({region: region, id: summoner.id});
  userAccount.save();
  return "saved";  
}

exports.processList = async (user) => {
  const userAccount = await User.findById(user.id);    
  const followingList = userAccount.following;  
  const currentDate = new Date();
  let followingRanks = await Promise.all(followingList.map(async (summoner) => {
    const storedSummoner = await Summoner.findOne({ summonerId: summoner.id });    
    const lastUpdate = new Date(storedSummoner.lastUpdate)
    if(calcTimeDifference(lastUpdate, currentDate) >= 1){
      await findRank(summoner.region, summoner.id);      
      const updatedSummoner = await Summoner.findOne({ summonerId: summoner.id });
      return {
        summoner: updatedSummoner.summonerName,
        region: summoner.region,
        icon: updatedSummoner.profileIcon,
        lastUpdate: updatedSummoner.lastUpdate,
        solo: updatedSummoner.soloHistory[updatedSummoner.soloHistory.length - 1],
        flex: updatedSummoner.flexHistory[updatedSummoner.flexHistory.length - 1],
        threes: updatedSummoner.threesHistory[updatedSummoner.threesHistory.length - 1]};
    };
    return {
      summoner: storedSummoner.summonerName,
      region: summoner.region,
      icon: storedSummoner.profileIcon,
      lastUpdate: storedSummoner.lastUpdate,
      solo: storedSummoner.soloHistory[storedSummoner.soloHistory.length - 1],
      flex: storedSummoner.flexHistory[storedSummoner.flexHistory.length - 1],
      threes: storedSummoner.threesHistory[storedSummoner.threesHistory.length - 1]};
  }));
  return followingRanks;
}

const checkExisting = async (summoner) => {
  const existingUser = await Summoner.findOne({ summonerNameLower: summoner.toLowerCase() });
  if (existingUser){
    return existingUser; 
  }
  return false;
}

exports.findSummoner = async (region, summonerName) => {
  try {
    const summoner = await kayn.Summoner.by.name(summonerName).region(region);
    if(!await checkExisting(summonerName)){    
      await new Summoner({
        summonerName: summoner.name,
        summonerNameLower: summoner.name.toLowerCase(),
        summonerId: summoner.id,
        profileIcon: summoner.profileIconId,
        lastUpdate: new Date()
      }).save();   
      await findRank(region, summoner.id);            
    }
    return summoner;  
  } catch(err) {
    console.log(err);
    return false;
  }
};

const findRank = async (region, id) => {
  const storedSummoner = await Summoner.findOne({ summonerId: id }); 
  const ranks = await kayn.LeaguePositions.by.summonerID(id).region(region);
  const currentDate = new Date();
  ranks.forEach((queue) => {
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
}
