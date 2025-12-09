import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.index.jsx";
import NotFound from "../pages/NotFound/PageNotFound.jsx";
import PredictPage from "../pages/PredictPage/PredictPage.index.jsx";


export default function AppRoutes() {
    return (
        <Router basename={"/"}>
            <Routes>
                <Route
                    exact path="/predict"
                    element={
                        <PredictPage/>
                    }
                />
                <Route
                    exact path="/"
                    element={
                        <HomePage/>
                    }
                />
                <Route
                    path='*'
                    element={<NotFound/>}
                />
            </Routes>
        </Router>
    );
}