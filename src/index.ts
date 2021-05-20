import * as dotenv from 'dotenv';
import Fastify, {FastifyInstance} from 'fastify';
import {AddressInfo} from 'net';

// Initialize dotenv
dotenv.config();

const app: FastifyInstance = Fastify({});
const HOST = process.env.APP_HOST || '0.0.0.0';
const PORT = process.env.APP_PORT || 5000;

// Declare a route
app.get('/', async (request, reply) => {
  return {
    hello: 'world!',
  };
});

// Run the server!
const start = async () => {
  try {
    await app.listen(PORT, HOST);

    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log(
      `Server is running on http://${(address as AddressInfo).address}:${port}`
    );
  } catch (err) {
    app.log.error(err);
    throw new Error(err);
  }
};

start();
