import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
query Categories {
    kategorie {
    data {
        id
        attributes {
        Nazov,
        slug,
        localizations {
            data {
            attributes {
                Nazov
            }
            }
        }
        }
    }
    }
}  
`;

export default CATEGORIES_QUERY;