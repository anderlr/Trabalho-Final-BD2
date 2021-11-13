var express = require('express');
var router = express.Router();
const axios = require('axios');
const Rockets = require('../models/rocket');
const Launches = require('../models/launches');

const getLaunchpads = async () => {
    const filteredDataLaunchpads = []
    const { data: launchpads } = await axios.get(`https://api.spacexdata.com/v4/launchpads`)
    launchpads.forEach(
        (launchpad) => {
            filteredDataLaunchpads.push({
                id: launchpad.id,
                name: launchpad.name,
                locality: launchpad.locality,
                region: launchpad.region,
                latitude: launchpad.latitude,
                longitude: launchpad.longitude
            })
        }

    )
    return filteredDataLaunchpads
}

const getRockets = async () => {
    const filteredDataRockets = []
    const { data: rockets } = await axios.get(`https://api.spacexdata.com/v4/rockets`)
    rockets.forEach(
        (rocket) => {
            filteredDataRockets.push({
                id: rocket.id,
                name: rocket.name,
                height: rocket.height.meters,
                mass: rocket.mass.kg,
                stages: rocket.stages,
                first_flight: rocket.first_flight
            })
        }

    )
    return filteredDataRockets
}

const getLaunches = async () => {
    const filteredDataLaunch = []
    const { data: launch } = await axios.get(`https://api.spacexdata.com/v4/launches`)
    launch.forEach(
        (launch) => {
            filteredDataLaunch.push({
                id: launch.id,
                flight_number: launch.flight_number,
                name: launch.name,
                date: launch.date_utc,
                success: launch.success,
                id_rocket: launch.rocket,
                id_launchpad: launch.rocket
            })
        }
    )
    return filteredDataLaunch
}



// Rota padrao
router.get('/', async (req, res) => {
    const rockets = await getRockets() //busca os foguetes
    const launchpads = await getLaunchpads()//busca os launchpads
    const launches = await getLaunches()

    //console.log("rockets data:", rockets.length)
    //console.log(launches)
    //console.log(rockets)
    //console.log(launchpads)

    rockets.forEach((rkt) => {
        Rockets.create(rkt);
    })

    launches.forEach((lnc) => {
        Launches.create(lnc);
    })

    res.status(200).send(launchpads)
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About Rockets!');
});

module.exports = router;
