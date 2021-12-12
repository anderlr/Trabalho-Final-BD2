import * as axios from "axios";

export default class Api {
    constructor() {
        this.api_url = "http://localhost:5000";
    }

    init = () => {
        let headers = {
            Accept: "application/json",
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getSummonerName = (params) => {
        return this.init().get("/summoner", { params: params });
    };

    getSummonerNumber = (params) => {
        return this.init().get("/summonerNumber", { params: params });
    };

    getMatches = (params) => {
        return this.init().get("/matches", { params: params });
    }
}