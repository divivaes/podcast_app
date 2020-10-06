import {gql} from 'apollo-boost';

const feedQuery = gql`
  query FeedQuery($feedUrl: String!) {
    feed(feedUrl: $feedUrl) {
      description
      duration
      image
      linkUrl
      title
      text
      pubDate
      summary
    }
  }
`;

export default feedQuery;
