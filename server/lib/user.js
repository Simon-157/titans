import {
// readFileSync,
// writeFileSync,
} from 'fs';
// import get from 'lodash/get';
// import kebabCase from 'lodash/kebabCase';
// import map from 'lodash/map';
// import reduce from 'lodash/reduce';
// import set from 'lodash/set';
import {
// emptyObj,
// _ID,
// DATA,
} from 'defaults';
import { User } from 'collections';
import { badWordsPattern, wholeBadWordsPattern } from 'lib/string';
// import { forEach } from 'server/connectors/cursor';
// import { delay } from 'server/utils/delay';
// import { sendCDP } from './cdp';

export async function checkForName(initial, login = initial.toLocaleLowerCase(), counter = 2) {
  const exists = await User.collection.findOne({
    login,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (exists) {
    // eslint-disable-next-line no-param-reassign
    login = await checkForName(initial, `${initial.toLocaleLowerCase()}_${counter}`, counter + 1);
  }

  return login;
}

// export async function readUsersCreatedAt() {
//   let users = readFileSync('users.json', { encoding: 'utf8' });
//
//   users = JSON.parse(users);
//
//   let usersLength = users.length;
//   console.log(`Processing ${usersLength} users...`); // eslint-disable-line no-console
//   while (usersLength-- > 0) {
//     const user = users[usersLength];
//
//     // eslint-disable-next-line no-await-in-loop
//     const existing = await User.collection.findOne({
//       _id: user.id,
//     }, {
//       projection: {
//         _id: 1,
//         createdAt: 1,
//       },
//     });
//
//     console.log(usersLength); // eslint-disable-line no-console
//
//     if (!existing || (existing.createdAt && (typeof existing.createdAt !== 'string'))) {
//       continue;
//     }
//
//     // eslint-disable-next-line no-await-in-loop
//     await User.collection.updateOne({
//       _id: user.id,
//     }, {
//       $set: {
//         createdAt: new Date(user.createdAt),
//       },
//     });
//   }
//
//   console.log(`${users.length || 0} users processed`); // eslint-disable-line no-console
// }
//
// readUsersCreatedAt();

export async function readUsers() {
  // // eslint-disable-next-line no-console
  // console.log('Getting existing users to process...');
  //
  // let users;
  //
  // const existingById = {};
  // const existingByEmail = {};
  //
  // let int = 0;
  //
  // User.collection.find({}, {
  //   projection: {
  //     _id: 1,
  //     email: 1,
  //     login: 1,
  //   },
  // })
  //   .on('data', function onUserCursorData(doc) {
  //     // eslint-disable-next-line no-console
  //     console.log('Getting', int++);
  //
  //     const { _id, email } = doc;
  //
  //     existingById[_id] = true;
  //
  //     if (email) {
  //       existingByEmail[email] = true;
  //     }
  //   })
  //   .on('end', async function onUserCursorEnd() {
  //     try {
  //       users = readFileSync('users.json', { encoding: 'utf8' });
  //
  //       users = JSON.parse(users);
  //
  //       // eslint-disable-next-line no-console
  //       console.log('Processing users...');
  //
  //       const processed = [];
  //
  //       let usersLength = users.length;
  //       while (usersLength-- > 0) {
  //         // eslint-disable-next-line no-console
  //         console.log('Processing', usersLength);
  //         const user = users[usersLength];
  //
  //         const { _id, id, country, email } = user;
  //
  //         if (!_id) {
  //           set(user, ['_id'], id);
  //           delete user.id; // eslint-disable-line no-param-reassign
  //         }
  //
  //         // // eslint-disable-next-line no-await-in-loop
  //         const exists = existingById[user._id];
  //
  //         if (exists) {
  //           continue;
  //         }
  //
  //         let { username } = user;
  //
  //         if (email) {
  //           const emailExists = existingByEmail[email];
  //
  //           if (emailExists && (emailExists._id !== user._id)) {
  //             // eslint-disable-next-line no-console
  //             console.log('User exists');
  //             // eslint-disable-next-line no-console
  //             console.log(user);
  //             continue;
  //           }
  //         }
  //
  //         // if (user._id.length === 36) { // fantasy users import
  //         //   const {
  //         //     createdTimestamp,
  //         //     dob,
  //         //     emailVerified,
  //         //     enabled,
  //         //     // managerName,
  //         //     marketingComms,
  //         //   } = user;
  //         //
  //         //   if (email) {
  //         //     // eslint-disable-next-line no-await-in-loop
  //         //     const emailExists = await User.collection.findOne({
  //         //       email,
  //         //     }, {
  //         //       projection: {
  //         //         _id: 1,
  //         //       },
  //         //     });
  //         //
  //         //     if (emailExists) {
  //         //       continue;
  //         //     }
  //         //   }
  //         //
  //         //   set(user, ['active'], enabled === 'true');
  //         //   set(user, ['birthDate'], new Date(dob));
  //         //   set(user, ['createdAt'], new Date(parseInt(createdTimestamp, 10)));
  //         //   set(user, ['verified'], emailVerified === 'true');
  //         //
  //         //   // username = managerName.replace(/[^0-9a-zA-Z_]/g, '');
  //         //
  //         //   if (marketingComms === 'yes') {
  //         //     set(user, ['allowEmail'], true);
  //         //     set(user, ['allowPromo'], true);
  //         //   }
  //         //
  //         //   delete user.createdTimestamp; // eslint-disable-line
  //         //   delete user.dob; // eslint-disable-line
  //         //   delete user.emailVerified; // eslint-disable-line
  //         //   delete user.enabled; // eslint-disable-line
  //         //   delete user.managerName; // eslint-disable-line
  //         //   delete user.marketingComms; // eslint-disable-line
  //         // } else {
  //         username = user.username && user.username.replace(/[^0-9a-zA-Z_]/g, '');
  //
  //         if (!username) {
  //           username = email;
  //
  //           set(user, ['username'], email);
  //         }
  //
  //         set(user, ['active'], true);
  //         // }
  //
  //         // eslint-disable-next-line no-await-in-loop
  //         const loginExists = await User.collection.findOne({
  //           login: username.toLocaleLowerCase(),
  //           _id: {
  //             $ne: user._id,
  //           },
  //         }, {
  //           projection: {
  //             _id: 1,
  //           },
  //         });
  //
  //         if (loginExists) {
  //           // eslint-disable-next-line no-await-in-loop
  //           username = await checkForName(username);
  //         }
  //
  //         set(user, ['username'], username);
  //         set(user, ['login'], username.toLocaleLowerCase());
  //
  //         if (country) {
  //           set(user, ['country'], kebabCase(country));
  //         }
  //
  //         set(user, ['role'], 'user');
  //
  //         processed.push(user);
  //       }
  //
  //       await User.insertMany(processed, { ordered: false });
  //     } catch (err) {
  //       const errors = reduce(get(err, ['writeErrors']), (result, e) => {
  //         const { errmsg } = e;
  //
  //         if (errmsg.indexOf('E11000 duplicate key error collection: sso.users index: _id') === 0) {
  //           return result;
  //         }
  //
  //         result.push(e);
  //
  //         return result;
  //       }, []);
  //
  //       if (errors.length !== 0) {
  //         // eslint-disable-next-line no-console
  //         console.log('errors processing users:', JSON.stringify(errors, null, 2));
  //       }
  //     } finally {
  //       // eslint-disable-next-line no-console
  //       console.log(`${users.length || 0} users processed`);
  //     }
  //   });
}

export async function getUsers() {
  // let users = [];
  //
  // User.collection.find()
  //   .on('data', function onUserCursorData(doc) {
  //     users.push(doc);
  //   })
  //   .on('end', async function onUserCursorEnd() {
  //     writeFileSync('usersSSO.json', JSON.stringify(users, null, 2));
  //
  //     users = null;
  //   });
}

export async function writeUsers() {
  // let users = readFileSync('users.json', { encoding: 'utf8' });
  //
  // users = JSON.parse(users);
  //
  // // eslint-disable-next-line no-console
  // console.log(`Processing ${users.length} users`);
  //
  // try {
  //   await User.insertMany(users, { ordered: false });
  // } catch (err) {
  //   const errors = reduce(get(err, ['writeErrors']), (result, e) => {
  //     const { errmsg } = e;
  //
  //     if (errmsg.indexOf('E11000 duplicate key error collection: sso.users index: _id') === 0) {
  //       return result;
  //     }
  //
  //     result.push(e);
  //
  //     return result;
  //   }, []);
  //
  //   let errorsLength = errors.length;
  //   if (errorsLength !== 0) {
  //     // eslint-disable-next-line no-console
  //     // console.log('errors processing users:', JSON.stringify(errors, null, 2));
  //
  //     users = [];
  //
  //     while (errorsLength-- > 0) {
  //       const error = errors[errorsLength];
  //
  //       const { op } = error.err;
  //
  //       const { _id, email } = op;
  //
  //       if (email) {
  //         // eslint-disable-next-line no-await-in-loop
  //         const emailExists = await User.collection.findOne({
  //           email,
  //           _id: {
  //             $ne: _id,
  //           },
  //         }, {
  //           projection: {
  //             _id: 1,
  //           },
  //         });
  //
  //         if (emailExists && (emailExists._id !== _id)) {
  //           // eslint-disable-next-line no-console
  //           console.log('User exists');
  //           // eslint-disable-next-line no-console
  //           console.log(op);
  //           continue;
  //         }
  //       }
  //
  //       let { username } = op;
  //
  //       // eslint-disable-next-line no-await-in-loop
  //       username = await checkForName(username);
  //
  //       op.username = username;
  //       op.login = username.toLocaleLowerCase();
  //
  //       users.push(op);
  //     }
  //
  //     try {
  //       await User.insertMany(users, { ordered: false });
  //     } catch (err2) {
  //       // const errors2 = reduce(get(err2, ['writeErrors']), (result, e) => {
  //       //   const { errmsg } = e;
  //       //
  //       //   if (errmsg.indexOf('E11000 duplicate key error collection: sso.users index: _id') === 0) {
  //       //     return result;
  //       //   }
  //       //
  //       //   result.push(e);
  //       //
  //       //   return result;
  //       // }, []);
  //       //
  //       // errorsLength = errors2.length;
  //       // if (errorsLength !== 0) {
  //       //   // eslint-disable-next-line no-console
  //       //   console.log('errors processing users:', JSON.stringify(errors2, null, 2));
  //       // }
  //     }
  //   }
  // } finally {
  //   // eslint-disable-next-line no-console
  //   console.log('Users processed');
  // }
  //
  // // let users = readFileSync('usersSSOprod.json', { encoding: 'utf8' });
  // //
  // // users = JSON.parse(users);
  // //
  // // console.log(users.length);
  // //
  // // await User.insertMany(users, { ordered: false });
  // //
  // // console.log(users.length);
  //
  // users = null;
}

export async function sendAllCDP() {
  // const cursor = User.collection.find({
  //   country: {
  //     $exists: true,
  //   },
  // }, {
  //   projection: {
  //     _id: 1,
  //     allowEmail: 1,
  //     birthDate: 1,
  //     email: 1,
  //     city: 1,
  //     country: 1,
  //     firstName: 1,
  //     gender: 1,
  //     lastName: 1,
  //     phoneNumber: 1,
  //     postalCode: 1,
  //     username: 1,
  //   },
  // });
  //
  // await forEach(cursor, async function forEachUser(doc) {
  //   console.log(doc);
  //
  //   // const { country } = doc;
  //   //
  //   // sendCDP(emptyObj, {
  //   //   ...doc,
  //   //   country: kebabCase(country),
  //   // });
  //
  //   await delay(1000);
  // });
}

// sendAllCDP();

export function isUsernameFormatCorrect(username, minimumLength = 3) {
  const regex = new RegExp(`^[a-zA-Z0-9_][\\w]{${minimumLength - 1},15}$`);

  return regex.test(username);
}

export function isValidUsername(username, minimumLength = 3) {
  const usernameFormat = new RegExp(`^[a-zA-Z0-9_][\\w]{${minimumLength - 1},15}$`);

  if (!usernameFormat.test(username)) {
    return 'Wrong Username Format';
  }

  const wholeBadWordsFormat = new RegExp(wholeBadWordsPattern, 'i');

  if (wholeBadWordsFormat.test(username)) {
    return 'Wrong Username Format';
  }

  const badWordsFormat = new RegExp(badWordsPattern, 'gi');

  if (badWordsFormat.test(username)) {
    return 'Wrong Username Format';
  }

  return true;
}

const hasLetter = /\D/;
const hasNumber = /\d/;

export function isValidPassword(password = '') {
  if (password.length < 8) {
    return 'Your password is not long enough, please use at least 8 characters';
  }

  if (!hasNumber.test(password)) {
    return 'Your password must contain at least one number';
  }

  if (!hasLetter.test(password)) {
    return 'Your password must contain at least one letter';
  }

  return true;
}
