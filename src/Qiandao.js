import React, { Component } from 'react';
import { Card } from 'antd';


class Qiandao extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            count: 2,
            tt: ''
        };

    }

    componentDidMount() {//组件挂载时执行的代码
        this.timerID = setInterval(
            () => this.tick(),
            1000 //每秒更新一次
        );
    }

    tick() {//定时器
        this.setState({
            date: new Date(),//创建当前时间
            child:'删除',
        });
        this.getDakaList();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);//清理计时器

    }

    //从后台获取用户列表
    getDakaList(){
        /* 查询数据的格式 */
        let filter={
            object:{
                object:{

                }
            }
        };

        var url ="http://119.23.77.187:8080/getDakaList";
        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);

                this.setState({
                    dataSource: responseJson

                })

            })
    }

    render() {
        return (
            <div >

                <view style={ {margin:50}}>
                    <Card style={{ background: '#ECECEC', padding: '10px' }}>

                    </Card>

                    {this.state.dataSource.map(
                        //传递点中的ID
                        u => <div key={u.id} style={{ background: '#ECECEC', padding: '10px' }}>
                            <Card title="外勤" bordered={false} style={{ width: 300 }}>
                                {/*<p>{u.signtime}</p>*/}
                                <p>{u.signtimestr}</p>
                                <p>{u.addr}</p>
                            </Card>
                        </div>)
                    }
                </view>
            </div>




        );
    }
}

export default Qiandao;