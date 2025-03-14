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

        await subscriber.subscribe("messages", (message,channel) => {
            console.log(`Received message from ${channel}: ${message}`);
        });

        await client.publish("messages", "Hello world");
        await client.publish("messages", "Hello world 2");

        await new Promise((res)=>setTimeout(res,1000));
        await subscriber.unsubscribe("messages");
        await subscriber.quit()

        //pieplines & transactions
        //Transactions
        // const multi = client.multi();
        // multi.set('key-transactions1','value1')
        // multi.set('key-transactions2','value2')
        // multi.get('key-transactions1')
        // multi.get('key-transactions2')

        // const result = await multi.exec();
        // console.log(result);

        // const pipeline = client.pipeline();
        // pipeline.set('key-pipeline1','value1');
        // pipeline.get('key-pipeline1');
        // pipeline.get('key-pipeline2');
        // const result2 = await pipeline.exec();
        // console.log(result2);

    }catch(err){
        console.log(err)
    }finally{
        await client.quit();
    }

}

testPubSub()