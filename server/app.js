import { createServer } from 'http';
import express from 'express';
import Primus from 'primus';
import initPrimus from './primus';

export const app = express();

export const server = createServer(app);

export const primus = global.primus = new Primus(server);

initPrimus(primus);
