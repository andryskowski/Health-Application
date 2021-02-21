import react from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        // <nav className="d-block d-lg-none">
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <Link to="/Home" className="nav-link active" href="#">Home</Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link to="/BMICalculator" className="nav-link" href="#">BMICalculator</Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link to="/BMRCalculator" className="nav-link" href="#">BMRCalculator</Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link to="/ToDoList" className="nav-link" href="#">ToDoList</Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link to="/Food" className="nav-link" href="#">FoodCalculator</Link>
        //         </li>
        //     </ul>
        // </nav>

        <div class="pos-f-t">
            <div class="collapse" id="navbarToggleExternalContent">
                <div class="bg-dark p-4">
                    <h4 class="text-white">Collapsed content</h4>
                    <span class="text-muted">Toggleable via the navbar brand.</span>
                </div>
            </div>
            <nav class="navbar navbar-dark bg-dark d-block d-lg-none">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    );
};

export default App;