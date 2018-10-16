const api = require('./controller.js'),
    bp = require('body-parser');


module.exports = function(app){
    app.use(bp.json());
    app.get('/api/humans', api.getAllHumans);
    return app;
}