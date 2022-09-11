import './App.css';
import TodoForm from './components/todoForm/todoForm'
import WeatherForm from  './components/weatherForm/weatherForm';

function App() {
  return (
    <div className="app">

      <div className='conteiner-todo'>
        <TodoForm />
      </div>

      <div className='conteiner-weather'>
        <WeatherForm />
      </div>
    
    </div>
  );
}

export default App;
