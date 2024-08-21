const express = require('express');
const app = express();

// Simulação de banco de dados
const users = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'manager', role: 'manager', projects: [1, 2] },
    { id: 3, username: 'collab', role: 'collaborator', projects: [1] }
];

const projects = [
    { id: 1, name: 'Projeto A', members: [2, 3] },
    { id: 2, name: 'Projeto B', members: [2] }
];

// Middleware para simular autenticação
app.use((req, res, next) => {
    const userId = req.query.userId;
    req.user = users.find(user => user.id == userId);
    next();
});

// Endpoint vulnerável - criação de projetos
app.post('/projects/create', (req, res) => {
    if (req.user) {
        const newProject = { id: projects.length + 1, name: `Projeto ${String.fromCharCode(65 + projects.length)}`, members: [req.user.id] };
        projects.push(newProject);
        res.send(`Projeto ${newProject.name} criado com sucesso!`);
    } else {
        res.status(403).send('Acesso negado.');
    }
});

// Endpoint vulnerável - gerenciar membros do projeto
app.post('/projects/:projectId/addMember', (req, res) => {
    const project = projects.find(proj => proj.id == req.params.projectId);
    if (req.user && project) {
        project.members.push(parseInt(req.query.memberId));
        res.send(`Membro adicionado ao ${project.name}.`);
    } else {
        res.status(403).send('Acesso negado.');
    }
});

app.get('/projects', (req, res) => {
	res.send(projects);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

//CÓDIGO CORRIGIDO
//const express = require('express');
//const app = express();

//// Simulação de banco de dados
//const users = [
//    { id: 1, username: 'admin', role: 'admin' },
//    { id: 2, username: 'manager', role: 'manager', projects: [1, 2] },
//    { id: 3, username: 'collab', role: 'collaborator', projects: [1] }
//];

//const projects = [
//    { id: 1, name: 'Projeto A', members: [2, 3] },
//    { id: 2, name: 'Projeto B', members: [2] }
//];

//// Middleware para simular autenticação
//app.use((req, res, next) => {
//    const userId = req.query.userId;
//    req.user = users.find(user => user.id == userId);
//    next();
//});

//// Middleware para verificar permissões de administrador
//function checkAdmin(req, res, next) {
//    if (req.user && req.user.role === 'admin') {
//        next();
//    } else {
//        res.status(401).send('Acesso negado. Somente administradores podem realizar esta ação.');
//    }
//}

//// Middleware para verificar permissões de gerente de projeto
//function checkManager(req, res, next) {
//    if (req.user && (req.user.role === 'manager' || req.user.role === 'admin')) {
//        next();
//    } else {
//        res.status(401).send('Acesso negado. Somente gerentes de projeto podem realizar esta ação.');
//    }
//}

//// Middleware para verificar se o usuário tem acesso ao projeto
//function checkProjectAccess(req, res, next) {
//    const project = projects.find(proj => proj.id == req.params.projectId);
//    if (req.user && project && (project.members.includes(req.user.id) || req.user.role === 'admin')) {
//        req.project = project;
//        next();
//    } else {
//        res.status(401).send('Acesso negado. Você não tem permissão para acessar este projeto.');
//    }
//}

//// Endpoint seguro - criação de projetos
//app.post('/projects/create', checkManager, (req, res) => {
//    const newProject = { id: projects.length + 1, name: `Projeto ${String.fromCharCode(65 + projects.length)}`, members: [req.user.id] };
//    projects.push(newProject);
//    res.send(`Projeto ${newProject.name} criado com sucesso!`);
//});

//// Endpoint seguro - gerenciar membros do projeto
//app.post('/projects/:projectId/addMember', checkProjectAccess, checkManager, (req, res) => {
//    const memberId = parseInt(req.query.memberId);
//    if (!req.project.members.includes(memberId)) {
//        req.project.members.push(memberId);
//        res.send(`Membro adicionado ao ${req.project.name}.`);
//    } else {
//        res.send(`Membro já faz parte do projeto ${req.project.name}.`);
//    }
//});

//app.get('/projects', (req, res) => {
//	res.send(projects);
//});

//app.listen(3000, () => {
//    console.log('Servidor rodando na porta 3000');
//});
