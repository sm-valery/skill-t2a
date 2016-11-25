import express from 'express';
import cors from 'cors';
//import mongoose from 'mongoose';
//import Promise from 'bluebird';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

//урок 2D
app.get('/color',(req,res)=>{

console.log(req.query.color);

res.send(pColor(req.query.color));

})


//урок 2A
app.get('/t2a',(req,res)=>{
  const sum = (+req.query.a||0) + (+req.query.b||0);

  res.send(sum.toString());
})

//урок 2C
app.get('/t2c',(req,res)=>{

const urlstr = req.query.username;

  res.send(getUrlUserName(urlstr));
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});


function pColor(scolor){

var strRez = 'Invalid color'

if(!scolor)
return strRez;

var strQue = scolor.toLowerCase().trim();

//проверка FFF
var testvalid = strQue.match(/^#?[0-9a-f][0-9a-f][0-9a-f]$/);

if(testvalid){

var strRez = testvalid[0].replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,'#$1$1$2$2$3$3');
return strRez;
}

//123abc
var testvalid = strQue.match(/^#?[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/);

if(testvalid){
    var strRez = "#"+testvalid[0].replace('#','');
    return strRez;
}

//rgb(0, 255, 64)
var testvalid = strQue.match(/^rgb\((\s+)?\d{1,3}(\s+)?,(\s+)?\d{1,3}(\s+)?,(\s+)?\d{1,3}(\s+)?\)/g);
if(testvalid){
  var arrtest = strQue.split(/rgb\(|,|\)/);

  //aa = +arrtest[1].toString(16);

  var nv='';
  var z = true;
  arrtest.forEach(function(item,index) {
      if(index>0 && index <4 && z){
        var nitem = parseInt(item);

          if(nitem>=0 && nitem <= 255){
             nv = nv + xDig(nitem);
          }else{
              z=false;
          }
      }
  });

  if(z)
  strRez = '#'+nv;
}

return strRez;
}

function xDig(n){

  var retv = n.toString(16);

  var pad = "00";
  var retv = pad.substring(0, pad.length - retv.length) + retv;

 return retv;
}

function getUrlUserName(urlstr){

if(urlstr.indexOf('?') >0 )
urlstr = urlstr.substring(0,urlstr.indexOf('?'));


var uname = urlstr.replace('@','').split('/');

return '@' + uname[uname.length-1];

}

// Пример 1

// ?username=https://vk.com/skillbranch
// -
// @skillbranch
// Пример 2

// ?username=//vk.com/skillbranch
// -
// @skillbranch
// Пример 3

// ?username=skillbranch
// -
// @skillbranch
// Пример 4

// ?username=https://vk.com/skillbranch?w=wall-117903599_1076
// -
// @skillbranch
