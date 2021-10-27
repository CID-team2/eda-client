import logo from './logo.svg';
import './App.css';
import Boxplot from './charts/Chart.js'

function App() {
  return (
    <div style={{width: "1000px"}}>
      
      <Boxplot lowerOutliers={[644]} lowerWhisker={760} q1={801} q2={848} q3={895} upperWhisker={965}/>
      
    </div>
  );
}

export default App;
