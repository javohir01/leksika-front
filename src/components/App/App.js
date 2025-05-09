import "./App.css";
import NavBar from "../NavBar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { About } from "../../Pages/About/About.js";
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

  // Load AdSense script on mount
  useEffect(() => {
    // Only load the script if it's not already loaded
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const loadAdSenseScript = () => {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8555908314454713";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      };
      
      loadAdSenseScript();
    }
  }, []);

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
              <Route path="/grammar/:id">
                <GrammarInUse />
              </Route>
              <Route path="/grammar">
                <Grammar />
              </Route>
              <Route path="/grammar1">
                <GrammarInUse />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
            {/* Single ad placement outside of route components */}
            <AdsComponent />
          </main>
          <Footer />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;