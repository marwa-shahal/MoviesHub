import React, { useEffect, useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MoviePage from "./components/MoviePage";
import ActorInfoPage from "./components/ActorInfoPage";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import { StateContext } from "./State";

export default function App() {
  const [state, dispatch] = useContext(StateContext);
  const TMDB_BASE_URL = `https://api.themoviedb.org/3`;
  const constructUrlG = (path) => {
    return `${TMDB_BASE_URL}/movie/${path}?api_key=${atob(
    process.env.REACT_APP_MOVIES_API_KEY
    )}`;
  };

  // popular fetching
  useEffect(() => {
    fetch(constructUrlG("popular"))
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_Movies", payload: data.results }));
  }, []);

  // console.log(state.genre);

  return (
    <Router>
      <div className="App">
        
        <Header />
        <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/actor/:actid" component={ActorInfoPage} />
        </Switch>
        <Footer />
    
      </div>
    </Router>
  );
}
