import React, {useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import {Button} from 'primereact/button';
import Loading from '../../components/loading';
import {Link} from 'react-router-dom';
import ServiceGetHeroi from './serviceGetHeroi';
import ServiceInsertHeroi from './../insertHeroi/serviceInsertHeroi';


export default function DetalheHeroi() {
    const { register, handleSubmit, errors } = useForm();
    const [selectedPoder, setSelectedPoder] = useState([]);
    const [selectedUniverso, setSelectedUniverso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avisoPoder, setAvisoPoder] = useState(false);
    const [avisoUniverso, setAvisoUniverso] = useState(false);
    const [heroi, setHeroi] = useState([]);
    const [poderes, setPoderes] = useState([]);
    const [universo, setUniverso] = useState([]);

    useEffect(() => {
      var url = window.location.pathname;
      var idHeroi = url.split("/")[2];
      ServiceInsertHeroi.findAllUniverso().then(response => {
        if(response.status === 200){
            response.json().then(data => {
              setUniverso(data);
            }).catch((erro) => {
              console.log("Erro: " + erro);
            });
        }
      }).catch(erro => {
        console.log(erro.response);
      });

      ServiceInsertHeroi.findAllPoderes().then(response => {
          if(response.status === 200){
              response.json().then(data => {
                  setPoderes(data);
              }).catch((erro) => {
                  console.log("Erro: " + erro);
              });
          }
        }).catch(erro => {
          console.log(erro.response);
      });

      ServiceGetHeroi.getHeroi(idHeroi).then(response =>
        response.json().then(data => {
          console.log(data);
          setHeroi(data);
        }).catch((erro) => {
            console.log("Erro: " + erro);
        })
      ).catch((erro) => {
        console.log(erro);
      });
  
      window.setTimeout(function() {
        setLoading(false);
      }, 1500);
    }, []);

    const onSubmit = data => {
      if(selectedPoder.length === 0){
          setAvisoPoder(true);
          console.log("gera mensagem selectedPoder");
          return;
      }
      setAvisoPoder(false);
      if(selectedUniverso === null){
          setAvisoUniverso(true);
          console.log("gera mensagem selectedUniverso");
          return;
      }
      setAvisoUniverso(false);
      data.universo = selectedUniverso;
      data.poder = selectedPoder;
      console.log(data);
    };

    const onCountryChange = (e) => {
        setSelectedUniverso(e.value);
    }

    const selectedUniversoTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.nome}</div>
                </div>
            );
        }
    return (
        <span>
            {props.placeholder}
        </span>
    );
    }

    const universoOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.nome}</div>
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
                    <h2>Detalhes Herói</h2>
                </center><br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="justify-content-md-center">
                        <Col lg={6} md={10}>
                            <center>
                                <Form.Label className="required">Nome</Form.Label>
                                    <Form.Control
                                    id="nome"
                                    name="nome"
                                    defaultValue={heroi.nome}
                                    type="text"
                                    maxLength="50"
                                    ref={register({required:true, maxLength: 50})}
                                    placeholder="Insira aqui nome do herói"/>
                                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span>}
                            </center>
                            <br/>
                        </Col>
                        <Col lg={6} md={10}>
                          <center>
                            <Form.Label className="required">Data de cadastro</Form.Label>
                              <Form.Control
                                type="text"
                                maxLength="50"
                                ref={register({required:true, maxLength: 50})}
                                placeholder="dd/mm/aaaa"
                                disabled={true}/>
                          </center>
                          <br/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col lg={6} md={10}>
                        <center>
                          <Form.Label className="required">Poder</Form.Label><br/>
                            <MultiSelect
                              id="poder"
                              name="poder"
                              options={poderes}
                              value={heroi.poder}
                              onChange={(e) => setSelectedPoder(e.value)}
                              optionLabel="nome"
                              placeholder="Selecione um poder"/>
                              <br/>
                            {avisoPoder ?
                            <span className="alertField">Pelo menos um poder deve ser selecionado</span>
                            : null}
                        </center>
                        <br/>
                      </Col>
                      <Col lg={6} md={10}>
                          <center>
                            <Form.Label className="required">Universo</Form.Label><br/>
                              <Dropdown
                                id="universo"
                                name="universo"
                                value={heroi.universo}
                                options={universo}
                                onChange={onCountryChange}
                                optionLabel="nome"
                                filter
                                showClear
                                filterBy="nome"
                                placeholder="Selecione um universo"
                                valueTemplate={selectedUniversoTemplate} 
                                itemTemplate={universoOptionTemplate} />
                                <br/>
                              {avisoUniverso ?
                              <span className="alertField">Um universo deve ser selecionado</span>
                              : null}
                          </center>
                          <br/>
                      </Col>
                    </Row>
                    <br/><br/>
                    <Row lg={6} className="justify-content-md-center">
                      <Col>
                          <center>
                            <Link to="/heroi">
                              <Button 
                                label="Voltar"
                                size="45"
                                className="p-button-secondary"
                              />
                            </Link>
                            </center>
                        </Col>
                      <Col>
                        <center>
                          <Button 
                            label="Atualizar"
                            size="45"
                            className="p-button-primary"
                            type="submit"/> 
                        </center>
                      </Col>
                    </Row>
                </form>
                <br/><br/><br/>
            </Container>
        }
        </div>
    );
}
