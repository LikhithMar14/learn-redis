const Redis = require("ioredis");

const redis = new Redis();

async function ioRedisDemo() {
  try {
    await redis.set("key", "value");
    const val = await redis.get("key");
    console.log(val);
  } catch (e) {
    console.error(e);
  } finally {
    redis.quit();
  }
}

ioRedisDemo();