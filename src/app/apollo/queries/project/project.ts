import gql from 'graphql-tag';

const PROJECT_BY_CATEGORY_QUERY = gql`
query Project ($id: ID!){
  projekt(id: $id) {
    data {
      id
      attributes {
        Nazov,
        slug
        Status,
        Datum,
        Foto {
          data {
            attributes {
              url
            }
          }
        },
        Situacia {
          Autor,
          Spolupraca,
          Typ,
          Miesto,
          Info,
          Obrazok {
            data {
              attributes {
                url
              }
            }
          }
          Text
        }
      }
    }
  }
}
`;

export default PROJECT_BY_CATEGORY_QUERY;