const express = require('express'); //请求第三方模块
const Router = express.Router(); //引用Router对象

const userModel = require("../models/usersModel.js");
const util =require('../bin/util.js');


let obj={};
/**
 * @api {post} /user/testUser 用户名验证是否唯一
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String}  username 用户名.
 * @apiParam {String} userpass 用户密码.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 */
Router.post('/testUser',(req,res)=>{
    var {userName}=req.body;
        userModel.findOne({userName:userName})
        .then((resolve)=>{
            console.log(req.body)
            if(resolve){
                res.send(util.sendData(1,'用户名已存在',null));
            }else{
                res.send(util.sendData(0,'用户名可用',null));
            }
            
        }).catch((err)=>{
            console.log(err);
        });
    
})



/**
 * @api {post} /user/login 登陆验证
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String}  username 用户名.
 * @apiParam {String} userpass 用户密码.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 */
Router.post('/log',(req,res)=>{
    var {userName,userPass}=req.body;
        userModel.findOne({userName:userName,userPass:userPass})
        .then((resolve)=>{
            // console.log(resolve)
            if(resolve){
                res.send(util.sendData(1,'登陆成功',null));
            }else{
                res.send(util.sendData(-1,'登陆失败',null));
            }
            
        }).catch((err)=>{
            console.log(err);
        });
    
})



/**
 * @api {post} /user/login 注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String}  username 用户名.
 * @apiParam {String} userpass 用户密码.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 */
Router.post('/reg',(req,res)=>{
    var {userName,userPass}=req.body;
        userModel.insertMany({userName,userPass})
        .then((resolve)=>{
            res.send(util.sendData(1,'注册成功',null));
        }).catch((err)=>{
            res.send(util.sendData(-1,'注册失败',null));
        });
})

module.exports = Router 
