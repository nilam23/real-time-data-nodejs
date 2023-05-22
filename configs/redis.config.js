/* eslint-disable import/no-extraneous-dependencies */
import { Redis } from 'ioredis';

/**
 * @description
 * this class is responsible for managing all configs for redis pub/sub
 */
export class RedisConfig {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST_DEV,
      port: process.env.REDIS_PORT_DEV
    });
  }

  /**
   * @description
   * the consumer method that listens for messages on a specific channel
   * and retrieves the message when publised on the same channel from a publisher
   * @param {string} channel the channel for the consumer to listen for incoming messages
   * @param {object} callback the callback function to run on receiving the message on the proper channel
   */
  async consume(channel, callback) {
    try {
      await this.redis.subscribe(channel);

      this.redis.on('message', async (ch, message) => {
        if (channel === ch) {
          await callback(message);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description
   * the producer method that publishes some message to a specific channel
   * @param {string} channel the channel to which the producer is producing the message
   * @param {string} message the message to be produced
   */
  async produce(channel, message) {
    try {
      await this.redis.publish(channel, message);
    } catch (error) {
      throw new Error(error);
    }
  }
}
