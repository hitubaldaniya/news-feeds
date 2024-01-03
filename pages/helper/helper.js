import { MongoClient, ObjectId } from "mongodb";
import Connection from '@/pages/credentials/mongodb';

// api/new-feeds

async function getFeeds(id){
    try{
        
        const conection = await Connection();
        const db = conection.db();
        const feedCollection = db.collection('feeds');
        
        let feed;
        if(id === 'ids'){
            feed = await feedCollection.find({}, {  _id: 1 }).toArray();
        } else if(id != null){
            feed = await feedCollection.findOne({"_id": new ObjectId(id)});
        } else {
            feed = await feedCollection.find().toArray();
        }
        
        conection.close();
        return { message:'Fetched feeds.', data: feed};

    } catch(err){
        console.log(`error mongodb getFeeds: ${err}`);
        return { message:'Some error.', error: err};
    }
}

async function deleteFeed(id){
    try{
        
        const conection = await Connection();
        const db = conection.db();
        const feedCollection = db.collection('feeds');
        
        let feed = await feedCollection.deleteOne({  _id: ObjectId(id) });
        console.log(`deleted feed: ${feed}`)
        conection.close();
        return { message:'Feed deleted.', data: feed};

    } catch(err){
        console.log(`error mongodb deleteFeed: ${err}`);
        return { message:'Some error.', error: err};
    }
}

export { getFeeds, deleteFeed };