var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');
const nickname_list = require('../nicknames')
require('dotenv').config()


var contador_sucesso = 0
var contador_falhas = 0



const getSummonerNickname = async (nickname) => {
    await new Promise(r => setTimeout(r, 10000));
    const { data: summoner } = await axios({
        method: "get",
        url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${process.env.API_KEY}`
    });

    const filteredSummoner =
    {
        name: summoner.name,
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
        name: summoner.name,
        puuid: summoner.puuid,
        profileIconid: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel
    }
    return filteredSummoner
}


const getMatches = async (puuid, quantidade) => {
    const { data: matches } = await axios({
        method: "get",
        url: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${quantidade}&api_key=${process.env.API_KEY}`
    });
    return matches
}

const getMatchDetails = async (matchid) => {
    await new Promise(r => setTimeout(r, 3000));
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
            const search = await Summoner.findOne({ where: { puuid: summoner.puuid } });
            if (search === null) {
                await Summoner.create(summoner) //inserindo jogadores
                console.log(`OK >> Jogador inserido, Ah éeee! OK`)
            }
            else {
                console.log(`X Jogador já inserido: F! X`)
            }
        } catch (error) {
            console.error(error);
        }
    })

    try {
        const search = await Match.findOne({ where: { matchid: match.matchid } });
        if (search === null) {
            await Match.create(match) //inserindo partida
            contador_sucesso++
            console.log(`OK (${contador_sucesso})>> Partida inserida, Ah éeee! OK`)
        }
        else {
            contador_falhas++
            console.log(`X (${contador_falhas})Partida já inserida: F! X`)
        }

    } catch (error) {
        console.error(error.errors);
    }

    for (let i = 0; i < match_details.length; i += 1) {
        try {
            const search = await Match_summ_details.findOne({ where: { summ_puuid: match_details[i].summ_puuid, matchid: match_details[i].matchid } });
            if (search === null) {
                await Match_summ_details.create(match_details[i]) //inserindo detalhes
                console.log(`OK Detalhes inseridos, Ah éeee! OK`)
            }
            else {
                console.log(`X Detalhes já inseridos: F! X`)
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// Rota padrao
router.get('/', async (req, res) => {

    for (let k = 0; k < nickname_list.length; k += 1) {
        console.log("Nome do Jogador:", nickname_list[k])
        //========PRIMEIRA BUSCA========
        const first_summoner = await getSummonerNickname(nickname_list[k]) //busca um jogador baseado no seu nickname
        const matches = await getMatches(first_summoner.puuid, 20)//busca uma quantidade n de partidas do jogador
        //const summoner_list = getNextSummoners() //busca uma lista de jogadores baseado na primeira partida
        const matchData = await getMatchDetails(matches[0]) //partida, detalhes e lista de jogadores
        //========PRIMEIRA BUSCA========

        // //========PROXIMAS BUSCAS========
        const insertSummonerList = []

        for (let i = 0; i < matchData.participantsList.length; i += 1) {
            try {
                const search = await Summoner.findOne({ where: { puuid: matchData.participantsList[i] } });
                if (search === null) {
                    let next_summoner = await getSummonerPuuid(matchData.participantsList[i])
                    insertSummonerList.push(next_summoner)
                }
            } catch (error) {
                console.log(error)
            }
        }
        //insere os dados enviados no banco
        insertDataToDatabase(insertSummonerList, matchData.filteredMatch, matchData.filteredMatchDetails)
        //inserindo as outras partidas
        for (let j = 1; j < matches.length; j += 1) {
            const matchData = await getMatchDetails(matches[j])
            for (let i = 0; i < matchData.participantsList.length; i += 1) {
                try {
                    const search = await Summoner.findOne({ where: { puuid: matchData.participantsList[i] } });
                    if (search === null) {
                        let next_summoner = await getSummonerPuuid(matchData.participantsList[i])
                        insertSummonerList.push(next_summoner)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            //insere os dados enviados no banco
            insertDataToDatabase(insertSummonerList, matchData.filteredMatch, matchData.filteredMatchDetails)
        }
        //========PROXIMAS BUSCAS========
    }


    res.sendStatus(200)
});

module.exports = router;
