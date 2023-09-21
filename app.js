const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.querySelector('.result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
const inpWord = document.getElementById('inp-word');

const getWord = () => {
  const word = inpWord.value.trim();
  if (!word) return;
  fetch(`${url} ${word}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //   wordPlaceholder.textContent = word;
      const detail = () => {
        if (data[0].meanings.partOfSpeech > 0)
          return data[0].meanings[0].partOfSpeech;
        else return data[0].meanings[1].partOfSpeech;
      };
      // const phonetic = () => {
      //   if (data[0].phonetic > 0) return data[0].phonetic;
      //   else return data[0].phonetics[1];
      // };
      result.innerHTML = `
        <div class="word">
          <h3>${word}</h3>
          <button onclick='playSound()'><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
          <p>${detail()}</p>
          <p>${data[0].phonetic}</p>
        </div>
          <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ''}
          
          </p>`;
      sound.setAttribute('src', `https:${data[0].phonetics[1].audio}`);
      console.log(sound);
    })
    .catch(() => {
      result.innerHTML = `<h3>Couldn't find the word you typed!</h3>`;
    });
};
function playSound() {
  sound.play();
}
btn.addEventListener('click', getWord);
