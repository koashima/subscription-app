import React from 'react';
import { useQuery } from 'urql';
const COMMENTS_QUERY = `query CommentsListQuery(
  $repoOwner: String!
  $repoName: String!
  $issueNumber: Int!
) {
  gitHub {
    repository(name: $repoName, owner: $repoOwner) {
      issue(number: $issueNumber) {
        id
        title
        bodyText
        comments(last: 100) {
          nodes {
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
  }
}
`;

function Comments() {
  const [result] = useQuery({
    query: COMMENTS_QUERY,
    variables: {
      repoOwner: 'koashima',
      repoName: 'subscription-app',
      issueNumber: 1,
    },
  });

  if (!result.data) {
    return 'loading...';
  }
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // overflowY: 'scroll',
        maxHeight: 560,
        width: 400,
        margin: 0,
      }}
    >
      {result.data.gitHub.repository.issue.comments.nodes.map((commentNode) => {
        return (
          <li
            key={commentNode.id}
            style={{
              listStyle: 'none',
              padding: '10px 20px',
              background: commentNode.viewerDidAuthor ? '#0B55DB' : '#F5F5F5',
              marginBottom: 6,
              borderRadius: 40,
              width: '60%',
              alignSelf: commentNode.viewerDidAuthor
                ? 'flex-end'
                : 'flex-start',
            }}
          >
            {!commentNode.viewerDidAuthor && (
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  textAlign: 'justify',
                  marginLeft: 25,
                  marginBottom: 5,
                  color: '#66666A',
                }}
              >
                {commentNode.author.login}
              </h3>
            )}
            <p
              style={{
                background: commentNode.viewerDidAuthor ? '#0B55DB' : '#F5F5F5',
                borderRadius: 40,
                margin: 0,
                padding: '10px, 20px',
              }}
            >
              {commentNode.body}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
