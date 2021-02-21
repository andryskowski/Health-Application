import react from 'react';
import './sass/App.sass';
import { Link } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"
const App = () => {
    return (
            <nav className="navbar navbar-dark bg-dark position-absolute vh-100  d-none d-lg-flex">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/Home" className="nav-link active" href="#">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/BMICalculator" className="nav-link" href="#">BMICalculator</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/BMRCalculator" className="nav-link" href="#">BMRCalculator</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ToDoList" className="nav-link" href="#">ToDoList</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Food" className="nav-link" href="#">FoodCalculator</Link>
                    </li>
                </ul>
            </nav>
        
    );
};

export default App;