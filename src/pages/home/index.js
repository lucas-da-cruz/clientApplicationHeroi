import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Loading from './../../components/loading';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';

export default function Home() {

  const {register, handleSubmit, errors} = useForm();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log("Iniciando");
  });

  const onSubmit = data => {

  };

  return (
    <div>
      { loading ? 
      <Loading/> :
      <Container>
        <br/>
          <center><h2>Seus heróis cadastrados</h2></center><br/><br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
            <Col>
              <Link to="/insertHeroi">
                <Button label="Adicionar um novo herói" icon="pi pi-plus" iconPos="left" className="p-button-primary"/>
              </Link>
            </Col>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
            <Col>
              <DataTable /*ref={dt} value={consulta}*/ paginator={true} rows={10} /*header={header}*/
                  globalFilter={globalFilter} emptyMessage="Nenhum herói encontrado">
                    <Column field="id" header="ID" sortable filter={true} filterPlaceholder="ID" style={{textAlign:'center', width: '6em'}}/>
                    <Column field="nome" header="Nome" sortable filter={true} filterPlaceholder="Nome"/>
                    <Column field="universo" header="Universo" sortable filter={true} filterPlaceholder="Universo"/>
                    <Column header="+" /*body={visualizarConsulta}*/ style={{textAlign:'center', width: '4em'}}/>
              </DataTable>
              </Col>
            </Row>
          </form>
          <br/><br/><br/>
      </Container>
      }
    </div>
  );
}