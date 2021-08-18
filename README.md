# UAL React Template

Template creado para facilitar el uso de WAX con React.


![Logo 3DKRender](https://cdn.discordapp.com/attachments/813862875944845313/813866667150409769/3DK_LOGO_400x120.png)

Recuerda que se necesita instalar las dependencias primero: 
```
> npm i
```
Para iniciar el proyecto se puede hacer con: 
```
> npm run start
```

## Dependencias usadas
- Dependencias para el uso de WAX
    - @eosdacio/ual-wax
    - ual-anchor
    - ual-plainjs-renderer
    - anchor-link
- Dependencia de rutas de react
    - react-router-dom

- Dependencias de estado global
    - redux
    - react-redux
    - @reduxjs/toolkit

- Dependencias de diseño y estilos
    - bootstrap
    - glamor

- Dependencias de ayuda
    - lodash

## Archivos importantes

- **UserService.js**: Archivo necesario para gestionar el login del usuario y la configuración de UAL y distintos sistemas de login, además de que cuenta con un método que nos indica el estado del usuario (**isLogged()**) devolviendo un **true** o **false** si el usuario ya ha hecho login.

    **Recuerda** comentar o descomentar según te convenga las lineas para trabajar con mainet o con testnet.

    Cuando el usuario haya hecho login estos datos se guardarán en el estado global de la aplicación gracias a Redux y @reduxjs/toolkit (tambien guardamos un **isLogged** para tener una actualización en tiempo real en React).

- Carpeta **GlobalState/**: En esta carpeta tenemos la configuración y el **store** de **redux** para poder guardar y gestionar los datos del usuario en un estado global.

- Archivo **App.js**: En este archivo gestionamos el sistema de rutas de la página.

-  Archivo **index.js**: En este archivo iniciamos el **UserService** (UserService.init()) y también tenemos el <Provider> del **store** de **redux**.

- Carpeta **pages**: Dentro de esta carpeta guardaremos las páginas de nuestro sitio. **Recuerda configurar las rutas de las páginas nuevas en tu App.js**.

- Carpeta **components**: Acá irán los componentes de nuestra aplicación. Para este ejemplo solo tenemos a **Menu.jsx** que es componente del menú y que nos ayuda a redireccionar al usuario cuando haya hecho login.

## Archivo Menu.jsx
El archivo **components/Menu.jsx** es el componente del menú de nuestra aplicación/página y cuenta con cuatro pestañas, Main, Home, Page2, Login/Logout.

Si nos fijamos tendremos dos pestañas deshabilitada que no se permite el acceso: Home y Page2. Para lograr hacer esto simplemente se comprueba si el usuario ha hecho login o no gracias a **UserState.isLogged** (en el estado de redux) y se muestra u oculta con algún estilo **CSS**.

En cuanto a la pestaña Login/Logout mostramos una u otra dependiendo del estado del usuario, esto se puede ver fácilmente si entras el archivo pero lo que verías sería algo así: 
```jsx
 {
    !UserState.isLogged &&
    <button className="..." onClick={handleLogin}><img .../> Login</button>
}
{
    UserState.isLogged &&
    <Link to="/" className="..." onClick={onHandleLogout}>Logout <img .../></Link>
}
```
## Sistema de login

El sistema de inicio de login está en el **components/Menu.jsx**. Una vez que se clique el botón de login en el menú, este llama a **handleLogin** y a la vez llama a la función de **UserService.login()** dentro de esta función se le puede pasar una función anónima como callback y cuando se haya hecho login se recibe una respuesta, dentro de este callback comprobamos si se ha hecho login o no.
Si se hace login se redirige hacía una página (**en este caso /home**), de lo contrario se hace el logout del usuario para limpiar datos.

```jsx
const handleLogin = () => {
    UserService.login(() => {
        if (UserService.isLogged()) {
            locationHistory.push('/home');
        } else {
            dispatch(setPlayerLogout());
            UserService.logout();
        }
    });
}
```

## Protección de las rutas de React

Las rutas hay que protegerlas por eso es necesario crear un archivo llamado **ProtectedRouter.jsx**. Nosotros hemos creado uno para el ejemplo el cual comprueba la ruta en que estamos y obtiene el estado del usuario para saber si ha hecho login o no (**UserService.isLogged()**), si no se ha hecho login saca el usuario de esa ruta y lo manda hacía otra ruta que hemos preconfigurado, en este caso redireccionamos hacía **/login**.

## Enviar WAX

Para ver un ejemplo de como envíar algo de WAX puedes ir a **pages/Page2.jsx**. El **UserService** guarda la sesión y simplemente accedemos a esa sesión y firmamos alguna transacción, el código que verás de ejemplo será el siguiente: 

```js
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
```
---
![Logo 3DKRender](https://cdn.discordapp.com/attachments/813862875944845313/813866667150409769/3DK_LOGO_400x120.png)

Esperamos que nuestras herramientas te faciliten la vida y que puedas seguir desarrollando en esta increíble tecnología WAX.