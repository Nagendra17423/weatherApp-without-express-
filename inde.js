// const fetch=new require("node-fetch");

// const s=fetch("http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=a8218c9ade34a5e82bda513f55a2f229");
// s.then((obj)=>{
//     return obj.json();

// })
// .then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })


const http=require("http");
const fs=require("fs");
const requests=require("requests");
const prompt=require("prompt-sync")();
const file=fs.readFileSync("index.html","utf-8");
const callval=(tempval,val)=>{
    let temp=tempval.replace("{%temp%}",parseInt(parseInt(val.main.temp)-273.15));
    temp=temp.replace("{%temp_max%}",parseInt(parseInt(val.main.temp_max)-273.15));
    temp=temp.replace("{%temp_min%}",parseInt(parseInt(val.main.temp_min)-273.15));
    temp=temp.replace("{%loc%}",val.name);
    temp=temp.replace("{%country%}",val.sys.country);
    temp=temp.replace("{%climateStatus%}",val.weather[0].main);
    temp=temp.replace("{%climate%}",val.weather[0].main);
return temp;
}
const server=http.createServer((req,res)=>{
if(req.url=="/")
{
    const city=prompt("enter city ");
    // res.end("hello from here ");
requests(
    'http://api.openweathermap.org/data/2.5/weather?q='+`${city}`+'&appid=a8218c9ade34a5e82bda513f55a2f229'
    )
.on('data', function (chunk) {

    const objdata=JSON.parse(chunk);
    const d=[objdata];
    const realdata=d.map((val)=>callval(file,val)).join("");
    //  console.log(realdata);
    // res.writeHead(200,{"Content-Type":"text/html"})
    res.write(realdata);
//   console.log(d[0].main.temp+" "+d[0].main.temp_max+" "+d[0].main.temp_max);
})
.on('end', function (err) {
    
  if (err) 
  return console.log('connection closed due to errors', err);
  res.end();
//   console.log('end');
})
}
})

server.listen("8000","127.0.0.1",()=>{
    console.log('listening');
});


