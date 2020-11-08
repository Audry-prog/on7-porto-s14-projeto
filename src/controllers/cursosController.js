const cursos = require('../models/cursos')

const getAll = (req, res) => {
    cursos.find(function (err, cursos) {
    err ? res.status(424).send({ message: err.message }) : res.status(200).send(cursos);
    })
};

const getPorTurno = (req, res) => {
    const parametros = req.query
    cursos.find(parametros, function(err,cursos){
    err ? res.status(424).send({ message: err.message }) :res.status(200).send(cursos);
    })
};

const getById = (req, res) => {
    const id = req.params.id;
    cursos.find({ id }, (err, cursos) => {
        if(err) {
            res.status(424).send({ message: err.message })
        } else {
           res.status(200).send(cursos)  
        }
    })
};

const getBootcamps = (req, res) => {
    cursos.find({ bootcamp: true }, (err, cursos) => {
        if(err) {
            res.status(424).send({ message: err.message })
        } else {
           res.status(200).send(cursos)  
        }
    })
};

const getCursosGratuitos = (req, res) => {
    const estado = req.params.estado;
    cursos.find({ estado, gratuito: true }, function (err, cursos) {
        if(err) {
            res.status(500).send({ message: err.message })
        } else{
           res.status(200).send(cursos);
        }     
    }) 
};

const getCursosPagos = (req, res) => {
    const estado = req.params.estado;
    cursos.find({ estado, gratuito: false }, function (err, cursos) {
        if(err) {
            res.status(500).send({ message: err.message })
        } else{
           res.status(200).send(cursos);
        }     
    })    
};

const postCurso = (req, res) => {
  let curso = new cursos(req.body);
  curso.save(err => {
    err ? res.status(424).send({ message: err.message }) 
    : res.status(201).send({
        status: true,
        message: 'Curso incluído com sucesso'
      });
  });
};

const deleteCurso = (req, res) => {
    const id = req.params.id;
    cursos.find({ id }, (err, curso) => {
        if (curso.length > 0) {
            cursos.deleteOne({ id }, err => {
                err ? res.status(424).send({ message: err.message }) : res.status(200).send({
                    status: true,
                    mensagem: 'Curso excluído com sucesso'
                });
            });
        } else {
            res.status(404).send('Curso não encontrado');
        };
    });
};

const deleteCursosPorTurno = (req, res) => {
    const parametros = req.query
    console.log(parametros)
    res.status(200).send({ message: "deletar os cursos por turnos"})
}

const putCurso = (req, res) => {
    const id = req.params.id;
    cursos.updateMany({ id }, { $set: req.body }, function(err, cursos) {
        if(err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message: "Curso atualizado com sucesso!"})
        }
    })
};

module.exports = {
    getAll,
    getPorTurno,
    getById,
    getBootcamps,
    getCursosGratuitos,
    getCursosPagos,
    postCurso,
    deleteCurso,
    deleteCursosPorTurno,
    putCurso
};