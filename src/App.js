import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Procedures from './pages/Procedures';
import ProceduresDetails from "./pages/ProceduresDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/procedures" exact component={Procedures}></Route>
          <Route path="/proceduresDetails" exact component={ProceduresDetails}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
