const lengthSlider = document.querySelector(".pass-length input");
options = document.querySelectorAll(".option input")
copyIcon = document.querySelector(".input-box span")
passwordInput = document.querySelector(".input-box input")
let passIndicator = document.querySelector(" .pass-indicator")
const generateBtn = document.querySelector('.generate-btn')

const characters = { // objects of letters, numbers, symbols
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*(){}[]:;.,<>+-*/~",
}

const generatePassword =() => {
    let staticPassword = "";
    let randomPassword = "";
    excludeDuplicate  = false;
    let passLength = lengthSlider.value; 

    options.forEach(option => {
        if(option.checked){
            // if check box is checked
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
            //adding particular key value form character object to staticpassword
            console.log(option);
            staticPassword += characters[option.id];
            } else if(option.id === "spaces"){ // if checkbox id is space
                staticPassword += ` ${staticPassword} `; //adding space at the beginning and end of staticPassword
            }else{ //else pass true value to ecludeDulicate
                excludeDuplicate = true;
            }
            
        }
    })
    for(let i = 0; i < passLength; i++){
        //getting random character from thestatic password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]; 
       if(excludeDuplicate){// if excludeDuplicate is true
        //if randomPassword doesn't contains the current random character or randomChar is equal
        // to space " " then add random character to randompssword else decrement i by -1
        !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
       }else{ // else add random cherator to randomPassword
        randomPassword += randomChar
       }
    }
    console.log(randomPassword)
     passwordInput.value = randomPassword // passing randomPasswd to passwordInput value
    // console.log(staticPassword)
}
// generatePassword();
const updatePassIndicator = () => {
    
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}


const updateSlider = () => {
    console.log(lengthSlider.value)
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    // generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () =>{
    navigator.clipboard.writeText(passwordInput.value);
    
    setTimeout(() =>{
        copyIcon.innerText = "check";
    },1500);
}


copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);