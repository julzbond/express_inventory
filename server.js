var CONFIG = require('./config/config.json');
var restify = require('restify');
var server = restify.createServer({
  name: 'julzstore',
  version: '1.0.0'
});
var db = require('./models');

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/products', function(req, res){
  db.Product
    .findAll()
    .then(function(products){
      res.json(products);
    });
});

server.get('/products/:id', function(req, res){
  var id = req.params.id;
  db.Product
    .findOne({
      where: {'id' : id}
    })
    .then(function(product){
      if(!product){
        res.redirect('/products');
      }
      res.json(product);
    });
});

server.get('/orders', function(req, res){
  db.Order
    .findAll()
    .then(function(orders){
      res.json(orders);
    });
});

server.post('/orders', function(req, res){
  db.Order
    .create({
      name: req.body.name,
      quantity: req.body.quantity,
      product_id: req.body.product_id
    })
    .then(function(order){
      res.json(order);
    });
});

server.get('orders/:id', function(req, res){
  var id = req.params.id;
  db.Order
    .findOne({
      where: {'id': id},
      include: [{
        model: db.Product
      }]
    })
    .then(function(order){
      if(!order){
        res.redirect('orders');
      }
      res.json(order);
    });
});

server.listen(8080, function(){
  console.log('%s listening at %s', server.name, server.url);
});