import * as React from 'react';
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

export default function Content() {

    const [Table, setTable] = React.useState('');

    const [Atributes, setAtributes] = React.useState('');
    const [checked, setChecked] = React.useState(
        {
            Name: true,
            ProfileIconId: false,
            SummonerLevel: false,
        });
    const [SummonerName, setName] = React.useState('');
    const [RetornoAPI, setResult] = React.useState('');

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
        console.log(checked.Name)
    };

    const handleName = (event) => {
        setName(event.target.value);
    };



    const handleSubmit = async () => {
        const api = new Api();
        checked.SummonerName = SummonerName
        const resultado = await api.getSummoner(checked)

        console.log(resultado.data)
        setResult(resultado.data.summonerLevel);


    }

    const { Name, ProfileIconId, SummonerLevel } = checked;


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
                                    <Checkbox checked={Name} onChange={handleChange} name="Name" />
                                }
                                label="Name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={ProfileIconId} onChange={handleChange} name="ProfileIconId" />
                                }
                                label="Profile Icon Id"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={SummonerLevel} onChange={handleChange} name="SummonerLevel" />
                                }
                                label="Summoner Level"
                            />
                        </FormGroup>
                        <Button variant="contained" onClick={handleSubmit}>Buscar Invocador!</Button>
                    </FormControl>
                    <h2>Resultado:{RetornoAPI}</h2>
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
        <Paper>
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
                            <Chart></Chart>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Paper >




    );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Checkbox from '@mui/material/Checkbox';

// export default function CheckboxesGroup() {
//     const [state, setState] = React.useState({
//         Name: true,
//         ProfileIconId: false,
//         SummonerLevel: false,
//     });

//     const handleChange = (event) => {
//         setState({
//             ...state,
//             [event.target.name]: event.target.checked,
//         });
//     };

//     const { Name, ProfileIconId, SummonerLevel } = state;

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//                 <FormLabel component="legend">Assign responsibility</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={Name} onChange={handleChange} name="Name" />
//                         }
//                         label="Name"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={ProfileIconId} onChange={handleChange} name="ProfileIconId" />
//                         }
//                         label="Profile Icon Id"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={SummonerLevel} onChange={handleChange} name="SummonerLevel" />
//                         }
//                         label="Summoner Level"
//                     />
//                 </FormGroup>
//                 <FormHelperText>Be careful</FormHelperText>
//             </FormControl>
//         </Box>
//     );
// }
