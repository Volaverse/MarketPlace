import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './Pages/Categories';
import Market from './Pages/Market';
// import Login from './Pages/Login';
import LiskLogin from './Pages/LiskLogin';
import LiskSignup from './Pages/LiskSignup';
import LiskFunds from './Pages/LiskFunds';
import LogOut from './Pages/LogOut';
import Owned from './Pages/Owned';
import Details from './Pages/Details';
import Error404 from './Pages/Error404'
import Test from './Pages/cardTest';
import Test1 from './Pages/cardTest2';
import Test3 from './Pages/cardTest3';
import DetailsThree from './Pages/Details_3d'


function App() {
   return (
      <>
         <Header />
         <Switch>
            <Route path="/" exact component={Market} />
            <Route path="/categories/:category/:page" exact component={Categories} />
            <Route path="/owned/:publicAddress/:category/" component={Owned} />
            <Route path="/nft/:tokenId/details" component={Details} />
            <Route path="/auth/login" exact component={LiskLogin} />
            <Route path="/auth/signup" exact component={LiskSignup} />
            <Route path="/auth/logout" exact component={LogOut} />
            <Route path="/auth/funds" exact component={LiskFunds} />
            <Route path="/test" exact component={Test} />
            <Route path="/test1" exact component={Test1} />
            <Route path="/test3" exact component={Test3} />
            <Route path="/detailsTest" exact component={DetailsThree} />
            <Route component={Error404} />
         </Switch>
         <Footer />
      </>
   );
}

export default App;
