import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const registro_contract = require('../../../build/contracts/Zagite.json');

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre : string;
  apellido: string;
  email: string;
  contrasena: string; 
  tipo: string;
  registroContract: any;
  status: string;	
  accounts: string[];
  account: string;
  
  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    this.watchAccount(); 	
    this.web3Service.artifactsToContract(registro_contract)
      .then((registro_contractAbstraction) => {
        this.registroContract = registro_contractAbstraction;
        this.registroContract.deployed().then(deployed => {
          console.log(deployed);
        });

      });
  }
  
  async getPadre() {
	if (!this.registroContract) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
    }
	 
    console.log('Padre Ingresado: ');
    try {
      const deployedRegistroContract = await this.registroContract.deployed();
      const infoPadre = await deployedRegistroContract.getPadre.call(this.account);
      console.log('Respuesta email Instructor : ' + infoPadre[0]);
	    console.log('Respuesta Nombre Padre : ' + infoPadre[1]);
      console.log('Respuesta Apellido Padre : ' + infoPadre[2]);
      console.log('Respuesta contrasena Padre : ' + infoPadre[3]);
      console.log('Respuesta tipo : ' + infoPadre[4]);
      console.log('Respuesta DirecciÃ³n Padre : ' + this.account);
	  
      
    } catch (e) {
      console.log(e);
      this.setStatus('Error Obteniendo la informacion del Padre; Revisar log.');
    }
  }

 
  
    async registrarPadre(){
	 if (!this.registroContract) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
     }
	
  	 console.log('Nombre ' + this.nombre);
	 console.log('Apellido ' + this.apellido);
   console.log('email' + this.email);
   console.log('contrasena' + this.contrasena);
	 
 	 this.setStatus('Inicializando transaccion... (Por favor Espere)');
	  
	  try {
      const deployedRegistroContract = await this.registroContract.deployed();
      const registroContractTransaction = await deployedRegistroContract.registrarPadre.sendTransaction(this.account,this.email,this.nombre,this.apellido,this.contrasena,this.tipo,{from: this.account});
	  	   
      if (!registroContractTransaction) {
        this.setStatus('Transaction Fallida!');
      } else {
        this.setStatus('Transaction Completada!');
		this.getPadre();
		
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del Padre; Ver Log.');
    }
	
  }
  
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }
 
  
  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }
}




