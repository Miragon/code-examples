import React, {useState} from "react";
import {Divider, Grid, TextField, Typography} from "@material-ui/core";
import {NewProjectTO} from "../../api/models";
import Aux from "../../hoc/Aux/Aux";
import {NavLink} from "react-router-dom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import * as projectActions from "../../store/actions/projects"
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";


const ProjectAddPage :React.FC= () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [street, setStreet] = useState("");
    const [plz, setPlz] = useState("");
    const [customer, setCustomer] = useState("");


    const changeStreet = (event: any) => {
        setStreet(event.target.value);
    }

    const changePlz = (event:any) => {
        setPlz(event.target.value);
    }

    const changeCustomer = (event:any) => {
        setCustomer(event.target.value);
    }

    async function Button(){
        const address = ["",""];
        address[0] = street;
        address[1] = plz;
        const createProject: NewProjectTO = {customer:customer, address:address.join(', ')};
        dispatch(projectActions.createProject(createProject));
        history.push("/projects");
    }


    return(
        <Aux>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <NavLink to="/projects">
                        <ArrowBackRoundedIcon/>
                    </NavLink>
                </Grid>
                <Grid item xs={3} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h3">{"Neues Project Anlegen"}</Typography>
                </Grid>
                <Grid item xs={3} style={{position: "absolute", right: 20}} onClick={Button} >
                    <SaveRoundedIcon/>
                </Grid>
            </Grid>
            <Divider/>
            <div  style={{marginTop: 20, marginBottom: 20}}>
                <Typography variant={"h5"}>Addresse:</Typography>
                <Grid container spacing={3} style={{marginTop:10}}>
                    <Grid item xs={6}>
                        <TextField  onChange={changeStreet} label={"Straße und Hausnummer"} value={street} variant={"outlined"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={changePlz} variant={"outlined"} label={"Ort und Plz"} value={plz}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  onChange={changeCustomer} variant={"outlined"} label={"Kunde"} value={customer}/>
                    </Grid>
                </Grid>
            </div>
            <Divider/>
        </Aux>
    );

}

export default ProjectAddPage;