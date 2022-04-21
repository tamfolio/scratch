export const login = `
mutation ($phoneNumberOrEmail: String!,$password: String!) {
  login(input:{phoneNumberOrEmail:$phoneNumberOrEmail, password:$password}) {
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


export const getAccessToken = `
query {
  generateAccessToken
}
`;


export const validateRegisterFormOne = `
mutation ($email: String!,  $firstName: String!,
$lastName: String!, $mobileNumber: String!) {
  validateRegistrationFormOne(input: {email:$email, firstName:$firstName,
      lastName:$lastName,mobileNumber:$mobileNumber})
}
`;

export const validateRegisterFormTwo = `
mutation ($username: String!, $dateOfBirth: DateTime!, $gender: GENDER!,
  $country: String!, $state: String!, $password: String!) {
  validateRegistrationFormTwo(input: {username:$username, 
    dateOfBirth:$dateOfBirth, gender:$gender,country:$country,state:$state, password:$password})
}
`;

export const register = `
mutation ($email: String!, $username: String!, $firstName: String!,
  $lastName: String!, $dateOfBirth: DateTime!, $gender: GENDER!,
  $mobileNumber: String!,$country: String!, $state: String!, $password: String!) {
  register(input: {email:$email,username:$username,firstName:$firstName,
    lastName:$lastName,dateOfBirth:$dateOfBirth, gender:$gender, 
  mobileNumber:$mobileNumber,country:$country, state:$state, password:$password}) {
    id
    confirmed
    createdAt
  }
}
`;

export const forgotPassword = `
mutation ($phoneNumberOrEmail: String!) {
  forgotPassword(phoneNumberOrEmail: $phoneNumberOrEmail) 
 }
`;

export const forgotPasswordOtp = `
mutation ($otp: String!,$phoneNumberOrEmail: String!) {
  forgotPasswordOtp(otp: $otp,phoneNumberOrEmail: $phoneNumberOrEmail)
}
`;

export const newPassword = `
mutation ($otp: String!,$phoneNumberOrEmail: String!,$password: String!) {
  forgotPasswordOtp(otp: $otp,phoneNumberOrEmail: $phoneNumberOrEmail,password: $password)
}
`;

export const otp = `
mutation ($otp: String!, $phoneNumberOrEmail: String!) {
  confirmAccount(otp: $otp, phoneNumberOrEmail: $phoneNumberOrEmail)
}
`;

export const registerRequestNewOtp = `
mutation ($phoneNumberOrEmail:String!) {
  requestNewOtp(phoneNumberOrEmail:$phoneNumberOrEmail)
}
`;