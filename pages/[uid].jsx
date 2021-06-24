const UserID = ({ id }) => (
  <>{id}</>
);

export default UserID;

export const getServerSideProps = async ({ params, req, res }) => {
  const { uid } = params;

  return {
    props: { id: `userid-${uid}` }
  }
};
