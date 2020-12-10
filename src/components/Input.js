import React from 'react';
import { useMutation } from 'urql';

const NEW_COMMENT_MUTATION = `
mutation NewCommentMutation($body: String!, $subjectId: String!) {
  gitHub {
    addComment(
      input: { body: $body, subjectId: $subjectId }
    ) {
      clientMutationId
      commentEdge {
        node {
          author {
            login
          }
          body
          id
          viewerDidAuthor
        }
      }
    }
  }
}
`;


function NewCommentInput() {
  const [mutationResult, executeMutation] = useMutation(NEW_COMMENT_MUTATION);
  const handleSubmit = (body) => {
    executeMutation({ subjectId: 'MDU6SXNzdWU3NTk5MTM1Nzk=', body: body });
  };

  console.log({ mutationResult });

  return <Input onSubmit={handleSubmit} />;
}

function Input ({ onSubmit }) {
  const [value, setValue] = React.useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}
    >
      <input value={value} onChange={handleValueChange} />
      <button type="submit">submit</button>
    </form>
  );
};



export default NewCommentInput;
