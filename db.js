const Sequelize = require('sequelize');
const _ = require('lodash');
const Faker = require('faker');
var Conn = new Sequelize(
    'relay',
    'root',
    '', {
        dialect: 'mysql',
        host: 'localhost'
    });

const Person = Conn.define('person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});
const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({ force: true }).then((() => {
    _.times(10, (() => {
        return Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(person => {
            return person.createPost({
                title: `Sample title by ${person.firstName}`,
                content: 'This is a sample article'
            })
        });
    }));
}));
module.exports = { Conn };