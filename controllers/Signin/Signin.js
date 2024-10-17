export const Signin = (req,res,db,bcrypt)=>{
    
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(info =>{
   
        // decrypt hash first
        const isCorrect = bcrypt.compareSync(req.body.pass,info[0].hash);

        if(isCorrect){
           
            // return user info 
           return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user => {
                res.json(user[0]);
                console.log(user[0])
            })
            .catch(err => res.json('unable top get user'));
             }
             else{
                res.json('wrong password')
             }

        
    })
    .catch(err => res.json('wrong info'));


}