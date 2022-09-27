
import './App.css';
import React from 'react';
import { Component } from 'react';
import { PersonService } from './service/personService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/nova/theme.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {Menubar} from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { Toast } from 'primereact/toast';


export default class App extends Component {
  constructor() {
    super();

    this.Toast = React.createRef();
    this.state = {
      visible : false,
      persona: {
        id: null,
        firstName: null,
        lastName: null,
        address: null,
        phone : null
      }};
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => {this.showSaveDialog()}
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {this.showSaveDialog()}
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => {this.showSaveDialog()}
      }
    ];
    this.personService = new PersonService();
    this.save= this.save.bind(this);
   
    this.footer = (
<div>
  <Button label="Save" icon="pi pi-check" onClick={this.save}></Button>
</div>
    );
   

  }
  componentDidMount() {
    this.personService.getAll().then(data => this.setState({ personas: data }))
  }
save(){
  this.personService.save(this.state.persona).then(data=>{
   
    this.setState({
      visible : false,
      persona: {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono : null
      }
    });
    
    this.Toast.current.show({

      severity: "success",
      summary: "Atention!",
      detail: "the save successful.",
    });
    this.personService.getAll().then(data => this.setState({ personas: data }))
   console.log(data);

  })
}

  render() {
    return (
      <div style={{ width: '80%', marginTop: '20%', margin: '0 auto' }}>
        <Menubar model={this.items} />


        <Panel header="React Java Applications" >
          <DataTable value={this.state.personas}>
            <Column field="personId" header="ID"></Column>
            <Column field="firstName" header="FirstName"></Column>
            <Column field="lastName" header="LastName"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="phone" header="Phone"></Column>
          </DataTable>
        </Panel>
        
        <Dialog header="Create Person" visible={this.state.visible} footer= {this.footer} style={{ width: '500px' }}  modal={true} onHide={() => this.setState({ visible: false })}>
        <span className="p-float-label">
          <InputText style={{width : '100%'}} value={this.state.value} id="firstName" onChange={(e) => {
            let val = e.target.value;
          
            this.setState(prevState => {
              let persona = Object.assign({}, prevState.persona);
              persona.firstName = val

              return { persona };
            })}}/>          
            <label htmlFor="firstName">FirstName</label>
        </span>
        <br/>
        <span className="p-float-label">
          <InputText style={{width : '100%'}} value={this.state.value} id="lastName" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
              let persona = Object.assign({}, prevState.persona);
              persona.lastName = val

              return { persona };
            })}}/>
            
          
            <label htmlFor="lastName">LastName</label>
        </span>
        <br/>
        <span className="p-float-label">
          <InputText style={{width : '100%'}} value={this.state.value} id="address" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
              let persona = Object.assign({}, prevState.persona);
              persona.address = val

              return { persona };
            })}}/>
            
          
            <label htmlFor="address">Address</label>
        </span>
        <br/>
        <span className="p-float-label">
          <InputText style={{width : '100%'}} value={this.state.value} id="phone" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
              let persona = Object.assign({}, prevState.persona);
              persona.phone = val
              return { persona };
            })}}/>
            <label htmlFor="phone">Phone</label>
        </span>
        <br/>
        </Dialog>
        <Toast ref={this.Toast} />
       
      </div>
    );
  }
  showSaveDialog() {
    this.setState({
      visible: true,
      persona : {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono : null
      }
    });
    document.getElementById('persona-form').reset();
  }
}

