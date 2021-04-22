import react from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
            <nav className="navbar-expand navbar-dark bg-dark  vw-2 d-block d-lg-none">
            {/* <nav className="navbar-expand navbar-dark bg-dark  vw-2"> */}
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