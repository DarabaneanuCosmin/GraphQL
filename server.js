const Express = require('express');
const Graph = require('express-graphql');
const Schema = require('./schm/schema');

var app = Express();
app.use('/graphql', Graph.graphqlHTTP({
    schema: Schema.Schema,
    pretty: true,
    graphiql: true

}));
app.listen(4000, () => console.log('Serverul ruleaza la : 4000/graphql'));