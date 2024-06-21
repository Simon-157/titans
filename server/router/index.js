import express from 'express';
import addCharacterMiddlewares from '../middlewares/character';
import addFileMiddlewares from '../middlewares/file';
import addSsoMiddlewares from '../middlewares/sso';
import addUserMiddleware from '../middlewares/user';

const router = express.Router();

addCharacterMiddlewares(router);
addFileMiddlewares(router);
addSsoMiddlewares(router);
addUserMiddleware(router);

export default router;
