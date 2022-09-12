import gql from 'graphql-tag';

const PROJECTS_QUERY = gql`
    query Project($id: ID!) {
      projekty(filters: { kategoria: { id: { eq: $id } } }) {
        data {
          id
          attributes {
            Nazov
            slug
            Status
            Datum
            Foto {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
`;

export default PROJECTS_QUERY;