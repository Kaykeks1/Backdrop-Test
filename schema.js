import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type shortenURL {
    shortString: String
    url: String
  }

  type Query {
    getShortenURL(sid: String): shortenURL
  }

  input ShortenURLInput {
    url: String!
    shortString: String
  }

  type Mutation {
    createShortenURL(input: ShortenURLInput): shortenURL
  }
`);

export default schema;