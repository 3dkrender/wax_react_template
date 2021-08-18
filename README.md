# React Template for WAX (UAL)

Template creado para facilitar el uso de WAX con React.

![Logo 3DKRender](https://cdn.discordapp.com/attachments/813862875944845313/813866667150409769/3DK_LOGO_400x120.png)

Recuerda que primero es necesario instalar las dependencias: 
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

    **Recuerda** comentar o descomentar las líneas según te convenga para trabajar con mainet o con testnet.

    Cuando el usuario haya hecho log-in, estos datos se guardarán en el estado global de la aplicación gracias a Redux y @reduxjs/toolkit (también guardamos un **isLogged** para tener una actualización en tiempo real en React).

- Carpeta **GlobalState/**: En esta carpeta tenemos la configuración y el **store** de **redux** para poder guardar y gestionar los datos del usuario en un estado global.

- Archivo **App.js**: En este archivo gestionamos el sistema de rutas de la página.

-  Archivo **index.js**: En este archivo iniciamos el **UserService** (UserService.init()) y también tenemos el <Provider> del **store** de **redux**.

- Carpeta **pages**: Dentro de esta carpeta guardaremos las páginas de nuestro sitio. **Recuerda configurar las rutas de las páginas nuevas en tu App.js**.

- Carpeta **components**: Aquí se almacenarán los componentes de nuestra aplicación. Para este ejemplo solo tenemos **Menu.jsx**, que es un componente del menú y que nos ayuda a redireccionar al usuario cuando este haga log-in.

## Archivo Menu.jsx
El archivo **components/Menu.jsx** es el componente del menú de nuestra aplicación/página y cuenta con cuatro pestañas: Main, Home, Page2 y Login/Logout.

Si nos fijamos, veremos que tenemos dos pestañas deshabilitadas a las que no se nos permite el acceso: **Home** y **Page2**. Para lograr hacer esto, simplemente deberemos comprobar si el usuario ha hecho log-in o no, gracias a **UserState.isLogged** (en el estado de redux), y se mostrará u ocultará con algún estilo **CSS**.

En cuanto a la pestaña Login/Logout, mostraremos una u otra dependiendo del estado del usuario. Esto se puede comprobar fácilmente al entrar en el archivo, pero lo que veremos será algo así: 
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

El sistema de inicio de log-in está en el **components/Menu.jsx**. Una vez que se haga click sobre el botón de log-in en el menú, este llama a **handleLogin** y a la vez llama a la función de **UserService.login()**. Dentro de esta función se puede pasar una función anónima como callback, y cuando se haya hecho log-in, se recibirá una respuesta. Dentro de este callback comprobaremos si se ha hecho log-in o no.
Si se hace log-in se redirigirá hacia una página (**en este caso, /home**). De lo contrario, se hará log-out del usuario para limpiar datos.

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

Las rutas deben protegerse, por lo que es necesario crear un componente llamado **ProtectedRouter.jsx**. Nosotros hemos creado uno para el ejemplo, el cual comprueba la ruta en la que estamos y obtiene el estado del usuario para saber si ha hecho log-in o no (**UserService.isLogged()**). Si no se ha hecho log-in, sacará al usuario de esa ruta y lo mandará hacia otra ruta que hemos preconfigurado, en este caso, hacia **/login**.

Para usar el componente, simplemente iremos a nuestro **App.js** y ahí reemplazaremos el <Route> por nuestro <ProtectedRouter>. Si abrimos **App.js**, lo veremos fácilmente: 

```jsx
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/page2" component={Page2} />
          <ProtectedRoute exact path="/home" component={Home} />
          <Redirect to="/"  />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
```

## Enviar WAX

Para ver un ejemplo de cómo enviar algo de WAX, puedes ir a **pages/Page2.jsx**. El **UserService** guarda la sesión, y, si simplemente accedemos a esa sesión y firmamos alguna transacción, el código que veremos de ejemplo será el siguiente: 

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