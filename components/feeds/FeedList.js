import FeedItem from './FeedItem';
import classes from './FeedList.module.css';

function FeedList(props) {
  return (
    <ul className={classes.list}>
      {props.feeds.map((feed) => (
        <FeedItem
          key={feed.id}
          id={feed.id}
          image={feed.image}
          title={feed.title}
          address={feed.address}
        />
      ))}
    </ul>
  );
}

export default FeedList;