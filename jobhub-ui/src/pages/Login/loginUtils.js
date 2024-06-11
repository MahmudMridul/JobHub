export function validPassword(password) {
   if (password.length < 8) {
      return false;
   }
   const lowerCase = /[a-z]/.test(password);
   const upperCase = /[A-Z]/.test(password);
   const numbers = /[0-9]/.test(password);
   return lowerCase && upperCase && numbers;
}

export function validEmail(email) {
   // ^ asserts the position at the start of the string
   // [a-zA-Z0-9._%+-] matches alphnumeric chars and . _ % + -
   // @ makes sure that there is @ present 
   // [a-zA-Z0-9.-] matches alphanumeric and . -
   // \. matches . 
   // [a-zA-Z]{2,} matches at least 2 alphabetic chars
   // $ asserts the postion at the end of the string
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   return emailPattern.test(email);
}