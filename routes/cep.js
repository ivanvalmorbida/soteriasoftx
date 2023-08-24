var mysql = require('mysql2')
var express = require('express')
var settings = require("../settings")
var router = express.Router()

router.get('/cep', index)
router.post('/cep/cep', cep)
router.post('/cep/gravar', gravar)
router.post('/cep/apagar', apagar)
router.post('/cep/pesquisa', pesquisa)

function index(req, res) {
  res.render('ceps')
}

function apagar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  data.cep = data.cep.replace("-", "")
  data.cep = data.cep.replace(".", "")

  connection.connect()
  connection.query('delete from tb_cep where cep=?', [data.cep],
    function (err, rows) {
      if (!err)
        res.json({ err_msg: '' })
      else
        res.json({ 'err_msg': err })
    })
  connection.end()
}

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body, datax = []

  data.cep = data.cep.replace("-", "")
  data.cep = data.cep.replace(".", "")

  connection.connect()
  connection.query("SELECT soteriasoft.codigo_cidade(?) as c, soteriasoft.codigo_bairro(?) as b, soteriasoft.codigo_endereco(?) as e;",
    [data.cidade, data.bairro, data.endereco], function (err, rows) {
      if (!err) {
        if (rows.length != 0) {
          datax = rows[0]
          connection.connect()
          connection.query('select cep from tb_cep where cep=?', [data.cep],
            function (err, rows) {
              if (!err) {
                if (rows.length == 0) {
                  connection.query('insert into tb_cep (cep, estado, cidade, bairro, endereco, complemento)' +
                    ' values (?, ?, ?, ?, ?, ?)', [data.cep, data.estado, datax.c, datax.b, datax.e,
                    data.complemento], function (err, rows) {
                      if (!err)
                        res.json({ err_msg: '' })
                      else
                        res.json({ 'err_msg': err })

                      connection.end()
                    })
                }

                else {
                  connection.query('update tb_cep set estado=?, cidade=?, bairro=?, endereco=?,' +
                    'complemento=? where cep=?', [data.estado, datax.c, datax.b, datax.e,
                    data.complemento, data.cep], function (err, rows) {
                      if (!err)
                        res.json({ err_msg: '' })
                      else
                        res.json({ 'err_msg': err })
                    })
                  connection.end()
                }
              }
              else
                res.json({ 'err_msg': err })
            })
        }
      }
    })
}

function cep(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  data.cep = data.cep.replace("-", "")
  data.cep = data.cep.replace(".", "")

  connection.connect()

  connection.query('SELECT c.*, u.nome as estado_, d.nome as cidade_, b.nome as bairro_, e.nome as endereco_' +
    ' from tb_cep as c' +
    ' left join tb_estado u on u.codigo=c.estado' +
    ' left join tb_cidade d on d.codigo=c.cidade' +
    ' left join tb_bairro b on b.codigo=c.bairro' +
    ' left join tb_endereco e on e.codigo=c.endereco' +
    ' where c.cep=?;', [data.cep],
    function (err, rows) {
      if (!err)
        res.json(rows)
      else
        console.log('Error mensage: ' + err)
    })
  connection.end()
}

function pesquisa(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  
  connection.connect()

  var lstpar = [data.estado, data.cidade]
  var strsql = 'SELECT c.cep, u.sigla, u.nome as estado_, d.nome as cidade_,' +
  ' b.nome as bairro_, e.nome as endereco_, c.complemento' +
  ' from tb_cep as c' +
  ' left join tb_estado u on u.codigo=c.estado' +
  ' left join tb_cidade d on d.codigo=c.cidade' +
  ' left join tb_bairro b on b.codigo=c.bairro' +
  ' left join tb_endereco e on e.codigo=c.endereco' +
  ' where c.estado=? and d.nome=?'
  
  strsql += ' order by b.nome, e.nome'

  connection.query(strsql, lstpar,
    function (err, rows) {
      if (!err)
        res.json(rows)
      else
        console.log('Error mensage: ' + err)
    })
  connection.end()
}

module.exports = router