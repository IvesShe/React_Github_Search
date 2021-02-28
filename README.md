# React Github Search

Github展示

https://ivesshe.github.io/React_Github_Search/

# 建立新專案

react-proxy

```bash
create-react-app react-github-search
```

創建新專案，並只留需要的檔案，可以參考之前的文檔前面

https://github.com/IvesShe/React_TodoList


```bash
cd react-github-search
npm start
```

確定可以運行之後，開始刪除不需要的檔案，再運行確認工程可以正常運作

```bash
npm start
```

## 簡化之後的結構

修改App.js，改成App.jsx

並將 函數式組件 改成 類式組件

```js
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        App....
      </div>
    );
  }
}
```

![image](./images/20210227220309.png)

簡化的版本，可以正常運行

![image](./images/20210227121249.png)

## src資料夾新增manifest.json

為防止報錯，在該資料夾新增manifest.json，並填入以下內容

manifest.json

```json
{

}
```

# 安裝axiox

```bash
npm i axios
```

![image](./images/20210228110441.png)

# 執行畫面

![image](./images/20210228123252.png)

![image](./images/20210228123324.png)

# Github上傳

可以參考之前的文檔

https://github.com/IvesShe/React_TodoList

# 源代碼

## App.jsx

```jsx
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
```

## Search/index.jsx

```jsx
import React, { Component } from 'react'
import axios from 'axios'
export default class Search extends Component {

    search = ()=>{
        // 獲取用戶的輸入
        //console.log(this.keyWordElement.value);

        // 連續解構賦值+重命名
        const {keyWordElement:{value:keyWord}} = this;
        console.log(keyWord);

        // 不能為空
        if(keyWord.trim() === ''){
            alert('輸入不能為空');
            return;
        }

        // 發送請求前通知App更新狀態
        this.props.updateAppState({isFirst:false,isLoading:true});
        
        // 發送網絡請求
        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                // 請求成功後通知App更新狀態
                this.props.updateAppState({isLoading:false,users:response.data.items});
                //console.log('成功了',response.data);
            },
            error => {
                // 請求失敗後通知App更新狀態
                this.props.updateAppState({isLoading:false,err:error})
                console.log('失敗了',error);
            }
        )
    }

    // 鍵盤事件的回調
    // 可以點擊搜尋按鍵 或 直接按下Enter
    handleKeyUp = (event)=>{
        const {keyCode,target} = event;

        // 判斷是否為Enter按鍵
        if(keyCode !== 13) return;

        // 不能為空
        if(target.value.trim() === ''){
            alert('輸入不能為空');
            return;
        }

        // 打印所按的值、按鍵的值
        console.log(target.value, keyCode);

        this.search();
    }

    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">搜尋Github用戶</h3>
                    <div>
                        <input onKeyUp={this.handleKeyUp} ref={c => this.keyWordElement = c} type="text" placeholder="輸入關鍵詞點擊搜尋" />&nbsp;
                        <button onClick={this.search}>搜尋</button>
                    </div>
                </section>
            </div>
        )
    }
}

```


## List/index.jsx

```jsx
import React, { Component } from 'react'
import './index.css'

export default class List extends Component {

    render() {
        const { users, isFirst, isLoading, err } = this.props;

        return (
            <div className="row">
                {
                    isFirst ? <h2>歡迎使用，請輸入關鍵字，隨後點擊搜尋</h2> :
                        isLoading ? <h2>努力加載中......</h2> :
                            err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                                users.map((userObj) => {
                                    return (
                                        <div key={userObj.id} className="card">
                                            <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                                <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                                            </a>
                                            <p className="card-text">{userObj.login}</p>
                                        </div>
                                    )
                                }
                                )
                }
            </div>
        )
    }
}

```

## List/index.css

```css
.album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
  }
  
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }
  
  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }
  
  .card-text {
    font-size: 85%;
  }
  
```