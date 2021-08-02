import { UALJs } from 'ual-plainjs-renderer';
import { Wax } from '@eosdacio/ual-wax';
import { isEmpty } from 'lodash';
import { Anchor } from 'ual-anchor';

import {storeAppDispatch} from './GlobalState/Store';
import { setPlayerBalance, setPlayerData, setPlayerLogout } from './GlobalState/UserReducer';
import { User as UserAuth } from 'universal-authenticator-library';

/**
 * Clase para gestionar los datos del usuario, guardará el logín y lo borrará con el logout
 */
export class User {

    appName = 'ual_template';
    myChain = {
        chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
        rpcEndpoints: [{
            protocol: 'https',
            host: 'testnet.waxsweden.org',
            port: ''
        }]
    };
    ual;

    // Datos de sesión del Usuario
    authName = undefined;
    serviceLoginName = undefined;
    // Contiene los métodos para firmar peticiones y obtener balance actual
    session = undefined;

    // El balance actual
    userBalance = 0;

    // Callback parar responder que se ha hecho login
    callbackServerUserData = undefined;

    getName() {
        return this.authName;
    }

    login(callback) {
        const ualButton = document.querySelector(".ual-button-gen");
        ualButton.click();

        this.callbackServerUserData = callback;
    }

    isLogged() {
        const auth = !isEmpty(this.authName) && !isEmpty(this.session);
        return auth;
    }

    logout() {
        this.authName = undefined;
        this.session = undefined;

        storeAppDispatch(setPlayerLogout());

        if(this.callbackServerUserData !== undefined) {
            this.callbackServerUserData();
        }
    }

    // Respuesta de la llamada a la API de UAL
    async ualCallback(userObject) {
        this.session = userObject[0];
        this.serviceLoginName = this.session.constructor.name;
        this.authName = this.session.accountName;
        
        this.session.rpc.endpoint = "https://testnet-wax.3dkrender.com";

        storeAppDispatch(setPlayerData({
            name: this.authName,
            isLogged: this.isLogged(),
            balance: this.balance
        }));

        this.getBalance();
        
        if(this.callbackServerUserData !== undefined) {
            this.callbackServerUserData();
        }
    }

    getBalance() {
        const balance = this.session.rpc.get_account(this.authName);
        balance.then((balance) => {
            this.balance = balance.core_liquid_balance; 
            storeAppDispatch(setPlayerBalance(this.balance));
        });
        return balance;
    }

    // Se llama el init del UserService para preparar el login UAL.
    init() {
        // Binding:
        this.ualCallback = this.ualCallback.bind(this);

        const wax = new Wax([this.myChain], { appName: this.appName });
        const anchor = new Anchor([this.myChain], { appName: this.appName });

        const divUal = document.createElement('div')
        divUal.setAttribute('id', 'ual-login');
        document.body.appendChild(divUal);

        const divLoginRoot = document.getElementById('ual-login');
        this.ual = new UALJs(this.ualCallback, [this.myChain], this.appName, [wax, anchor], { containerElement: divLoginRoot });
        this.ual.init()
    }

    static new() {
        if (!User.instance) {
            User.instance = new User();
        }

        return User.instance;
    }
}

export const UserService = User.new();
