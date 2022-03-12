import "./App.css";
import { Route, Switch } from "react-router";
import Game from "./components/Game.js";
import Qr from "./components/Qr";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/qr" exact component={Qr} />
      <Route path="/:userId" exact component={Game} />
    </Switch>
  );
}

export default App;
