const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

async function redisDataStructures(){
   try{
    await client.connect();
    
    await client.set("user:name","Likhith Chimata")
    const name = await client.get("user:name");
    console.log("Name: ",name);

    await client.mSet(["user:email","likhithcvsrl@gmail.com","user:age","20","user:country","India"])
    const [email,age,country] = await client.mGet(["user:email","user:age","user:country"]);
    console.log("Email: ",email);
    console.log("Age: ",age);
    console.log("Country: ",country);

    await client.LPUSH('notes',['Note 1', 'Note 2', 'Note 3']);
    const notes = await client.lRange("notes",0,-1);
    console.log("Notes: ",notes);

    const lastElement = await client.LPOP('notes');
    console.log(lastElement)
    const notes2 = await client.lRange("notes",0,-1);
    console.log("Notes: ",notes2);

    await client.sAdd('user:nickName',['Likhith','SAMPLE']);
    const extractedNickName = await client.sMembers('user:nickName');
    console.log("Nicknames: ",extractedNickName);
    const isSampleAnickName = await client.sIsMember(
        "user:nickName",
        "SAMPLE"
    )
    console.log("isSampleAnickName: ",isSampleAnickName);

    await client.sRem("user:nickName","SAMPLE");
    const extractedNickName2 = await client.sMembers('user:nickName');
    console.log("Nicknames: ",extractedNickName2);
    const isSampleAnickName2 = await client.sIsMember(
        "user:nickName",
        "SAMPLE"
    )
    console.log("isSampleAnickName: ",isSampleAnickName2);


    await client.zAdd('cart',[
        {
            score: 100, value: "Product 1"
        },
        {
            score: 50, value: "Product 2"
        },
        {
            score: 300, value: "Product 3"
        }
    ]);
    const extractedCart = await client.zRangeWithScores("cart",0,-1);
    console.log("Cart: ",extractedCart);

    await client.hSet('product:1',{
        name: "Product 1",
        price: '100',
        rating : '5',
        productDesc : "Product 1 description"
    })

    const getProductRating = await client.hGet('product:1','rating');
    console.log("Product rating: ",getProductRating);

    const extractedProduct = await client.hGetAll('product:1');
    console.log(extractedProduct)


   }catch(err){
    console.error(err);   
   } finally{
    await client.quit();
   }
}

client.on('error',(err)=>{
    console.log(`Redis client error: ${err.message}`);
})

redisDataStructures();