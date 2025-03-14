// => Publisher will send a message to a channel and the subscriber will  consume this message
const redis = require('redis')

const client = redis.createClient({
    host: "localhost",
    port: 6379
});

client.on('error',(err) => {
    console.log(`Redis client error: ${err.message}`);
})

async function testPubSub(){
    try{
        await client.connect();

        const subscriber = client.duplicate();
        await subscriber.connect();

        


    }catch(err){
        console.log(err)
    }finally{
        await client.quit();
    }

}

testPubSub()