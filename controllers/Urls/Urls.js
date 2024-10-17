export const Urls = (req, res, db) => {
    const { id, url } = req.body;
  
    if (!url || !id) {  // Change user_id to id
      return res.status(400).json('Bad Request: Missing url or user_id');
    }
  
    db('urls')
      .returning('*')
      .insert({
        url: url,
        submitdate: new Date(),
        user_id: id  // Inserting id into the user_id column
      })
      .then(response => {
        res.json(response[0].id);
      })
      .catch(err => {
        res.status(400).json('Unable to add URL');
      });
  }
  