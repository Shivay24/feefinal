var express=require("express");
var app=express();
var fileuploader=require("express-fileupload");
app.use(fileuploader());
var mysql2=require("mysql2");
var cloudinary=require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'did6ene8y', 
    api_key: '811781566798319', 
    api_secret: 's1Y51fwDc1JAy_Km9ytLPGf__Ow' 
});
app.listen(805,function(){
    console.log("server started");})
app.get("",function(req,resp){
    var path=__dirname+"/fpf/index.html";
    resp.sendFile(path);
})
app.use(express.static("fpf"));
app.use(fileuploader());
app.use(express.urlencoded(true));
let config="mysql://avnadmin:AVNS_qIDYZtQaSaRx7eC6-Qh@mysql-14aeef26-anshugarg964-a0c4.k.aivencloud.com:14737/defaultdb"
let sj=mysql2.createConnection(config);
sj.connect(function(err)
{
    if(err==null)
        console.log("Connected sir");
    else
    console.log(err.message);
})
app.get("/signup",function(req,resp){
    let email=req.query.txtEmail;
    let pwd=req.query.txtpassword;
    let uname=req.query.txtuname;
    let city=req.query.txtcity;
    let phone=req.query.txtphone;


    sj.query("insert into feeusers(uname,pwd,email,city,phone,status) values(?,?,?,?,?,?)",[uname,pwd,email,city,phone,1],function(err){
        if(err==null)
        {
           
         resp.send("welcome sir");

        }
        else
            resp.send(err.message)
    })

})
app.get("/login",function(req,resp){
    let email=req.query.txtemail;
    let pwd=req.query.txtpassword;
    sj.query("select * from feeusers where email=? and pwd=?",[email,pwd],function(err,jsonArray){
        // resp.send(jsonArray)
        console.log(jsonArray);
        if(jsonArray.length==1)
        {
            var path=__dirname+"/fpf/mainpage.html";
            resp.sendFile(path);
            
        }
        
    })
    
})
app.get("/feed",function(req,resp){
    let email=req.query.txtemail;
    let uname=req.query.uname;
    let feedback=req.query.feedback;


    sj.query("insert into feedbackform(uname,email,feedback) values(?,?,?)",[uname,email,feedback],function(err){
        if(err==null)
        {
           
         resp.send("thnku sir");

        }
        else
            resp.send(err.message)
    })

})
app.get("/book",function(req,resp){
    let email=req.query.femail;
    let city=req.query.city;
    let phone=req.query.fphone;
    let desti=req.query.fdesti;
    let last=req.query.flast;
    let fname=req.query.ffname;



    sj.query("insert into book(fname,last,email,city,phone,desti) values(?,?,?,?,?,?)",[fname,last,email,city,phone,desti],function(err){
        if(err==null)
        {
           
         resp.send("thnku sir");

        }
        else
            resp.send(err.message)
    })

})
    