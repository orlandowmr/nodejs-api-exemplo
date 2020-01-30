var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var estados = [{sigla : "SP", nome: "São Paulo", imagem: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-540x360/06/fa/26/30.jpg"}, 
               {sigla : "RJ", nome: "Rio de Janeiro", imagem: "https://www.emaisgoias.com.br/wp-content/uploads/2019/10/cristo-redentor-620x450.jpg"}, 
               {sigla : "MG", nome: "Minas Gerais", imagem: "https://img.olx.com.br/images/12/129911103872193.jpg"}
             ];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//Rota "Estados"
app.post('/estado', function (req, res) {

  // Adiciona no array as informações recebidas na requisição
  estados.push(req.body);
  res.send(estados);

});

//Rota "Estados"
app.get('/estado', function (req, res) {

    //Retornar JSON de todos os estados:
    res.send(estados);
});

//Rota "Estado"
app.get('/estado/:sigla', function (req, res) {
   
  //Obter sigla do parâmetro "estado"
  var sigla = req.params.sigla;
  
  //Obter o estado pela Sigla:
  const found = estados.find(x => x.sigla = sigla);
  
  res.send(found);

});

//Rota "Estado"
app.delete('/estado/:sigla', function (req, res) {
   
  //Obter sigla do parâmetro "estado"
  var sigla = req.params.sigla;

  //Obter o estado pela Sigla e remover:
  const found = estados.find(x => x.sigla = sigla);
  estados.splice( estados.indexOf(found), 1 );

  res.send(estados);

});

// Iniciando a aplicação
app.listen(3000, function () {
  console.log('Aplicação rodando na porta 3000!');
});
