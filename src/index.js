import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

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