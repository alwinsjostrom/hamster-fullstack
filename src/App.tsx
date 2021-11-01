import Landing from './components/Landing';
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Landing} />
        <Route exact path='/gallery' component={Gallery} />
        <Route exact path='/competition' component={Competition} />
      </div>
    </Router>
  );
}

export default App;