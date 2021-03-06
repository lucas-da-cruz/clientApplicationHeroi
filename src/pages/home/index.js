import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Loading from './../../components/loading';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import ServiceHome from './serviceHome';
import {InputText} from 'primereact/inputtext';
import {Messages} from 'primereact/messages';

export default function Home() {

  let dt = useRef(null);
  let messages = useRef(null);

  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [herois, setHerois] = useState([]);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [idParaDesativar, setIdParaDesativar] = useState(false);


  useEffect(() => {
    ServiceHome.findAllHerois().then(response => {
      if(response.status === 200){
          response.json().then(data => {
            setHerois(data)
          }).catch((erro) => {
              console.log("Erro: " + erro);
          });
      }
    }).catch(erro => {
        console.log(erro.response);
    });
    window.setTimeout(function() {
      setLoading(false);
    }, 3000);
  }, []);

  const visualizarHeroi = (rowData) => {
    return <div>
      <Link to={'/heroi/' + rowData.id}>
        <Button type="button" icon="pi pi-search"className="p-button-success" style={{marginRight: '.5em'}}></Button>
      </Link>
    </div>;
  };

  const desativarHeroi = (rowData) => {
    return <div>
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-danger"
          style={{marginRight: '.5em'}}
          onClick={() => onClick(rowData.id)}></Button>
    </div>;
  };

  const onClick = (rowData) => {
    setIdParaDesativar(rowData);
    setDisplayConfirmation(true);
  }

  const onHide = () => {
    setDisplayConfirmation(false);
  }

  const desativaHeroi = () => {
    setDisplayConfirmation(false);
    setLoading(true);
    ServiceHome.alteraStatus(idParaDesativar).then(response => {
      if(response.status === 200){
        showSuccess();
        refreshTable();
      } else {
        showError();
        setLoading(false);
      }
    }).catch(erro => {
        showError();
        console.log(erro.response);
    });
    window.setTimeout(function() {
      setLoading(false);
    }, 3000);
    setIdParaDesativar();
  }

  const refreshTable = () => {
    ServiceHome.findAllHerois().then(response => {
      if(response.status === 200){
          response.json().then(data => {
            setHerois(data)
          }).catch((erro) => {
              console.log("Erro: " + erro);
          });
      }
    }).catch(erro => {
        console.log(erro.response);
    });
    window.setTimeout(function() {
      setLoading(false);
    }, 3000);
  }

  const renderFooter = (name) => {
    return (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
            <Button label="Desativar" icon="pi pi-check" onClick={() => desativaHeroi()} autoFocus />
        </div>
    );
  }

  const header = (
    <div style={{'textAlign':'left'}}>
        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquisa geral" size="25"/>
    </div>
  );

  const showSuccess = () => {
    messages.current.show({severity: 'success', summary: 'Herói desativado com sucesso!'});
  };

  const showError = () => {
      messages.current.show({severity: 'error', summary: 'Ops, algo de inesperado aconteceu'});
  };

  const paginatorRight = 
  <Link to="/heroiDesativado">
    <Button type="button" icon="pi pi-trash" label="Heróis desativados" className="p-button-text" />
  </Link>;

  return (
    <div>
      <Container>
        <br/>
        <center>
          <h2>Heróis cadastrados</h2>
        </center>
      <Messages ref={messages} />
      { loading ? 
      <Loading/> :
        <div>
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
              <DataTable 
                ref={dt}
                value={herois}
                paginator={true}
                rows={10}
                header={header}
                globalFilter={globalFilter}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords}"
                rowsPerPageOptions={[10,20,50]}
                paginatorRight={paginatorRight}
                emptyMessage="Nenhum herói encontrado">
                  <Column field="id" header="ID" sortable filter={true} filterPlaceholder="ID" style={{textAlign:'center', width: '6em'}}/>
                  <Column field="nome" header="Nome" sortable filter={true} filterPlaceholder="Nome"/>
                  <Column field="universo.nome" header="Universo" sortable filter={true} filterPlaceholder="Universo"/>
                  <Column body={visualizarHeroi} style={{textAlign:'center', width: '4em'}}/>
                  <Column body={desativarHeroi} style={{textAlign:'center', width: '4em'}}/>
              </DataTable>
            </Col>
          </Row>
          <br/><br/><br/><br/><br/><br/>
          </div>
      }
      </Container>
    </div>
  );
}