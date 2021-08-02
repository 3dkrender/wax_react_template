import React from 'react';
import { UserService } from '../UserService';

export const Page2 = () => {

    const onHandleSendWax = () => {
        UserService.session.signTransaction(
            {
                actions: [{
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [{
                        actor: UserService.authName,
                        permission: 'active'
                    }],
                    data: {
                        from: UserService.authName,
                        to: '3dkrenderwax',
                        quantity: '1.00000000 WAX',
                        memo: 'This works!'
                    }
                }]
            },
            {
                blocksBehind: 3,
                expireSeconds: 30
            }
        ).then((response) => {
            if(response.status === 'executed') {
                UserService.getBalance();
            }
        });

        // Refund balance
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-white text-center mt-5">Welcome to Page2</h1>
                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-success btn-lg" onClick={onHandleSendWax}>Send Wax</button>
                </div>
            </div>
        </div>
    );
}