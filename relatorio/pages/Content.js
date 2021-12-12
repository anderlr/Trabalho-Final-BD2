import React, { useRef } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel'
import Api from "../services/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ReactToPrint from 'react-to-print';
import Divider from '@mui/material/Divider';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Content() {


    const [Table, setTable] = React.useState('Usuários por nome');
    const [TableList, saveTable] = React.useState([]);
    const [checkedSummoner, setCheckedSumm] = React.useState(
        {
            name: false,
            profileIconid: false,
            summonerLevel: false,
        });

    const [checkedMatches, setCheckedMatches] = React.useState(
        {
            matchid: false,
            kills: false,
            deaths: false,
            assists: false,
            championName: false,
            lane: false,
            goldEarned: false,
            win: false,
        });

    const [CheckedMatchChart, setCheckedMatchChart] = React.useState(
        {
            killsChart: false,
            deathsChart: false,
            assistsChart: false,
            goldEarnedChart: false
        });


    const [SummonerName, setName] = React.useState('');
    const [MatchId, setMatchId] = React.useState('');
    const [SummonerNumber, setNumber] = React.useState('');
    const [rowSummoners, setResult] = React.useState([]);
    const [rowsMatches, setResultMatch] = React.useState([]);
    const [rowsMatchChart, setResultMatchChart] = React.useState([])

    const handleChangeTable = (event) => {
        setTable(event.target.value);
    };

    const handleChangeSummoner = (event) => {
        setCheckedSumm({
            ...checkedSummoner,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChangeMatches = (event) => {
        setCheckedMatches({
            ...checkedMatches,
            [event.target.name]: event.target.checked,
        });

    };

    const handleChangeMatchChart = (event) => {
        setCheckedMatchChart({
            ...CheckedMatchChart,
            [event.target.name]: event.target.checked,
        });

    };



    const handleMatchId = (event) => {
        setMatchId(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleNumber = (event) => {
        setNumber(event.target.value);
    };


    const handleSubmitName = async () => {
        const api = new Api();
        checkedSummoner.SummonerName = SummonerName
        try {
            const resultado = await api.getSummonerName(JSON.stringify(checkedSummoner))
            setResult(state => [...state, {
                name: resultado.data.name,
                summonerLevel: resultado.data.summonerLevel,
                profileIconid: resultado.data.profileIconid
            }]);

        } catch (error) {
            if (error == 'Error: Request failed with status code 400') alert("Erro: Nenhuma coluna selecionada!")
        }
    }

    const handleSubmitMatches = async () => {
        const api = new Api();
        checkedMatches.summonerName = SummonerName
        try {
            const resultado = await api.getMatches(JSON.stringify(checkedMatches))
            resultado.data.map((match) => {
                if (match.win != undefined) {
                    match.win ? match.win = 'true' : match.win = 'false'
                }
                setResultMatch(state => [...state,
                    match
                ])
            })
        } catch (error) {
            if (error == 'Error: Request failed with status code 400') alert("Erro: Nenhuma coluna selecionada!")

        }
    }

    const handleSubmitNumber = async () => {
        const api = new Api();
        checkedSummoner.SummonerNumber = SummonerNumber
        try {
            const resultado = await api.getSummonerNumber(JSON.stringify(checkedSummoner))
            let insert = true
            resultado.data.map((summ) => {
                insert = true
                rowSummoners.map((row) => {
                    if (row.createdAt == summ.createdAt) {
                        insert = false
                    }
                })
                if (insert) {
                    setResult(state => [...state,
                        summ
                    ])
                }
            });

        } catch (error) {
            if (error == 'Error: Request failed with status code 400') alert("Erro: Nenhuma coluna selecionada!")
        }

    }

    const handleSubmitMatchChart = async () => {
        const api = new Api();
        CheckedMatchChart.matchid = MatchId
        try {
            const resultado = await api.getMatchChart(JSON.stringify(CheckedMatchChart))
            resultado.data.map((item) => {
                setResultMatchChart(state => [...state,
                    item
                ])
            });
        } catch (error) {
            if (error == 'Error: Request failed with status code 400') alert("Erro: Nenhuma coluna selecionada!")
        }

    }

    const { name, profileIconid, summonerLevel } = checkedSummoner;
    const { matchid, kills, deaths, assists, championName, lane, goldEarned, win } = checkedMatches;
    const { killsChart, deathsChart, assistsChart, goldEarnedChart } = CheckedMatchChart;

    const chooseTableCollumns = (table) => {
        if (table == "Usuários por nome") {
            return (
                <Grid sx={12}>
                    <Grid my={2} sx={12}><TextField onChange={handleName} id="outlined-basic" label="Nome do Invocador" variant="outlined" /></Grid>
                    <FormControl sx={12} component="fieldset" variant="standard">
                        <FormLabel component="legend">Colunas Selecionadas</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checkedSummoner={name} onChange={handleChangeSummoner} name="name" />
                                }
                                label="name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checkedSummoner={profileIconid} onChange={handleChangeSummoner} name="profileIconid" />
                                }
                                label="Profile Icon Id"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checkedSummoner={summonerLevel} onChange={handleChangeSummoner} name="summonerLevel" />
                                }
                                label="Summoner Level"
                            />
                        </FormGroup>
                        <Button variant="contained" onClick={handleSubmitName}>Buscar Invocador!</Button>
                    </FormControl>
                </Grid>

            );
        }
        if (table == "Usuários por quantidade") {
            return (
                <Grid sx={12}>
                    <Grid my={2} sx={12}><TextField onChange={handleNumber} id="outlined-basic" label="Numero total de invocadores" variant="outlined" type="number"
                        InputLabelProps={{
                            shrink: true,
                        }} /></Grid>

                    <FormControl sx={12} component="fieldset" variant="standard">
                        <FormLabel component="legend">Colunas Selecionadas</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checkedSummoner={name} onChange={handleChangeSummoner} name="name" />
                                }
                                label="name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checkedSummoner={profileIconid} onChange={handleChangeSummoner} name="profileIconid" />
                                }
                                label="Profile Icon Id"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checkedSummoner={summonerLevel} onChange={handleChangeSummoner} name="summonerLevel" />
                                }
                                label="Summoner Level"
                            />
                        </FormGroup>
                        <Button variant="contained" onClick={handleSubmitNumber}>Buscar Invocadores</Button>
                        <p>OBS:Invocadores ja inseridos nao irão aparecer!</p>
                    </FormControl>
                </Grid>

            );
        }
        if (table == "Partidas por jogador") {
            return (
                <Grid sx={12}>
                    <Grid my={2} sx={12}><TextField onChange={handleName} id="outlined-basic" label="Nome do Invocador" variant="outlined" /></Grid>
                    <FormControl sx={12} component="fieldset" variant="standard">
                        <FormLabel component="legend">Colunas Selecionadas</FormLabel>
                        <FormGroup>
                            <Grid sx={6} textAlign='left'> <FormControlLabel
                                control={
                                    <Checkbox checkedMatches={matchid} onChange={handleChangeMatches} name="matchid" />
                                }
                                label="matchid"
                            />
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={kills} onChange={handleChangeMatches} name="kills" />
                                    }
                                    label="kills"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={deaths} onChange={handleChangeMatches} name="deaths" />
                                    }
                                    label="deaths"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={assists} onChange={handleChangeMatches} name="assists" />
                                    }
                                    label="assists"
                                /></Grid>
                            <Grid sx={6} textAlign='left'>
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={championName} onChange={handleChangeMatches} name="championName" />
                                    }
                                    label="championName"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={lane} onChange={handleChangeMatches} name="lane" />
                                    }
                                    label="lane"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={goldEarned} onChange={handleChangeMatches} name="goldEarned" />
                                    }
                                    label="goldEarned"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checkedMatches={win} onChange={handleChangeMatches} name="win" />
                                    }
                                    label="win"
                                /></Grid>


                        </FormGroup>
                        <Button variant="contained" onClick={handleSubmitMatches}>Buscar Partidas!</Button>
                    </FormControl>
                </Grid>
            );
        }
        if (table == "Graficos por partida") {
            return (
                <Grid sx={6}>
                    <Grid my={2} sx={12}><TextField onChange={handleMatchId} id="outlined-basic" label="Matchid da partida" variant="outlined" /></Grid>
                    <FormControl sx={12} component="fieldset2" variant="standard">
                        <FormLabel component="legend">Colunas Selecionadas</FormLabel>
                        <FormGroup>
                            <Grid sx={12} textAlign='left'>
                                <FormControlLabel
                                    control={
                                        <Checkbox CheckedMatchChart={killsChart} onChange={handleChangeMatchChart} name="killsChart" />
                                    }
                                    label="Abates por jogador"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox CheckedMatchChart={deathsChart} onChange={handleChangeMatchChart} name="deathsChart" />
                                    }
                                    label="Mortes por jogador"
                                />
                            </Grid>
                            <Grid sx={12} textAlign='left'>
                                <FormControlLabel
                                    control={
                                        <Checkbox CheckedMatchChart={assistsChart} onChange={handleChangeMatchChart} name="assistsChart" />
                                    }
                                    label="assistsChart"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox CheckedMatchChart={goldEarnedChart} onChange={handleChangeMatchChart} name="goldEarnedChart" />
                                    }
                                    label="goldEarnedChart"
                                />
                            </Grid>
                        </FormGroup>
                        <Button variant="contained" onClick={handleSubmitMatchChart}>Buscar dados da Partida!</Button>

                    </FormControl>
                </Grid>
            );
        }
    }

    return (
        <Paper sx={12}>
            <Grid textAlign='center'>
                <Grid container spacing={1} padding={1}>
                    <Grid item xs={12}>
                        <Grid container padding={1} xs={12}>
                            <h2>Selecionar Parametros</h2>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Consulta</InputLabel>
                                <Select
                                    value={Table}
                                    label="Table"
                                    onChange={handleChangeTable}
                                >
                                    <MenuItem value={"Usuários por nome"}>Invocador por nome</MenuItem>
                                    <MenuItem value={"Usuários por quantidade"}>Invocadores por quantidade</MenuItem>
                                    <MenuItem value={"Partidas por jogador"}>Partidas por invocador</MenuItem>
                                    <MenuItem value={"Graficos por partida"}>Grafico por partida</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {chooseTableCollumns(Table)}
                    </Grid>
                    <Grid item xs={12} >
                        <Grid>
                            <h2>Consulta Atual</h2>

                            {Table == "Partidas por jogador" &&
                                resultTable([rowsMatches], Table)
                            }
                            {Table == "Graficos por partida" &&
                                resultTable([rowsMatchChart], Table)
                            }
                            {Table != "Partidas por jogador" && Table != "Graficos por partida" &&
                                resultTable([rowSummoners], Table)
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </Grid>
            <Grid sx={12} textAlign='center'>
                {resultTableFinal([rowsMatches], [rowSummoners], [rowsMatchChart])}
            </Grid>
        </Paper >
    );

}
const resultTable = (rows, table) => {
    const inputEl = useRef(null);


    if (table == "Partidas por jogador") {
        const tableCollumns = ['matchid', 'kills', 'deaths', 'assists', 'championName', 'lane', 'goldEarned', 'win']
        return (
            <Grid>
                <Grid my={5} ref={inputEl}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {tableCollumns.map((item) => (
                                        <TableCell align="center">{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows[0].map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {tableCollumns.map((key2) => (
                                                <TableCell align="center">{row[`${key2}`]}</TableCell>
                                            ))}

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid my={5}>
                        {/* <Chart></Chart> */}
                    </Grid>
                </Grid>
            </Grid >
        );
    }
    if (table == "Graficos por partida") {
        //const data = [{ match: 1, kills: 20 }, { match: 2, kills: 7 }, { match: 3, kills: 12 }, { match: 4, kills: 15 }];

        if (rows[0][0] != undefined) {
            const tableCollumns = ['name', 'kills', 'deaths', 'assists', 'goldEarned(%)']
            return (
                <Grid sx={12}>
                    <Grid sx={6}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        {tableCollumns.map((item) => (
                                            <TableCell align="center">{item}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rows[0].map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                {tableCollumns.map((key2) => (
                                                    <TableCell align="center">{row[`${key2}`]}</TableCell>
                                                ))}

                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid sx={12} ref={inputEl}>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <BarChart
                                width={500}
                                height={300}
                                data={rows[0]}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="kills" fill="#2f801f" />
                                <Bar dataKey="deaths" fill="#ba2727" />
                                <Bar dataKey="assists" fill="#8884d8" />
                                <Bar dataKey="goldEarned(%)" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid >
                </Grid>
            );
        }

    }
    else {
        const tableCollumns = ['name', 'Summoner Level', 'Profile Icon Id']
        return (
            <Grid>
                <Grid my={5} ref={inputEl}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {tableCollumns.map((item) => (
                                        <TableCell align="center">{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows[0].map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.summonerLevel}</TableCell>
                                        <TableCell align="center">{row.profileIconid}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid my={5}>
                        {/* <Chart></Chart> */}
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}

const resultTableFinal = (rowsMatches, rowSummoners, rowsMatchChart) => {

    const inputEl2 = useRef(null);
    return (
        <Grid>
            <Grid sx={12} ref={inputEl2}>
                <Grid my={5} sx={12} textAlign={'center'}>
                    <h1>Relatorio Final</h1>
                </Grid>
                <Grid px={1} textAlign={'center'}>
                    <h2>Usuários Consultados</h2>
                    <Divider />
                    {resultTable(rowSummoners, "Usuários por nome")}
                </Grid>
                <Grid px={1} textAlign={'center'}>
                    <h2>Partidas Consultadas</h2>
                    <Divider />
                    {resultTable(rowsMatches, "Partidas por jogador")}
                </Grid>
                <Grid px={1} textAlign={'center'}>
                    <h2>Detalhes da Partida</h2>
                    <Divider />
                    {resultTable(rowsMatchChart, "Graficos por partida")}
                </Grid>
            </Grid >
            <Grid py={2}>
                <ReactToPrint trigger={() => <Button variant="contained">Exportar em PDF</Button>}
                    content={() => inputEl2.current}>
                </ReactToPrint>
            </Grid>
        </Grid>
    );
}



