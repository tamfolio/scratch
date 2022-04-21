export const requestAccountData = `
query {
  me {
    id,
    email,
    username,
    firstName,
    lastName,
    dateOfBirth,
    role,
    gender,
    mobileNumber,
    state,
    country
  }
}
<<<<<<< HEAD
=======
`;

export const editAccount = `
mutation ($firstName: String!,$lastName: String!, $dateOfBirth: String!,
  $gender: GENDER, $state: String!,$country: String!) {
  editAccount(input:{firstName:$firstName, lastName:$lastName, dateOfBirth:$dateOfBirth,
    gender:$gender,state:$state,country:$country}) {
    id,
    email,
    username,
    firstName,
    lastName,
    dateOfBirth,
    role,
    gender,
    mobileNumber,
    state,
    country,
    wallet {
      id,
      withdrawable,
      bonus,
      currency
    }
  }
}
`;


export const editPassword = `
mutation ($password:String!) {
  resetAccountPassword(password:$password) {
    id
  }
}
>>>>>>> 418f26f927b43d6988c27d797f646d99692f3933
`;