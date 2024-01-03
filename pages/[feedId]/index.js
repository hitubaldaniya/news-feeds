import FeedDetails from "@/components/feeds/FeedDetails";
import { Fragment } from "react";
import Head from 'next/head'
import { MongoClient, ObjectId } from "mongodb";

function FeedDetail(props){
  return (
    <Fragment>
      <Head>
          <title>{props.feedData.title}</title>
          <meta 
              name={props.meta.name}
              content={props.meta.content}
          />
      </Head>
    <FeedDetails 
        image={props.feedData.image} 
        title={props.feedData.title}
        address={props.feedData.address}
        description={props.feedData.description} 
    />
    </Fragment>
  )
}

export default FeedDetail;

export async function getStaticPaths(context){

  const conection = await MongoClient.connect('mongodb+srv://hitesh123:hitesh123@cluster0.udlyqcz.mongodb.net/feeds?retryWrites=true&w=majority');
  const db = conection.db();
  const feedCollection = db.collection('feeds');
  
  let feeds = await feedCollection.find({}, {  _id: 1 }).toArray();
  
  conection.close();

  return {
    fallback: 'blocking',
    paths: feeds.map(feed => ({ params: { feedId: feed._id.toString() } }))
  }
}

export async function getStaticProps(context){
  // fetch data
  const id = context.params.feedId.toString();
  
  const conection = await MongoClient.connect('mongodb+srv://hitesh123:hitesh123@cluster0.udlyqcz.mongodb.net/feeds?retryWrites=true&w=majority');
  const db = conection.db();
  const feedCollection = db.collection('feeds');
  
  let singleFeed = await feedCollection.findOne({"_id": new ObjectId(id)});
  
  conection.close();
  
  return {
      props : {
          feedData: {
            id: singleFeed._id.toString(),
            image: singleFeed.image,
            title: singleFeed.title,
            address: singleFeed.address,
            description: singleFeed.description
          },
          meta: {
            name: "description",
            content: `Detail of the feed with ID ${singleFeed._id}`
          }
      },
      revalidate: 1 // In seconds
  };
}