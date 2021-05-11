import react from 'react';
import './sass/App.sass';
import { Link } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"
const App = () => {
    return (
            // <nav className="navbar navbar-dark bg-dark position-fixed navbar-fixed-left m-0 vh-100 p-4  d-none d-lg-flex"
            <nav className="navbar navbar-dark bg-dark position-fixed navbar-fixed-left m-0 vh-100 p-4  d-none d-lg-flex"
            style={{zIndex:10}}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/Home" className="nav-link" href="#">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/BMICalculator" className="nav-link" href="#">BMI Calculator</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/BMRCalculator" className="nav-link" href="#">BMR Calculator</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ToDoList" className="nav-link" href="#">ToDoList</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="/Food" className="nav-link" href="#">Food Calculator</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Scheduler" className="nav-link" href="#">Scheduler</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Forum" className="nav-link" href="#">Forum</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Dashboard" className="nav-link" href="#">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        
    );
};

export default App;