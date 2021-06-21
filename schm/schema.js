var { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID } = require('graphql');
const Db = require('../db');

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(person) {
                    return person.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person) {
                    return person.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(person) {
                    return person.email;
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(person) {
                    return person.getPosts();
                }
            }
        };
    }
});
const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'THis is a POST',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                    return person.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(post) {
                    return post.title;
                }

            },
            content: {
                type: GraphQLString,
                resolve(post) {
                    return post.title;
                }
            }
        };
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            people: {
                type: new GraphQLList(Person),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.Conn.models.person.findAll({ where: args });
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(root, args) {
                    return Db.Conn.models.post.findAll({ where: args });
                }
            }
        };
    }
});
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This is a root query',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString }
    })
})
const Schema = new GraphQLSchema({
    query: Query
});
module.exports = { Schema };