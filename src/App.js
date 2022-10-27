import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './Pages/Categories';
import Market from './Pages/Market';
import Login from './Pages/Login';
import Owned from './Pages/Owned';
import Details from './Pages/Details';
import Error404 from './Pages/Error404';


function App() {
   return (
      <>
         <Header />
         <Switch>
            <Route path="/" exact component={Market} />
            <Route path="/market/:category" exact component={Categories} />
            <Route path="/owned/:publicAddress/:category/" component={Owned} />
            <Route path="/nft/:contractAddress/:tokenId/details" component={Details} />
            <Route path="/auth/login" exact component={Login} />
            <Route component={Error404} />
         </Switch>
         <Footer />
      </>
   );
}

export default App;
