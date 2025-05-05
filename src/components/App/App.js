import "./App.css";
import NavBar from "../NavBar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { About } from "../../Pages/About/About";
import Articles from "../../Pages/Articles/";
import Article from "../../Pages/Articles/Article";
import { NotFound } from "../../components/404/NotFound";
import Grammar from "../../Pages/Grammar1/Grammar/Grammar";
import GrammarInUse from "../../Pages/Grammar1/InUse/InUse";
import Search1 from "../../Pages/RuUz/Search.js";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import { readEngUzb } from "../../lib/fetchData.js";
import { useEffect } from "react";
import AdsComponent from "../../lib/AdSense";
import ModalVisibility from "../ModalVisibility";
import Profile from "../../Pages/Profile";
import { useAuthUser } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";
import WikiQuote from "../QuoteOfDay/WikiQuote.js";

function App() {
  const auth = useAuthUser()();
  const client = new QueryClient();
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await readEngUzb();
      response = await response.json();
      console.log(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <QueryClientProvider client={client}>
      {/* <ReactQueryDevtoolsPanel /> */}
      <div className="App">
        <ModalVisibility />
        <Router>
          <NavBar />
          <main className="pages">
            <Switch>
              <Route exact path="/">
                <Redirect to="/en-uz" />
              </Route>
              <Route path="/en-uz">
                <Search />
                <WikiQuote/>
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/articles">
                <Articles />
              </Route>
              <Route path="/articles/search/:text">
                <Articles />
              </Route>
              <Route path="/articles/tag/:tag">
                <Articles />
              </Route>
              <Route path="/article/:id">
                <Article />
              </Route>

              <Route path="/ru-uz" component={Search1} />
              {auth && <Route path="/profile" component={Profile} />}
              <Route path="/grammar/:id" component={GrammarInUse} />
              <Route path="/grammar" component={Grammar} />
              <Route path="/grammar1" component={GrammarInUse} />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
          <AdsComponent />
          <Footer />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
