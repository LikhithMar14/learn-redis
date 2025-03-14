const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

async function testRedisConnection(){
    try{
        await client.connect();
        console.log('Redis client connected to the server');
        
        await client.set("1","Likhith");
        await client.set("2","Rahul");

        const extractedValue = await client.get("1");
        console.log(extractedValue);

        const deleteCount = await client.del("2");
        console.log(deleteCount);

        await client.set("2",100);
        const incrementCount = await client.incr("2");
        console.log(incrementCount)
        
        const decrementCount = await client.decr("2");
        console.log(decrementCount);
    }catch{
        console.log('Redis client error');
    }finally{
        await client.quit();
    }
}

client.on('error', (err) => {
    console.log(`Redis client error: ${err.message}`);
});

testRedisConnection()
