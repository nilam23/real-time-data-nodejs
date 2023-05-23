import { RedisConfig } from '../configs/redis.config.js';

/**
 * @description
 * this class is responsible for managing all events between application client and server
 */
export class SocketioService {
  /**
   * @description
   * the method to listen on the connection event (ie. when a client connects)
   * and take care of the rest of the events taking place between client and server
   * @param {object} socketio the socket io object
   */
  static async useSocketIo(socketio) {
    socketio.on('connection', (socket) => {
      // consuming the post creation message published from the post-controller-method
      // and emitting the same on the 'post' event
      const redisConfig = new RedisConfig();

      redisConfig.consume('post', (message) => {
        const data = JSON.parse(message);

        socket.emit('post', data);
      });

      redisConfig.consume('comment', (message) => {
        const data = JSON.parse(message);

        socket.emit('comment', data);
      });
    });
  }
}
