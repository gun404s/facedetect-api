export const Toptable = (req, res, db) => {
    db('urls')
    .select('users.name as username')
    .count('urls.url as total_urls')  // Count the number of URLs per user
    .join('users', 'users.id', '=', 'urls.user_id')  // Proper join condition
    .groupBy('users.name', 'urls.user_id')  // Group by the user
    .orderBy('total_urls', 'desc')  // Order by the count
    .limit(10)  // Limit the results to the top 10
    .then(data => {
        res.json(data);  // Return the entire array of data
    })
    .catch(err => {
        console.log('Unable to fetch leaderboard:', err);
        res.status(400).json('Unable to fetch leaderboard');
    });
};