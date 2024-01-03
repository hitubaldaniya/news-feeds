import Head from 'next/head';
import FeedList from "@/components/feeds/FeedList";
import { getFeeds } from './helper/helper';
import { Fragment } from 'react';

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

    const feeds = (await getFeeds()).data;
    // console.log(`FEEDS, ${JSON.stringify(feeds)}`)
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