import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  query LoginUser($username: String!, $password: String!) {
    loginUser(credintialInput: { username: $username, password: $password }) {
      _id
      insurancePlan
      name
      lastName
      username
      token
      userRole {
        name
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $ID: String,
    $name: String,
    $insurancePlan: Int,
    $lastName: String
  ) {
    editUser(userInput: {ID: $ID, name: $name, lastName: $lastName, insurancePlan: $insurancePlan}){
      _id,
      name,
      insurancePlan,
      lastName,
      username
    }
  }
`;

export const USER_REGISTER = gql`
  mutation createUser(
    $name: String,
    $lastName: String,
    $username: String
    $password: String
    $userRole: String
  ) {
    createUser(
      userInput: {
        name: $name
        lastName: $lastName
        username: $username
        password: $password
        userRole: $userRole
      }
    ) {
      _id
      name
      insurancePlan
      lastName
      username
      token
      userRole {
        _id
        name
        description
      }
    }
  }
`;
