const express =require('express');
const path =require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact =require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assest'));

var contactlist=[
     {
         name:"Raghvendra",
         phone:"7818982206"
     },
     {
        name:"Prasant",
        phone:"9818982206"
    },
    {
        name:"Anand",
        phone:"8818982206"
    }
 ]

app.get('/',function(req,res){
    //console.log(req);
    // res.send("prasant bajpai");
    Contact.find({},function(err,contacts){
         if(err){
             console.log('Eror in fetching contacts from db');
             return;
         }
         return res.render('home',
         {title:"My Contacts List",
         contact_list:contacts
    });
    
});
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.post('/create-contact',function(req,res){
    //   contactlist.push({
    //       name:req.body.name,
    //       phone:req.body.phone,
    //   });
   // contactlist.push(req.body);
   Contact.create(
       {
           name:req.body.name,
           phone:req.body.phone
       },
       function(err,newContact){
           if(err)
           {
               console.log('error in creating a contact!');
               return;
           }
           console.log('**********',newContact);
           return res.redirect('back');
       
   })
    
});

// delete contact
app.get('/delete-contact',function(req,res){
    //get the id from query in the ul
    
    let id = req.query.id;

   Contact.findByIdAndDelete(id,function(err){
    if(err)
    {
        console.log('Eror in deleting an object from database');
        return;
    }
    return res.redirect('/')
   });

  
});


app.listen(port,function(err){
    if(err)
    {
        console.log('error in running the server:',err);
    }
        console.log('yup! my express server is running on port:',port);
    
}); 