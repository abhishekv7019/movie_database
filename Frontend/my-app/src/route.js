import React from 'react';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import App from './App';
import Profile from './profile/profile';
import SignUpPage from './Auth/sign-up';
import LoginPage from './Auth/Login';
import MovieDetails from './movie_details';
import Home from './home';
import MoviePage from './moviepage';
import People from './peoplepage';
import ListPage from './list';
import Result from './result';


function Routesz() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<App/>} />
				<Route path='/profile' element={<Profile/>} />
				<Route path='/signup' element={<SignUpPage/>} />
				<Route path='/login' element={<LoginPage/>} />
				<Route path='/home' element={<Home/>} />
				<Route path='/people/:peopleid' element={<People/>} />
				<Route path='/movie/:movieid' element={<MoviePage/>} />
				<Route path='/lists' element={<ListPage/>} />
				<Route path='/filterresult' element={<Result/>} />
				
			</Routes>
		</Router>
	);
}

export default Routesz;
