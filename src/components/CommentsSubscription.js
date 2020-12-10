import React from 'react';
import { useSubscription } from 'urql';
import Comments from './Comments';
const COMMENTS_LIST_SUBSCRIPTION = `
subscription CommentsListSubscription(
  $repoName: String = ""
  $repoOwner: String = ""
) {
  github {
    issueCommentEvent(
      input: { repoOwner: $repoOwner, repoName: $repoName }
    ) {
      action
      comment {
        author {
          login
        }
        body
        id
        url
        viewerDidAuthor
      }
    }
  }
}
`;

function CommentsSubscription() {
  const handleSubscription = (comments = [], commentEvent) => {
    return [...comments, commentEvent.github.issueCommentEvent.comment];
  };
  const [commentsSubscriptionResults] = useSubscription(
    {
      query: COMMENTS_LIST_SUBSCRIPTION,
      variables: {
        repoName: 'subscription-app',
        repoOwner: 'koashima',
      },
    },
    handleSubscription
  );
  return <Comments comments={commentsSubscriptionResults.data} />
}

export default CommentsSubscription;
