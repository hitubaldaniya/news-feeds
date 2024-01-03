import Head from 'next/head';
import FeedList from "@/components/feeds/FeedList";
import { Fragment } from 'react';
import { MongoClient } from "mongodb";

function HomePage(props){
    return (
        <Fragment>
            <Head>
                <title>Feeds</title>
                <meta 
                    name={props.meta.name}
                    content={props.meta.content}
                />
            </Head>
            <FeedList feeds={props.feeds} />
        </Fragment>
    )
}

export async function getStaticProps(){

    const conection = await MongoClient.connect('mongodb+srv://hitesh123:hitesh123@cluster0.udlyqcz.mongodb.net/feeds?retryWrites=true&w=majority');
    const db = conection.db();
    const feedCollection = db.collection('feeds');
    
    let feeds = await feedCollection.find().toArray();
    
    conection.close();

    return {
        props : {
            feeds: feeds.map(feed => ({
                title: feed.title,
                address: feed.address,
                image: feed.image,
                id: feed._id.toString()
            })),
            meta:{
                name: 'description',
                content: 'The worldwide news feed'
            }
        },
        revalidate: 1 // In seconds,
    };
}

export default HomePage;