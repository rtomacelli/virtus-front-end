var faker = require('faker-br');
var fs = require('fs');

// TODO
// prtfis = [ 'Administrador', 'Chefe', 'Supervisor', 'Auditor', 'Visualizador', 'Desenvolvedor' ];

function generateUsers(size) {

    let users = []
  
    for (let id=1; id <= size; id++) {
  
        let id = i;
        let email     = faker.internet.email();
        let nome      = faker.name.findName();
        let telefone  = faker.phone.phoneNumber();
  
        users.push({
            "id": id,
            "nome":     nome,
            "email":    email,
            "telefone": telefone,
        });
    }
  
    return { "data": users }
  }

  let dataObj = generateUsers(10);

var database = { usuarios: [], escritorios: [], perfis: [], funcionalidades: [], estados: [], acoes: [], workflows: [] };

 for (var i = 1; i <= 50; i++) {
    database.usuarios.push({
        id: i,
        email:    faker.internet.email(),
        nome:     faker.name.findName(),
        password: faker.internet.password,
        telefone: faker.phone.phoneNumber() ,
        username: faker.internet.userName(),
        papel_id: faker.random.number(10),
        papel:    faker.name.jobTitle(),
    });
}


for (var i = 1; i <= 4; i++) {
    database.escritorios.push({
        id: i,
        nome:        faker.name.findName(),
        abreviatura: faker.name.findName(),
        descricao:   faker.lorem.words(5),
        chefe_id:    faker.random.number(10),
        chefe_nome:  faker.name.findName(),
        usuarios:    faker.random.objectElement(generateUsers(4)),
    });
}

for (var i = 1; i <= 10; i++) {
    database.perfis.push({
        perfil_id:    i,
        name:         faker.name.jobTitle(),
        description:  faker.lorem.words(10),
    });
}

for (var i = 1; i <= 4; i++) {
    database.funcionalidades.push({
        id: i,
        nome:        faker.name.findName(),
        codigo:       i,
        descricao:   faker.lorem.words(5),
    });
}

for (var i = 1; i <= 4; i++) {
    database.estados.push({
        id: i,
        name:         faker.name.findName(),
        description:  faker.lorem.words(5),
        stereotype:   faker.lorem.words(5),
    });
}


for (var i = 1; i <= 4; i++) {
    database.acoes.push({
        id: i,
        nome:                   faker.name.findName(),
        origin_status_id:       faker.name.findName(),
        destination_status_id:  faker.lorem.words(1),
        other_than:             faker.random.boolean(),
        descricao:              faker.lorem.words(1),
    });
}

for (var i = 1; i <= 4; i++) {
    database.workflows.push({
        id: i,
        workflow:         faker.name.findName(),
        descricao:        faker.lorem.words(5),
        tipo_de_entidade: i,
        inicia_em:        faker.date.soon(1),
        finaliza_em:      faker.date.soon(10),
    });
}

var json = JSON.stringify(database);
fs.writeFile('api/database.json', json, 'utf8', (err) => {
    if (err) { console.error(err); return; };
    console.log("database.json created");

});