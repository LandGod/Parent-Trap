import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <div>
          <Switch>
            {/* Setup route with the exact path that will direct us to the home page imported above */}
            <Route exact path="/" component={Home} />
            {/* setup a route with the exact path of /saved that will take us to the saved page */}
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
