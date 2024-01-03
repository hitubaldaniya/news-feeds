import FeedDetails from "@/components/feeds/FeedDetails";
import { getFeeds } from '../helper/helper';
import { Fragment } from "react";
import Head from 'next/head'

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

  const feeds = (await getFeeds('ids')).data;
  return {
    fallback: false,
    paths: feeds.map(feed => ({ params: { feedId: feed._id.toString() } }))
  }
}

export async function getStaticProps(context){
    // fetch data
  const id = context.params.feedId.toString();
  const singleFeed = ((await getFeeds(id)).data);
  
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