import NewFeedForm from "@/components/feeds/NewFeedForm";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function NewFeedPage(props) {

    const router = useRouter();    

    async function addFeedHandler(enteredFeedData){

        const response = await fetch('/api/new-feeds', {
            method: 'POST',
            body: JSON.stringify(enteredFeedData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        // console.log(`enteredFeedData: ${JSON.stringify(enteredFeedData)}`);
        console.log(`responseData: ${JSON.stringify(data)}`);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add Feeds</title>
                <meta 
                    name={props.meta.name}
                    content={props.meta.content}
                />
            </Head>
            <NewFeedForm onAddFeed={addFeedHandler} />
        </Fragment>
    )
}

export async function getStaticProps(){
  
return {
      props : {
          meta: {
            name: 'description',
            content: 'Add news feed available worldwide'
          }
      },
      revalidate: 1 // In seconds
  };
}

export default NewFeedPage;
