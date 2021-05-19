import React, { useEffect } from 'react';
import axios from 'axios';
import '&/css/home.scss';
import newPromise from '&/common/promise';

// import { request } from '../api/index';
import { ajax } from '../api/index';
import { reject, resolve } from 'core-js/fn/promise';

const Home = (props) => {

    useEffect(() => {
        // race
        let p1 = new newPromise(resolve => {
            setTimeout(() => {
                resolve('p1');
            }, 200)
        });

        let p2 = new newPromise((resolve, reject) => {
            // resolve('p2');
            setTimeout(() => {
                reject('p2');
            }, 100)
        });

        newPromise.race([p1, p2]).then(
            value => {
                console.log(value)
            },
            reason => {
                console.log(reason)
            }
        )

        // all
        /*
            let p1 = new newPromise(resolve => {
                resolve('p1');
            });

            let p2 = new newPromise((resolve, reject) => {
                // resolve('p2');
                reject('p2');
            });

            newPromise.all([p1, p2]).then(
                value => {
                    console.log(value)
                },
                reason => {
                    console.log(reason)
                }
            )
        */


        // reject
        // newPromise.reject('失败').then(null, reason => {
        //     console.log(reason)
        // })

        // resolve
        /*
            newPromise.resolve('yes').then(value => {
                console.log(value)
            })

            let p = new newPromise((resolve, reject) => {
                reject('失败');
            })

            newPromise.resolve(p).then(
                value => {
                    console.log(value);
                },
                reason => {
                    console.log("Error" + reason);
                }
            )
        */

        // let p = new newPromise((resolve, reject) => {
        //     // setTimeout(() => {
        //     //     // resolve('解决');
        //     //     // console.log('解决前输出')
        //     //     reject('拒绝');
        //     // }, 1000)
        //     resolve('解决');
        // }).then(value => {
        //     return new newPromise((resolve, reject) => {
        //         // resolve('then')
        //         reject('then resolve')
        //     })
        // }).then(value => {
        //     console.log('fulfilled: ' + value)
        // }, reason => {
        //     console.log('rejected: ' + reason)
        // });

        console.log('同步')
    }, [])

    return (
        <div className='homePage'>
            Home
        </div>
    );

    // console.log(props); // history location match

    // useEffect(() => {
    //     // request().then(value => { console.log(value) })

    //     let url = 'http://47.104.21.213:7800/weather_jczx/GetStdStationInfo?json={"city_id":"1"}'; // url 接口地址
    //     ajax(url)
    //         .then(res => { console.log(res) })

    //     // dev-server 模拟api
    //     // axios.get('/api/info').then(res => {
    //     //     console.log(res)
    //     // })
    // }, []);

    // 检测是否可以拿到全局环境变量
    // console.log(node_env)
}

export default Home;
