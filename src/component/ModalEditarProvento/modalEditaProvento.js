import {useState, useEffect} from 'react';
import Modal from '../Modal/modal';
import Rotulo from '../Rotulo/rotulo';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";
import { buscarAll as buscarAllUsuario } from '../../Service/Usuario';
import { buscarAll as buscarAllTipoEntrada } from '../../Service/TipoEntrada';
import { buscarAll as buscarAllTipoMoeda } from '../../Service/TipoMoeda';


const Modaleditaprovento = ({formikProvento,showPutProvento , setShowPutProvento}) => {
  const [optionsProventoUsuario, setOptionsProventoUsuario] = useState();
  const [optionsProventoTipoEntrada, setOptionsProventoTipoEntrada] = useState();
  const [optionsProventoTipoMoeda, setOptionsProventoTipoMoeda] = useState();

  useEffect(() => {
    buscarAllUsuario().then((res) =>{
      setOptionsProventoUsuario(res.data)
    })
    buscarAllTipoEntrada().then((res) =>{
      setOptionsProventoTipoEntrada(res.data)
    })
    buscarAllTipoMoeda().then((res) =>{
      setOptionsProventoTipoMoeda(res.data)
    })
  }, []);

  function handleHide() {
    setShowPutProvento(false)
    formikProvento.resetForm();
  }

  return (
    <Modal
      type="SUBMIT"
      tamanho="850px"
      fechar={handleHide}
      visible={showPutProvento}
      titulo='Atualizar provento'
    >
      < form onSubmit = {formikProvento.handleSubmit}>
          <Rotulo nome="Valor" cols="12 4" obrigatorio>
              <InputNumber
                id="valor"
                name="valor"
                value={formikProvento.values.valor}
                onValueChange={(e) => formikProvento.handleChange(e)}
                className={classNames({ "p-invalid": isFormFieldValid("saida", formikProvento) })}
              />
              {getFormErrorMessage("saida", formikProvento)}
          </Rotulo>
          <Rotulo nome="Usuario" obrigatorio cols="12 4" >
            <Dropdown 
              id="id_usuario"
              name="usuario"
              optionLabel="nome"
              options={optionsProventoUsuario}
              value={formikProvento.values.usuario}
              onChange={(e) => formikProvento.handleChange(e)}
              placeholder="Selecione..." 
              className={classNames({ "p-invalid": isFormFieldValid("usuario", formikProvento) })} 
            />
            {getFormErrorMessage("usuario", formikProvento)}
          </Rotulo>
          <Rotulo nome="Tipo Entrada" obrigatorio cols="12 4" >
            <Dropdown 
              id="id_tipo_entrada"
              name="tipoEntrada"
              optionLabel="nome"
              options={optionsProventoTipoEntrada}
              value={formikProvento.values.tipoEntrada}
              onChange={(e) => formikProvento.handleChange(e)}
              placeholder="Selecione..." 
              className={classNames({ "p-invalid": isFormFieldValid("tipoEntrada", formikProvento) })} 
            />
            {getFormErrorMessage("tipoEntrada", formikProvento)}
          </Rotulo>
          <Rotulo nome="Tipo Moeda" obrigatorio cols="12 4" >
            <Dropdown 
              id="id_tipo_moeda"
              name="tipoMoeda"
              optionLabel="nome"
              options={optionsProventoTipoMoeda}
              value={formikProvento.values.tipoMoeda}
              onChange={(e) => formikProvento.handleChange(e)}
              placeholder="Selecione..." 
              className={classNames({ "p-invalid": isFormFieldValid("tipoMoeda", formikProvento) })} 
            />
            {getFormErrorMessage("tipoMoeda", formikProvento)}
          </Rotulo>
      </form>
    </Modal>
  );
}

export default Modaleditaprovento;