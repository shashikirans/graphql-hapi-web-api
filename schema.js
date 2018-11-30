export default `

  type Launch {
    name: String!
  }

  type S3Payload {
    signedRequest: String!,
    url: String!,
  }

  type Query {
    getlaunches: [Launch!]!
  }

  type Mutation {
    signS3(filename: String!, filetype: String!): S3Payload!
    createLaunch(name: String!): Launch!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
