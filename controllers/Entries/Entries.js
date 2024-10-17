export const Entires = (req,res,db) =>{
    const id = req.body.id;
    

    db('users')
    .where({id:id})
    .increment('entries',1)
    .returning('entries')
    .then(result => res.json(result[0]))
    .catch(err => res.status(400).json(err));
}

