import { UALJs } from 'ual-plainjs-renderer';
import { Wax } from '@eosdacio/ual-wax';
import { isEmpty } from 'lodash';
import { Anchor } from 'ual-anchor';

import {storeAppDispatch} from './GlobalState/Store';
import { setPlayerBalance, setPlayerData, setPlayerLogout } from './GlobalState/UserReducer';

/**
 * Class to manage user data; it will be saved on Login and deleted on Logout
 */
export class User {

    appName = 'ual_template';

    /**
     * WAX Mainnet configuration
     */
    // myChain = {
    //     chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    //     rpcEndpoints: [{
    //         protocol: 'https',
    //         host: 'apiwax.3dkrender.com',
    //         port: ''
    //     }]
    // };

    /**
     * WAX Testnet configuration
     */
    myChain = {
        chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
        rpcEndpoints: [{
            protocol: 'https',
            host: 'testnet-wax.3dkrender.com',
            port: ''
        }]
    };

    ual;

    // User session data
    authName = undefined;
    serviceLoginName = undefined;
    // Shows petition signing and current balance obtaining methods
    session = undefined;

    // Current balance
    userBalance = 0;

    // Callback to refer to successful login
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
        
        this.ual.logoutUser();

        storeAppDispatch(setPlayerLogout());

        if(this.callbackServerUserData !== undefined) {
            this.callbackServerUserData();
        }
    }

    // UAL API call response
    async ualCallback(userObject) {

        this.session = userObject[0];
        this.serviceLoginName = this.session.constructor.name;
        this.authName = this.session.accountName;
        
        console.log("El balance", (this.balance !== undefined) ? this.balance : 0);

        storeAppDispatch(setPlayerData({
            name: this.authName,
            isLogged: this.isLogged(),
            balance: (this.balance !== undefined) ? this.balance : 0
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
            console.log("Balance no liquido: ", balance);
            console.log("Balance liquido: ", this.balance);
            storeAppDispatch(setPlayerBalance((this.balance !== undefined) ? this.balance : 0));
        });
        return balance;
    }

    // UserService init called to prepare UAL Login.
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
