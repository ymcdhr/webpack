import React from 'react';
import Coms from './components/coms.js'
import './style/app.css'

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
      <div className="w">
        <div className="fetch-demo">
          <p>fetch获取到的数据为：</p>
          <pre><code>
            {JSON.stringify(this.state, null, 2)}
          </code></pre>
        </div>
     
        {/* 自定义组件，redux示例 */}
        <Coms />
      </div>
    );
  }
}


export default App;
