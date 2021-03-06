import react from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
            <nav className="navbar-expand navbar-light bg-light  vw-2 d-block d-lg-none">
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
                        <Link to="/Dashboard" className="nav-link" href="#">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        
    );
};

export default App;