import React from 'react';
import Coms from './components/coms.js'

class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentWillMount() {
    fetch('data/data.json')
      .then((res) => res.json())
      .then((res) => {
        this.setState(res);
      });
  }
  render() {
    return (
      <div>
        <h1>Fetching data.json</h1>
        <pre><code>
          {JSON.stringify(this.state, null, 2)}
        </code></pre>
        {/* 自定义组件，redux示例 */}
        <Coms />
      </div>
    );
  }
}


export default App;
