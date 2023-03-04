// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


/* 1. Getting User Requirements for the Password
=================================================*/

//An object to store users password preferences

var passwordFlags = {
  length: 0,
  lowercase: false, 
  uppercase: false,
  numeric: false,
  special: false,
};

// Array to store final generated password
var password = []; 

// This is to store  all the type of arrays that correspond to the user's preferences. 
var userSelectPassArray = []; 

// Utility function to pull randon element from one array and push into second array

function getRandomIndexAndAddToArray(arrayOne, arrayTwo) {
  var randomIndex = Math.floor(Math.random() * arrayOne.length);

  arrayTwo.push(arrayOne[randomIndex]);
}

// Add User selected  typed array to userSelectPassArray:

function incrementalArrayMerge(array) {
  userSelectPassArray = userSelectPassArray.concat(array);
}

// Function for Shuffling the Password Array:

function arrayShuffle(array) {
  array.sort(() => 0.5 - Math.random());
  return array;
}


// Function to prompt and get password options from User

function selectPasswordFlags() {
  //This variable stores the validity of the user's response as a boolean
  var validNumberEntry = false; 
  while (validNumberEntry === false) {
    var userNumberInput = prompt(
      "Numbers of password characters would you like?\n Enter a number between 10 and 64",
      "Number between 10 and 64"
    );

    if (userNumberInput === null) {
      location.reload(); 
      return; 
    } else if (
      Number.isNaN(Number(userNumberInput)) ||
      userNumberInput < 10 ||
      userNumberInput > 64
    ) {

      alert(
        "ERROR - Invalid input. You must enter a *** Number between 10 and 64 ****"
      );
    } else {

      validNumberEntry = true;

      passwordFlags.length = userNumberInput; 
    }
  }


  // This variable stores the accumlated validity of the user's character preferences
  var validCharacterOptions = false; 

  while (validCharacterOptions === false) {
    
    var lowercaseOption = confirm(
      "Please confirm if you would like to add * lowercase characters * in your password.\n OK - Yes, Cancel - No"
    );

    var uppercaseOption = confirm(
      "Please confirm if you would like to add * uppercase characters * in your password.\n OK - Yes, Cancel - No"
    );

    var numericOption = confirm(
      "Please confirm if you would like to add * numeric characters * in your password.\n OK - Yes, Cancel - No"
    );

    var specialCharacterOption = confirm(
      "Please confirm if you would like to add * special characters * in your password.\n OK - Yes, Cancel - No"
    );

    // In case users didn't select an option, user will be re prompted to select

    if (
      lowercaseOption === false &&
      uppercaseOption === false &&
      numericOption === false &&
      specialCharacterOption === false
    ) {
      alert(
        "ERROR - Invalid options. You must SELECT * at least ONE * character type from the following:\n - Lowercase\n - Uppercase\n - Numeric\n - Special Characters "
      );
    } else {
      validCharacterOptions = true; 

      passwordFlags.lowercase = lowercaseOption;
      passwordFlags.uppercase = uppercaseOption;
      passwordFlags.numeric = numericOption;
      passwordFlags.special = specialCharacterOption;

      password = []; 
      userSelectPassArray = []; 
    }
  }

  // Generating the Random Password
  if (passwordFlags.lowercase === true) {
    getRandomIndexAndAddToArray(lowerCasedCharacters, password);
    incrementalArrayMerge(lowerCasedCharacters);
  }

  if (passwordFlags.uppercase === true) {
    getRandomIndexAndAddToArray(upperCasedCharacters, password);
    incrementalArrayMerge(upperCasedCharacters);
  }

  if (passwordFlags.numeric === true) {
    getRandomIndexAndAddToArray(numericCharacters, password);
    incrementalArrayMerge(numericCharacters);
  }

  if (passwordFlags.special === true) {
    getRandomIndexAndAddToArray(specialCharacters, password);
    incrementalArrayMerge(specialCharacters);
  }

// This loop above will keep adding random characters to password Array until its length matches the user length requirement

  do {
    getRandomIndexAndAddToArray(userSelectPassArray, password);
  } while (password.length < passwordFlags.length);

  
  arrayShuffle(password);

  alert(
    'Your password has now been generated!'
  );
}

// Function to generate password with user input

function generatePassword() {
  selectPasswordFlags();
  // Turn the array elements into a string of characters
  return password.join(""); 
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword); // Calls the writePassword function when clicked