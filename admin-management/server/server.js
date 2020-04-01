var express = require('express');//引入express模块
const db=require("./modules/db")
const mongodb=require("mongodb")
const nowTime = require("./modules/common")
const myEnum=require("./modules/Enum")
const {upPic}=require("./modules/upPic")
const md5=require("md5")
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())//添加json解析器
app.all("*", function(req, res, next) {
    // 跨域处理
        res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","PUT,DELETE");
    // res.header("Access-Control-Allow-Methods","");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
})
app.get('/demo',function(req,res){
    res.send('HellowWorld')
});
app.post('/list', function (req, res) {
    console.log('tag',req.body.name)
    let arr = [{
        name: '陈培',
        val:1
    },{
        name: 'susice',
        val:2
    }]
    res.send(arr)
});
app.post("/addAdmin",function (req,res) {
  var addName='chenpei'
  var  addPwd=123456
  db.findOne("adminList",{adminName:addName},function (err,addInfo) {
        if(!addInfo){
            db.insertOne("adminList",{
                adminName:addName,
                adminPwd:addPwd
            },function (err,result) {
              res.json({
                ok:1,
                msg:"添加管理员成功"
              })
            })
        }else{
          res.json({
            ok:2,
            msg:"请不要重复添加管理员信息"
          })
        }
  })
});
var server = app.listen(3000,function(){
    console.log('runing 3000...');
})