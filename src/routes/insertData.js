var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

require('dotenv').config()

const username = "edwardbunker"
const puuid = "_7d_-Qcfk2HF0Ad6ZEZ5XyTdSU_wpdombMr_kCgZJL-DNnYqRcEMduMSlXJ0pJDV7BI1v-Ix8SKYOw"


const getSummonerNickname = async (nickname) => {
    const { data: summoner } = await axios({
        method: "get",
        url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${process.env.API_KEY}`
    });

    const filteredSummoner =
    {
        puuid: summoner.puuid,
        profileIconid: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel
    }
    return filteredSummoner
}

const getSummonerPuuid = async (puuid) => {
    const { data: summoner } = await axios({
        method: "get",
        url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`
    });

    const filteredSummoner =
    {
        puuid: summoner.puuid,
        profileIconid: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel
    }
    return filteredSummoner
}


const getMatches = async (quantidade) => {
    const { data: matches } = await axios({
        method: "get",
        url: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${quantidade}&api_key=${process.env.API_KEY}`
    });
    return matches
}

const getMatchDetails = async (matchid) => {
    const filteredMatchDetails = []
    let totalKillCounter = 0

    const { data: match_details } = await axios({
        method: "get",
        url: `https://americas.api.riotgames.com/lol/match/v5/matches/${matchid}?api_key=${process.env.API_KEY}`
    });
    //console.log(match_details.info.participants[0].puuid)

    const participants = match_details.info.participants
    const participantsList = []
    participants.forEach((player) => {
        totalKillCounter += player.kills
        participantsList.push(player.puuid)
        filteredMatchDetails.push(
            {
                summ_puuid: player.puuid,
                matchid: matchid,
                kills: player.kills,
                deaths: player.deaths,
                assists: player.assists,
                championName: player.championName,
                lane: player.lane,
                goldEarned: player.goldEarned,
                win: player.win
            }
        )
    }
    )
    const filteredMatch =
    {
        matchid: matchid,
        gameMode: match_details.info.gameMode,
        gameDuration: match_details.info.gameDuration,
        gameName: match_details.info.gameName,
        queueId: match_details.info.queueId,
        total_kills: totalKillCounter
    }

    const filteredMatchData = { filteredMatchDetails, filteredMatch, participantsList }

    return filteredMatchData
}


const insertDataToDatabase = async (summoners, match, match_details) => {
    // match, match_details
    summoners.forEach(async (summoner) => {
        try {
            await Summoner.create(summoner) //inserindo jogadores
        } catch (error) {
            console.error(error.errors);
        }
    })

    try {
        await Match.create(match) //inserindo partida
    } catch (error) {
        console.error(error.errors);
    }
    for (let i = 0; i < match_details.length; i += 1) {
        try {
            await Match_summ_details.create(match_details[i]) //inserindo detalhes
        } catch (error) {
            console.error(error);
        }

    }
}

// Rota padrao
router.get('/', async (req, res) => {
    //========PRIMEIRA BUSCA========
    const first_summoner = await getSummonerNickname("edwardbunker") //busca um jogador baseado no seu nickname
    const matches = await getMatches(50)//busca uma quantidade n de partidas do jogador
    //const summoner_list = getNextSummoners() //busca uma lista de jogadores baseado na primeira partida
    console.log(matches)
    const matchData = await getMatchDetails(matches[0]) //partida, detalhes e lista de jogadores
    //========PRIMEIRA BUSCA========

    const insertSummonerList = []

    for (let i = 0; i < matchData.participantsList.length; i += 1) {
        try {
            let next_summoner = await getSummonerPuuid(matchData.participantsList[i]) //manda o puuid de cada jogador para ser inserido
            insertSummonerList.push(next_summoner)
        } catch (error) {
            console.log(error)
        }
    }

    insertDataToDatabase(insertSummonerList, matchData.filteredMatch, matchData.filteredMatchDetails)//insere os dados enviados no banco

    // res.status(200).send(launchpads)

    res.sendStatus(200)
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About Rockets!');
});

module.exports = router;
