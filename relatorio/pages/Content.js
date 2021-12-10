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
import Chart from './Chart'
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

export default function Content() {

    const [Table, setTable] = React.useState('');
    const [Atributes, setAtributes] = React.useState('');
    const [checked, setChecked] = React.useState(
        {
            name: true,
            profileIconid: false,
            summonerLevel: false,
        });

    const [SummonerName, setName] = React.useState('');
    const [rows, setResult] = React.useState(
        {
            name: '',
            summonerLevel: 0,
            profileIconid: 0
        }
    );

    const handleChangeTable = (event) => {
        setTable(event.target.value);
    };

    const handleChangeAtribute = (event) => {
        setAtributes(event.target.value);
    };

    const handleChange = (event) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
        console.log(checked.name)
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async () => {
        const api = new Api();
        checked.SummonerName = SummonerName
        const resultado = await api.getSummoner(JSON.stringify(checked))
        console.log(resultado)
        setResult(prevState => ({
            ...prevState,
            name: resultado.data.name,
            summonerLevel: resultado.data.summonerLevel,
            profileIconid: resultado.data.profileIconid
        }))
    }

    const { name, profileIconid, summonerLevel } = checked;


    const chooseTableCollumns = (table) => {
        if (table == "Usuário") {

            return (
                <Grid sx={12}>
                    <Grid my={2} sx={12}><TextField onChange={handleName} id="outlined-basic" label="Nome do Invocador" variant="outlined" /></Grid>
                    <FormControl sx={12} component="fieldset" variant="standard">
                        <FormLabel component="legend">Colunas Selecionadas</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={name} onChange={handleChange} name="name" />
                                }
                                label="name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={profileIconid} onChange={handleChange} name="profileIconid" />
                                }
                                label="Profile Icon Id"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={summonerLevel} onChange={handleChange} name="summonerLevel" />
                                }
                                label="Summoner Level"
                            />
                        </FormGroup>
                        <Button variant="contained" onClick={handleSubmit}>Buscar Invocador!</Button>
                    </FormControl>
                </Grid>

            );
        }
        if (table == "Partidas") {
            return (
                <Grid container padding={1} xs={12} textAlign='center'>
                    <Grid item xs={12}><p>Ouro dos jogadores : _____</p></Grid>
                    <Grid item xs={12}> <p>Busca dados da partida, podendo eliminar a coluna que desejar</p></Grid>
                    <Grid item xs={12}><p>Mostra os jogadores, suas lanes e os campeões escolhidos</p></Grid>
                </Grid>
            );
        }
    }

    return (
        <Paper >
            <Grid textAlign='center'>
                <Grid container spacing={1} padding={1}>
                    <Grid item xs={6}>
                        <Grid container padding={1} xs={12}>
                            <h2>Selecionar Parametros</h2>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tabela</InputLabel>
                                <Select
                                    value={Table}
                                    label="Table"
                                    onChange={handleChangeTable}
                                >
                                    <MenuItem value={"Usuário"}>Usuário</MenuItem>
                                    <MenuItem value={"Invocadores"}>Invocadores</MenuItem>
                                    <MenuItem value={"Detalhes de partida"}>Detalhes de partida</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {chooseTableCollumns(Table)}
                    </Grid>
                    <Grid item xs={6} >
                        <Grid>
                            <h2>Resultados</h2>
                            {resultTable([rows])}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >




    );
}

const resultTable = (rows) => {
    console.log("rows", rows)
    const inputEl = useRef(null);
    return (
        <Grid>
            <Grid my={5} ref={inputEl}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">name</TableCell>
                                <TableCell align="center">Summoner Level</TableCell>
                                <TableCell align="center">Profile Icon Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
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
                    <Chart></Chart>
                </Grid>
            </Grid>


            <ReactToPrint
                trigger={() => <Button variant="contained">Exportar em PDF</Button>}
                content={() => inputEl.current}
            />
        </Grid >
    );
}