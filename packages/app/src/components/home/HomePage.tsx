import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { Header, ItemCardGrid, ItemCardHeader } from '@backstage/core-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MyCustomLogoFull from '../home/image/Logo_preto.png';


const useStyles = makeStyles({
    img:{
      height: 150,
      margin: 50
    },
    grid: {
      //gridTemplateColumns: 'repeat(4, 12em)',
      marginTop: 20,
      marginLeft: 20,

    },
  });

  const text = 'Bem vindo ao portal de desenviolvedor do Go Visit, um aplicativo Backstage criado com o intuito de gerenciar as funcoes do projeto.';
  const catalogo = 'O portal possui um catálogo de serviços presentes no projeto...';
  const apis = 'O app possui também um catalogo de APIs resgistradas para teste de chamdas de endpoints, cada uma separada por funcoes, equipes e funcionalidades.';

export const HomePage = () => {

  const classes = useStyles();

  return (
    <Grid>
      <Grid item xs={12}>
        <Header title='Go Visit Backstage App' subtitle='Portal de desenvolvedor do Go Visit' />
      </Grid>
      <Grid container justifyContent="center" spacing={6}>
        <img src={MyCustomLogoFull} className={classes.img} />
     </Grid>
     <Grid container justifyContent="center" spacing={3} direction="row"> 
     <ItemCardGrid >
        <Card key={'bemVindo'} className={classes.grid} >
          <CardMedia>
            <ItemCardHeader title={`Bem Vindo`}/>
          </CardMedia>
          <CardContent>
            {text}
          </CardContent>
        </Card>
        <Card key={'catalog'} className={classes.grid}>
          <CardMedia>
            <ItemCardHeader title={`Catálogo`}/>
          </CardMedia>
          <CardContent>
            {catalogo}
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
        <Card key={'bemVindo'} className={classes.grid}>
          <CardMedia>
            <ItemCardHeader title={`API's`}/>
          </CardMedia>
          <CardContent>
            {apis}
          </CardContent>
          <CardActions> 
          </CardActions>
        </Card>
      </ItemCardGrid>
     </Grid>
    </Grid>
  );
};
