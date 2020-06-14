const word = document.querySelector('.word'); 
const wrongLettersEl = document.querySelector('.wrong-letter');
const playAgain = document.querySelector('.play-button');
const finalMessage = document.querySelector('.finalMessage')
const notification = document.querySelector('.notification-container');
const popup = document.querySelector('.popup-container');

const figureParts = document.querySelectorAll('.figure-part');

const words= ['application', 'something','love','interface','colour','wizard','javascript','master'];

var selectedWord= words[Math.floor(Math.random() * words.length)];

const correctLetters =[];
const wrongLetters = [];
 
function displayWord(){ 
    word.innerHTML =`
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
            ${correctLetters.includes(letter)? letter :''}
        </span>
        `)
        .join('')}
 `;
 const innerWord= word.innerText.replace(/\n/g, '');
 if(innerWord === selectedWord){
     finalMessage.innerText = "Congratulations! You have won";
     popup.style.display = "flex";
 }
}
function showNotification(){
  notification.classList.add('show');
  setTimeout(()=> {
    notification.classList.remove('show');
  },3000);
}

function updateWrongLetter(){
   wrongLettersEl.innerHTML = `
    ${wrongLetters.length >0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
   `;
   figureParts.forEach((part,index) =>{
     const error = wrongLetters.length;
     if(index<error){
         part.style.display='block';
     }else{
         part.style.display='none';
     }
     if(wrongLetters.length === figureParts.length){
         finalMessage.innerText = 'Unfortunately, You lost';
         popup.style.display= 'flex';
     }
   });
}


window.addEventListener('keydown',e=>{
   if(e.keyCode>= 65 && e.keyCode<= 90){
       const letter = e.key;
    if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter);
            displayWord();
        }else{
            showNotification();
        }
    }else{
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);
            updateWrongLetter();
        }
        else{
            showNotification();
        }
    }
    }
});

playAgain.addEventListener('click', e=>{
     correctLetters.splice(0);
     wrongLetters.splice(0);

     selectedWord= words[Math.floor(Math.random() * words.length)];
     displayWord();
     updateWrongLetter();
     popup.style.display='none';
});

displayWord();