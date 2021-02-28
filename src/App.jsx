import React, { Component } from 'react'
import List from './componets/List';
import Search from './componets/Search';

export default class App extends Component {

  
  state = {
    users:[],         // 初始化狀態，users初始化為數組
    isFirst:true,     // 是否為第一次打開頁面
    isLoading:false,  // 標識是否處於加載中
    err:'',           // 存儲請求相關的錯誤信息
  };

  // 更新App的state
  updateAppState = (stateObj) =>{
    this.setState(stateObj);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Search updateAppState={this.updateAppState} />
          <List {...this.state} />
        </div>
      </div>
    );
  }
}