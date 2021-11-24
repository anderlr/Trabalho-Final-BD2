var express = require('express');
var router = express.Router();
const axios = require('axios');
const Rockets = require('../models/summoner');
const Launches = require('../models/match');

const api_key = "RGAPI-4911e800-c09b-4b4d-8043-ccce4a8105b9"
const username = "edwardbunker"
const puuid = "_7d_-Qcfk2HF0Ad6ZEZ5XyTdSU_wpdombMr_kCgZJL-DNnYqRcEMduMSlXJ0pJDV7BI1v-Ix8SKYOw"
// const config = {
//     headers: {
//         "Content-Type": "application/json",
//     },
// };

// axios.defaults.headers.common = {
//     authorization: "RGAPI-4911e800-c09b-4b4d-8043-ccce4a8105b9"
// };



const getSummoners = async () => {
    const filteredDataSummoners = []

    const { data: summoners } = await axios({
        method: "get",
        url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${api_key}`
    });
    console.log(summoners)


    // summoners.forEach(
    //     (summoner) => {
    //         filteredDataRockets.push({
    //             id: rocket.id,
    //             name: rocket.name,
    //             height: rocket.height.meters,
    //             mass: rocket.mass.kg,
    //             stages: rocket.stages,
    //             first_flight: rocket.first_flight
    //         })
    //     }

    // )

    return filteredDataSummoners
}

const getMatches = async () => {
    const filteredDataMatches = []

    const { data: matches } = await axios({
        method: "get",
        url: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`
    });
    console.log(matches)


    // const { data: launchpads } = await axios.get(`https://api.spacexdata.com/v4/launchpads`)
    // launchpads.forEach(
    //     (launchpad) => {
    //         filteredDataLaunchpads.push({
    //             id: launchpad.id,
    //             name: launchpad.name,
    //             locality: launchpad.locality,
    //             region: launchpad.region,
    //             latitude: launchpad.latitude,
    //             longitude: launchpad.longitude
    //         })
    //     }

    // )
    return filteredDataMatches
}



// Rota padrao
router.get('/', async (req, res) => {
    const summoners = await getSummoners() //busca os jogadores
    const matches = await getMatches()//busca as partidas

    // 1 - com o nick de alguem pega o puuid
    // 2 - com o puuid busca o id de uma partida
    // 3 - com o id da partida busca essa partida
    // 4 - insere partida
    // 5 - pra cada usuario, insere ele e o tupla na tabela match_summ_details

    // const launches = await getLaunches()

    //console.log("rockets data:", rockets.length)
    //console.log(launches)
    //console.log(rockets)
    //console.log(launchpads)

    // rockets.forEach((rkt) => {
    //     Rockets.create(rkt);
    // })

    // launches.forEach((lnc) => {
    //     Launches.create(lnc);
    // })

    // res.status(200).send(launchpads)

    res.sendStatus(200)
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About Rockets!');
});

module.exports = router;