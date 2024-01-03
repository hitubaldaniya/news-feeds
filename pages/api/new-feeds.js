import { MongoClient } from "mongodb";

// api/new-feeds

async function handler(req, res){
    if(req.method === 'POST'){
        try{

            const data = req.body;

            const conection = await MongoClient.connect('mongodb+srv://hitesh123:hitesh123@cluster0.udlyqcz.mongodb.net/feeds?retryWrites=true&w=majority');
            const db = conection.db();

            const feedCollection = db.collection('feeds');

            const result = await feedCollection.insertOne(data);

            console.log(result);

            conection.close();

            res.status(201).json({ message:'Feeds Inseted.', data: result});

        } catch(err){
            console.log(`error mongodb handler: ${err}`)
        }

    }
}

export default handler;