// import bcrypt from 'bcrypt';
const Models = require('./models/index.js')
import aws from 'aws-sdk';


const s3Bucket = process.env.S3_BUCKET;


export default {

  Query: {
    // searchBooks: (parent, { title }, { models }) =>
      // Models.Launch.findAll({}),
    // allLaunches: (parent) => models.Launch.findall({ }),
    // allAuthors: (parent, args, { models }, info) =>
    //   joinMonster(
    //     info,
    //     args,
    //     sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }),
    //     { dialect: 'pg' },
    //   ),
    // getBook: requiresAuth.createResolver((parent, args, { models }, info) =>
    //   joinMonster(
    //     info,
    //     args,
    //     sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }),
    //     { dialect: 'pg' },
    //   ),
    // ),
    // allBooks: (parent, args, { models }, info) =>
    //   joinMonster(
    //     info,
    //     args,
    //     sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }),
    //     { dialect: 'pg' },
    //   ),
    getlaunches: (parent, args) => Models.Launch.findAll()
    // someSuggestions: (parent, args, { models }) => models.Suggestion.findAll(args),
    // someSuggestions2: (parent, { limit, cursor }, { models }) =>
    //   models.Suggestion.findAll({
    //     limit,
    //     where: {
    //       id: {
    //         $gt: cursor || -1,
    //       },
    //     },
    //     order: ['id'],
    //   }),
    // searchSuggestions: (parent, { query, limit, cursor }, { models }) =>
    //   models.Suggestion.findAll({
    //     limit,
    //     where: {
    //       text: {
    //         $iLike: `%${query}%`,
    //       },
    //       id: {
    //         $gt: cursor || -1,
    //       },
    //     },
    //     order: ['id'],
    //   }),
    // allUsers: requiresAuth.createResolver((parent, args, { models }) => models.User.findAll()),
    // me: (parent, args, { models, user }) => {
    //   if (user) {
    //     // they are logged in
    //     return models.User.findOne({
    //       where: {
    //         id: user.id,
    //       },
    //     });
    //   }
    //   // not logged in user
    //   return null;
    // },
    // userBoards: (parent, { owner }, { models }) =>
    //   models.Board.findAll({
    //     where: {
    //       owner,
    //     },
    //   }),
    // userSuggestions: (parent, { creatorId }, { models }) =>
    //   models.Suggestion.findAll({
    //     where: {
    //       creatorId,
    //     },
    //   }),
  },

  Mutation: {
    signS3: async (parent, {
      filename,
      filetype,
    }) => {
      // AWS_ACCESS_KEY_ID
      // AWS_SECRET_ACCESS_KEY
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-2',
      });

      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read',
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

      return {
        signedRequest,
        url,
      };
    },

    // createStudent: (parent, args, { models }) => models.Student.create(args),
    // createChampion: (parent, args, { models }) => models.Champion.create(args),
    createLaunch: (parent, args) => Models.Launch.create(args),

    
    // updateUser: (parent, { username, newUsername }, { models }) =>
    //   models.User.update({ username: newUsername }, { where: { username } }),
    // deleteUser: (parent, args, { models }) => models.User.destroy({ where: args }),
    // createBoard: (parent, args, { models }) => models.Board.create(args),
    // createSuggestion: (parent, args, { models }) => models.Suggestion.create(args),
    // createUser: async (parent, args, { models }) => {
    //   const user = args;
    //   user.password = 'idk';
    //   const userAdded = await models.User.create(user);
    //   pubsub.publish(USER_ADDED, {
    //     userAdded,
    //   });
    //   return userAdded;
    // },
    // register: async (parent, args, { models }) => {
    //   const hashedPassword = await bcrypt.hash(args.password, 12);
    //   try {
    //     const user = await models.User.create({
    //       ...args,
    //       password: hashedPassword,
    //     });
    //     return {
    //       ok: true,
    //       user,
    //     };
    //   } catch (e) {
    //     return {
    //       ok: false,
    //       errors: formatErrors(e, models),
    //     };
    //   }
    // },
    // login: async (parent, { email, password }, { models, SECRET, SECRET_2 }) =>
    //   tryLogin(email, password, models, SECRET, SECRET_2),
    // refreshTokens: (parent, { token, refreshToken }, { models, SECRET, SECRET_2 }) =>
    //   refreshTokens(token, refreshToken, models, SECRET, SECRET_2),
    // // forgetPassword: async (parent, { userId, newPassword }, { models }) => {
    // //   try {
    // //     const hashedPassword = await bcrypt.hash(newPassword, 12);
    // //     await models.User.update({ password: hashedPassword }, { where: { id: userId } });
    // //     return true;
    // //   } catch (e) {
    // //     return false;
    // //   }
    // // },
    // createBook: async (parent, args, { models }) => {
    //   const book = await models.Book.create(args);
    //   return {
    //     ...book.dataValues,
    //     authors: [],
    //   };
    // },
    // createAuthor: async (parent, args, { models }) => {
    //   const author = await models.Author.create(args);
    //   return {
    //     ...author.dataValues,
    //     books: [],
    //   };
    // },
    // addBookAuthor: async (parent, args, { models }) => {
    //   await models.BookAuthor.create(args);
    //   return true;
    // },
  },
};
