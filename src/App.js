import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import Addrecipes from './pages/Addrecipes';
import ViewRecipes from './pages/ViewRecipes';
import Login from './components/Login';
import Howtoadd from './pages/Howtoadd';
import RecipeView from './Admin/RecipeView';
import Allusers from './Admin/Allusers';
import Adminhome from './Admin/Adminhome';
import Dashboard from './Admin/Dashboard';
import Approve from './Admin/Approve';
import Pageafteradd from './components/Pageafteradd';
import Status from './Admin/Status';
import Userdashboard from './components/Userdashboard';
import Addedrecipesview from './components/Addedrecipesview';
import Settings from './Admin/Settings';
import Usersettings from './components/Usersettings';
import Saved from './components/Saved';

function App() {
  const location = useLocation();

  // Define a function to check if the current route is the login page
  const isLoginPage = () => {
    return location.pathname === '/login' || location.pathname==='/register'  || location.pathname==='/adminpage/recipeview' || location.pathname==='/adminpage/approve' || location.pathname==='/adminpage/users' || location.pathname==='/adminpage' || location.pathname==='/adminpage/dashboard' || location.pathname==='/adminpage/status' || location.pathname==='/addedrecipesview' || location.pathname==='/admin/settings' || location.pathname==='/saved';
  };
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Login register/>}/>
        <Route path={'/add-recipes'} element={<Addrecipes/>}/>
        <Route path={'/view-recipes'} element={<ViewRecipes/>}/>
        <Route path={'/howtoadd'} element={<Howtoadd/>}/>
        <Route path={'/userdashboard'} element={<Userdashboard/>}/>
        <Route path={'/adminpage/recipeview'} element={<RecipeView/>}></Route>
        <Route path={'/adminpage/approve'} element={<Approve/>}></Route>
        <Route path={'/adminpage/status'} element={<Status/>}></Route>
        <Route path={'/adminpage/users'} element={<Allusers/>}></Route>
        <Route path={'/adminpage'} element={<Adminhome/>}></Route>
        <Route path={'/adminpage/dashboard'} element={<Dashboard/>}></Route>
        <Route path={'/adminpage/settings'} element={<Settings/>}></Route>
        <Route path={'/addedrecipesview'} element={<Addedrecipesview/>}></Route>
        <Route path={'/add-recipes/acknowledgement'} element={<Pageafteradd/>}></Route>
        <Route path={'/usersettings'} element={<Usersettings/>}></Route>
        <Route path={'/saved'} element={<Saved/>}></Route>
        </Routes>
      {!isLoginPage() && <Footer />}
    </div>
  );
}

export default App;
