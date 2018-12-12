const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const path = require('path');
const db = require('./models/dbconnect.js');
const cors = require('cors');

app.use(cors());
//解析post的请求参数
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const users  = require('./router/user.js');//引用内置模块

app.use('/api/users',users); //路由

var port = 8008;
app.listen(port,()=>{
    console.log('server start in port:'+port);
})