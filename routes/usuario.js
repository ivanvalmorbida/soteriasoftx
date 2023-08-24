var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql2')
var auth = require('../authetication')

router.get('/usuario', index)
router.get('/usuario/dlg/apagar', dlg_apagar)
router.get('/usuario/dlg/localizar', dlg_localizar)
router.get('/usuario/pessoa_nome', pessoa_nome)
router.post('/usuario/gravar', gravar)
router.post('/usuario/codigo', codigo)
router.post('/usuario/localizar', localizar)
router.post('/usuario/login', login)

function index(req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('usuario', {empresa: settings.empresa})
}

function login(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var usu = req.body.usu
  var sen = req.body.sen

  connection.connect()
  connection.query('SELECT codigo, tipo from tb_usuario'+
  ' where usuario=? and senha=?',[usu, sen], function(err, rows, fields) {
    if (!err){
      if (rows.length>0){
        req.session.UserCod = rows[0].codigo
        req.session.UserNom = usu
        req.session.UserTip = rows[0].tipo
      }
      res.json({dados: rows})
    }
    else
      console.log('Error mensage: '+err)
  });
  connection.end()
}

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  if (data.codigo==0) {
    connection.query('insert into tb_usuario (tipo, usuario, senha, '+ 
    'pessoa, cadastro) values (?, ?, ?, ?, now());', 
    [data.tipo, data.usuario, data.senha, data.pessoa],
    function(err, rows) {
      if (!err)
        res.json({codigo: rows.insertId})      
      else
        console.log('Error mensage: '+err)
    })
  }   
  else {
    connection.query('update tb_usuario set tipo=?, usuario=?, senha=?, '+
    'pessoa=? where codigo=?',[data.tipo, data.usuario, data.senha, data.pessoa, data.codigo],
    function(err, rows) {
      if (!err)
        res.json({codigo: data.codigo})
      else
        console.log('Error mensage: '+err)
    })
  }     
  connection.end()
}

function codigo(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query('SELECT u.*, p.nome as pessoa_ from tb_usuario u'+
  ' left join tb_pessoa p on u.pessoa=p.codigo'+
  ' where u.codigo='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function localizar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  var sql = ''

  sql += "SELECT u.codigo, u.usuario, p.nome as pessoa,"
  sql += " case when u.tipo=1 then 'Admin' else 'Operac' end as tipo"
  sql += " FROM tb_usuario u left join tb_pessoa p on p.codigo=u.pessoa"
  sql += " Where"

  if (data.camp=="usuario"){
    sql += " usuario like '%"+data.text+"%'"
  }

  connection.connect();
  connection.query(sql, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })

  connection.end()
}

function dlg_localizar(req, res) {
  res.render('usuario_dlg_localizar')
}

function dlg_apagar(req, res) {
  res.render('usuario_dlg_apagar')
}

function pessoa_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo, nome from tb_pessoa"+
  " where nome like '"+txt+"%' and codigo in(select pessoa FROM tb_usuario)"+
  " order by nome LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router