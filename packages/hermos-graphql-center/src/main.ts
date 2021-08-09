import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Choplin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Book: {
    title: () => books[0].title,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function bootstrap() {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}
bootstrap();
