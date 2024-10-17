import bcrypt from 'bcrypt-nodejs';

export const Register = (req,res,db) =>{
    const { name , email , pass} = req.body;

    const hash = bcrypt.hashSync(pass);
   
    try{
       
        db.transaction(trans =>{
            trans.insert({
                email : email,
                name:name,
                joined : new Date()
            })
            .into('users')
            .returning('*')
            .then(user =>{

                     // Check if user was created
            if (user.length === 0) {
                throw new Error('User not created');
            }
             // Insert into login table
                return trans('login')
                .insert({
                    hash : hash,
                    email: email,
                })
                .then(()=>{
                    res.json(user[0]);
                });
            })
            .then(trans.commit)
            .catch(err => {
                console.error(err); // Log the error for debugging
                trans.rollback();
                res.status(400).json(err);
            });
        });
       


    }catch(err){
        res.json(err);
    }
}