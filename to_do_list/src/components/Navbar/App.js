import react from 'react';
import './sass/App.sass';
import {Link} from 'react-router-dom';
const App = () => {

  return (
    <nav class="navbar navbar-light bg-dark position-absolute vh-100 vw-20">
    <ul class="navbar-nav">
        <li class="nav-item">
            <Link  to="/" class="nav-link active" href="#">Home</Link>
        </li>
        <li class="nav-item">
            <Link to="/BMICalculator" class="nav-link" href="#">BMICalculator</Link>
        </li>
        <li class="nav-item">
            <Link to="/BMRCalculator" class="nav-link" href="#">BMRCalculator</Link>
        </li>
        <li class="nav-item">
            <Link to="/ToDoList" class="nav-link" href="#">ToDoList</Link>
        </li>
        <li class="nav-item">
            <Link to="/Food" class="nav-link" href="#">FoodCalculator</Link>
        </li>
    </ul>
</nav>);
};

export default App;