import { MongoClient } from "mongodb";

async function Connection(){
    const conection = await MongoClient.connect('mongodb+srv://hitesh123:hitesh123@cluster0.udlyqcz.mongodb.net/feeds?retryWrites=true&w=majority');
    return conection;
}

export default Connection;