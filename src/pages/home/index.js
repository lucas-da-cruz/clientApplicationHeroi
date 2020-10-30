import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Loading from './../../components/loading';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

export default function Home() {

  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);

  useEffect(() => {
    console.log("Iniciando");
  });

  const visualizarHeroi = (rowData) => {
    return <div>
      <Link to={'/heroi/' + rowData.id}>
        <Button type="button" icon="pi pi-search"className="p-button-success" style={{marginRight: '.5em'}}></Button>
      </Link>
    </div>;
  };

  /*const dialogFuncMap = {
    'displayConfirmation': setDisplayConfirmation
  }*/

  const onClick = () => {
    setDisplayConfirmation(true);
  }

  const onHide = (confirm) => {
    console.log(confirm);
    setDisplayConfirmation(false);
  }

  const renderFooter = (name) => {
    return (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => onHide(false)} className="p-button-text" />
            <Button label="Desativar" icon="pi pi-check" onClick={() => onHide(true)} autoFocus />
        </div>
    );
  }

  return (
    <div>
      { loading ? 
      <Loading/> :
      <Container>
        <br/>
          <center>
            <h2>Heróis cadastrados</h2>
          </center>

          <Button label="Confirm" icon="pi pi-external-link" onClick={() => onClick('displayConfirmation')} />
            <Dialog 
              header="Confirmação"
              visible={displayConfirmation}
              modal
              style={{ width: '350px' }}
              footer={renderFooter('displayConfirmation')}
              onHide={() => onHide('displayConfirmation')}>

                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    <span>Você tem certeza que deseja desativar esse herói?</span>
                </div>

            </Dialog>
          <br/><br/>

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
                    <Column body={visualizarHeroi} style={{textAlign:'center', width: '4em'}}/>
                    <Column /*body={visualizarConsulta}*/ style={{textAlign:'center', width: '4em'}}/>
              </DataTable>
              </Col>
          </Row>
          <br/><br/><br/>
      </Container>
      }
    </div>
  );
}