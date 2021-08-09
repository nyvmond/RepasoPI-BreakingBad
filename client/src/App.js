import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import AddCharacter from '../src/Components/AddCharacter/AddCharacter';
import Details from './Components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component = {LandingPage}/>
        <Route path= '/home' component = {Home}/>
        <Route exact path='/character' component={AddCharacter}></Route>
        <Route exact path='/details/:id' component={Details}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
