import React, {useEffect, useState} from "react";
import Aux from "../../hoc/Aux/Aux";
import {Grid, Typography,TextField, Divider} from "@material-ui/core";
import {NavLink, useParams} from "react-router-dom";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import {ProjectTO, UpdateProjectTO} from "../../api/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/Store";
import * as projectActions from "../../store/actions/projects";
import {useHistory} from "react-router";

interface ProjectDetail{
    projectId: string
}

const ProjectEditPage: React.FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [street, setStreet] = useState("test");
    const [plz, setPlz] = useState("test");
    const [customer, setCustomer] = useState("test");
    const [par, setPar] = useState<ProjectTO>({id:"p0", address:"test,test", customer:"test"});
    const params = useParams<ProjectDetail>();
    const proID= params.projectId;
    const projects: Array<ProjectTO> = useSelector((state: RootState) => state.projects.allProjects)

    useEffect(() =>{
        dispatch(projectActions.fetchProjects())
    },[dispatch])

    useEffect(()=>{
        for(let i =0; i<projects.length; i++) {
            if (projects[i].id === proID) {
                setPar(projects[i]);
                setCustomer(projects[i].customer);
                setPlz(projects[i].address.split(',')[1]);
                setStreet(projects[i].address.split(',')[0])
            }
        }
    },[proID, projects])


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
        const update:UpdateProjectTO = {customer:customer, address:address.join(", ")};
        dispatch(projectActions.updateProject(proID, update));
        history.push(`/project/${proID}`);
    }

    return(
        <Aux>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <NavLink to={`/project/${proID}`}>
                        <ArrowBackRoundedIcon/>
                    </NavLink>
                </Grid>
                <Grid item xs={3} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h3">{par.customer}</Typography>
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

export default ProjectEditPage;