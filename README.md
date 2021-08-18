# React Template for WAX (UAL)

This template was created to make the use of WAX with React easier.

![Logo 3DKRender](https://cdn.discordapp.com/attachments/813862875944845313/813866667150409769/3DK_LOGO_400x120.png)

Please remember to install all needed dependencies beforehand: 
```
> npm i
```
You can start the project by: 
```
> npm run start
```

## Dependencies used
- Dependencies for WAX
    - @eosdacio/ual-wax
    - ual-anchor
    - ual-plainjs-renderer
    - anchor-link
- Dependencies for React routes
    - react-router-dom

- Global state dependencies
    - redux
    - react-redux
    - @reduxjs/toolkit

- Style and design dependencies
    - bootstrap
    - glamor

- Help dependencies
    - lodash

## Key files

- **UserService.js**: A file needed to manage the user's login, UAL configuration and different login methods. It also has a certain mode that lets us know the user's status (**isLogged()**) with the answers **true** or **false** if the user has previously logged in.

    **Remember** to comment and uncomment as needed, depending on wether you will be working with mainnet or testnet.

    When the user logs in, this data will be saved in the app's global state thanks to Redux and @reduxjs/toolkit (we will also save an **isLogged** in order to maintain a live actualization in React).

- **GlobalState/**: In this folder we will keep our configuration and **store** from **redux**, so we can save and manage the user's data in a global state.

- **App.js**: With this file we can manage the web's route system.

-  **index.js**: This file initiates **UserService** (UserService.init()) and also contains the <Provider> for **store** from **redux**.

- **pages**: In this folder we will save our web's pages. **Remember to configure new pages' routes in your App.js**.

- **components**: In this folder we will keep our app's components. For this example we only have **Menu.jsx**, a component for our menu, which will help us redirect the user when they log in.

## File Menu.jsx
The file **components/Menu.jsx** is a component from our app or web's menu, which has four tabs: Main, Home, Page2, Login/Logout.

As we can see, we have two tabs which are disabled and we are not allowed to access them. These are: **Home** and **Page2**. To achieve this, we will simply check out if the user has logged in or not, thanks to **UserState.isLogged** (in the redux state), and we will show or lock them with any **CSS** style.

As for the Login/Logout tab, we will show one or the other depending on the user's state. This is easily ckeched by opening the file, but you will probably see something like this: 
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
## Login system

The system to start login is located in **components/Menu.jsx**. Once we click on the login button in the menu, this will trigger **handleLogin** and at the same time will activate the **UserService.login()** fuction. In this function it is possible to add an anonymous function as a callback, and the answer will be delivered once we log in. This callback will allow us to check if the user has logged in, if they have.
If that is the case, we will be redirected to a page (**/home, in this case**). Otherwise, it will log out in order to clear data.

```jsx
const handleLogin = () => {
    UserService.login(() => {
        if (UserService.isLogged()) {
            locationHistory.push('/home');
        } else {
            dispatch(setPlayerLogout());
        }
    });
}
```

## React routes' protection

Routes must be protected. For that, we will need to create a component called **ProtectedRouter.jsx**. We have created one for this example, and its function will be to ckeck the route we're in and to show us the user's state so we can know if they have logged in or not (**UserService.isLogged()**). If the user has not logged in, it will take the user from this route and redirect them to another one we have configured previously, which in this case leads to **/login**.

In order to use this component, we will simply open our **App.js**, where we will substitute <Route> for our <ProtectedRouter>. You will see this if you open **App.js**: 

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

## Send WAX

You can see an example of how to send items from WAX in **pages/Page2.jsx**. The **UserService** saves the session and we simply have to access this session and sing any transaction. The code you will see in this example looks like this: 

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

We hope that you find our tools useful and that you can keep developing your ideas with this awesome WAX technology.

---
<br>
<br>

# [ES] - React Template for WAX (UAL)

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

    **Recuerda** comentar o descomentar las líneas según te convenga para trabajar con mainnet o con testnet.

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