import './App.scss';
import { Menu } from './components/Menu';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Page2 } from './pages/Page2';
import ProtectedRoute from './ProtectedRoute';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/page2" component={Page2} />
          <ProtectedRoute exact path="/home" component={Home} />
          <Redirect to="/"  />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
