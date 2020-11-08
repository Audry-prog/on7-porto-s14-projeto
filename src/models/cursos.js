const mongoose = require('mongoose');

//Estrutura do seu model (atributos da sua entidade)
const cursosSchema = new mongoose.Schema({
    id: { type: Number },
    descricao: { type: String },
    dataInclusao: { type: String },
    ativo: { type: Boolean },
    horario: { type: String },
    bootcamp: { type: Boolean },
    quantidadeAlunos: { type: Number },
    gratuito: { type: Boolean },
    cidade: { type: String },
    estado: { type: String },
},{
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

//atribuindo o esquema a uma collection
//estou definindo o nome da collection que irei salvar no banco
const cursos = mongoose.model('cursos', cursosSchema);

//exportar o model para ser utilizado
module.exports = cursos;