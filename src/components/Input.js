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

function Input({ onSubmit }) {
  const [value, setValue] = React.useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      style={{ position: 'sticky', bottom: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}
    >
      <input
        value={value}
        onChange={handleValueChange}
        style={{
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          border: '1px solid #A9A9A9',
          borderRadius: 20,
          padding: '5px 15px',
          background: '#2E2E2E',
          color: 'whitesmoke',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          right: '-30px',
          top: '2px',
          borderRadius: 100,
          background: '#0B55DB',
          color:'white',
          border: 'none',
          padding: 3,
          width: 23, 
          fontWeight: 900,
          fontSize: 16,

        }}
      >
        submit
      </button>
    </form>
  );
}

export default NewCommentInput;
