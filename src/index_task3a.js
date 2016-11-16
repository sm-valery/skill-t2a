import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import fetch from 'node-fetch'
import _ from 'lodash';


// mongoose.Promise = Promise;
// mongoose.connect('mongodb://publicdb.mgbeta.ru/isuvorov_skb3');

// const Pet = mongoose.model('Pet',{
//   type: String,
//   name: String
// });

// const kitty = new Pet({
//   name: 'aaaaa',
//   type: 'cat'
// });

// kitty.save()
// .then(()=>{
//   console.log('success');
// })
// .catch((err)=>{
//   console.log('err',err);
// });

const pc = {"board":{"vendor":"IBM","model":"IBM-PC S-100","cpu":{"model":"80286","hz":12000},"image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg","video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},"ram":{"vendor":"CTS","volume":1048576,"pins":30},"os":"MS-DOS 1.25","floppy":0,"hdd":[{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],"monitor":null,"length":42,"height":21,"width":54};


const app = express();
app.use(cors());

app.get('/t3a/volumes',(req,res)=>{


  res.status(200).json(getVolumes());
})

app.get('/t3a*', (req, res) => {

  const strQue = getLodashQ(req.url.split('/'));

  if(strQue=='')
    return res.status(200).json(pc);


  var finaobj = _.get(pc,strQue,undefined);

  if(finaobj===undefined)
    return res.status(404).send("Not Found");

  res.status(200).json(finaobj);

});



app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});


function getLodashQ(arr){

  var strQ = ''; 

  arr.forEach(function(element,i)
  {
    if(i>1 && element !='')
    {
      strQ = strQ + element +'.'; 
    }
  })


strQ = strQ.substr(0,strQ.length-1);
 
console.log(strQ);
  return strQ;
}


function getVolumes(){
  var hdduni = _.groupBy(pc.hdd,'volume')

  var oRet = {};

_.forEach(hdduni,function(volumes,key){
    var sm = _.sumBy(volumes,'size');
    oRet[key] = sm.toString() + "B";
});

  return oRet;
}