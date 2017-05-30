module.exports = {
    //database: 'mongodb://localhost:27017/meanauth'
    database: process.env.DATABASEURL || 'mongodb://localhost:27017/meanauth',
    secret: 'stewieloudpreciouscat'
}
