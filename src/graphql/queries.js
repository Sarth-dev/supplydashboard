import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query {
    warehouses {
      code
      name
    }
  }
`;

export const GET_KPIS = gql`
  query GetKpis($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;
