const redis = require('redis');
const client = redis.createClient({
    host: "localhost",
    port: 6379
});

client.on('error', (err) => {
    console.log(`Redis client error: ${err.message}`);
});

async function transactionExample() {
    console.time("Transaction Time");
    const result = await client.multi()
        .set("key1", "value1")
        .set("key2", "value2")
        .get("key1")
        .get("key2")
        .exec();
    console.timeEnd("Transaction Time");

    console.log(result);
}

async function pipelineExample() {
    console.time("Pipeline Time");
    const pipeline = client.multi();
    pipeline.set("key1", "value1");
    pipeline.set("key2", "value2");
    pipeline.get("key1");
    pipeline.get("key2");

    const result = await pipeline.exec();
    console.timeEnd("Pipeline Time");

    console.log(result);
}

async function runExamples() {
    try {
        // Connect only once
        await client.connect();
        
        // Run examples sequentially
        await transactionExample();
        await pipelineExample();
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        // Close connection once at the end
        await client.quit();
    }
}

runExamples();