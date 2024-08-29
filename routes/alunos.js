// routes/alunos.js

const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Aluno = require('../models/aluno');


sequelize.sync().then(()=>{
  console.log('Banco de dados sincronizado');
});

router.get('/', (req, res) => {
   res.render('layout', {
        title: 'Menu',
        body: 'alunos'
      });
    });

 

// Listar todos os alunos
router.get('/alunos', async (req, res) => {
  try  {
    const alunos = await Aluno.findAll();
    res.status(200);
    res.render('alunos', {
      title: 'Lista de Alunos', body: 'alunos',alunos: alunos
    });}

  catch (error) {
    res.status(500);
    return res.render('error', { title: 'Erro', mensage:error.message,error:error});
  }
  
  });

// Formulário para adicionar aluno
router.get('/alunos/add', (req, res) => {
  res.render('addaluno', { title: 'Adicionar Aluno' });
});

// Adicionar aluno
router.post('/alunos/add', async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201);
    res.redirect('/alunos');
  } catch (error) {
    res.status(400);
    return res.render('error', {title:'Erro', message:error.message,error:error});
  }

});

// Formulário para apagar aluno
router.get('/alunos/delete', (req, res) => {
  res.render('deletealuno', { title: 'Apagar Aluno' });
});

// Apagar aluno
router.post('/alunos/delete', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.body.id);
    if (!aluno) {res.status(404);
      return res.render('error', { title: 'Error',
        message:"Aluno não encontrado", error: ""});
    }
await aluno.destroy(); res.status(204); res.redirect('/alunos');
  }catch (error) {res.status(500);
    return res.render('error',{title:'Erro', message: error.message,error: error});
  } 
});

module.exports = router;
