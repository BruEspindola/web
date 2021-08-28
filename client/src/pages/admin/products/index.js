import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import Swal from 'sweetalert2';

import api from '../../../services/api';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%'
  },
  colorTable: {
    color: 'white',
    backgroundColor: '#3f51b5',
    textAlign: 'center'
  }
}));

export default function ProductsList() {
  const classes = useStyles();

  const [product, setProduct] = useState([]);

  useEffect(() => {

    async function loadProducts() {
      const res = await api.get("/api/product");
      setProduct(res.data)
    }
    loadProducts();
  }, []);

  function handleDelete(id) {
    Swal.fire({
      title: 'Deseja excluir produto?',
      icon: 'warning',
      confirmButtonText: 'Sim, excluir',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete('/api/product/' + id);
        window.location.href = '/admin/products'
        Swal.fire(
          'Excluido!',
          'Produto excluido.',
          'success'
        )
      }
    })
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Listagem Produtos'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Button style={{marginTop:5}} variant="contained" color="secondary" href={'/admin/products/register'}>
              Cadastrar
            </Button>
            <Paper className={classes.paper}>
              <h2>Listagem de Produtos</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.colorTable}>id</TableCell>
                          <TableCell className={classes.colorTable}>Nome</TableCell>
                          <TableCell className={classes.colorTable}>País</TableCell>
                          <TableCell className={classes.colorTable}>Preço médio</TableCell>
                          <TableCell className={classes.colorTable}>Tipo</TableCell>
                          <TableCell className={classes.colorTable} align="center">Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                              <TableCell align="left">{row._id}</TableCell>

                            </TableCell>
                            <TableCell align="center" >{row.nameWine}</TableCell>
                            <TableCell align="center">{row.country}</TableCell>
                            <TableCell align="center">R${row.priceAvg}</TableCell>
                            <TableCell align="center"><Chip color="primary" label={row.type} /></TableCell>

                            <TableCell align="right" >
                              <ButtonGroup aria-label="contained primary button group">
                                <Button color="primary" href={'/admin/products/edit/' + row._id}>Editar</Button>
                                <Button color="secondary" onClick={() => handleDelete(row._id)}>Excluir</Button>
                              </ButtonGroup></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
