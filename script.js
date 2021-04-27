// https://v2.jokeapi.dev/joke/Programming        <-- Joke api url
// 65580fe1178e4924b91f0c6d43244377               <-- text to speech voice rss api key
// two types joke -->   setup & delivery
// one type joke  -->   joke

// VoiceRSS.speech({
//   key: "<API key>",
//   src: "Hello, world!",
//   hl: "en-us",
//   v: "Linda",
//   r: 0,
//   c: "mp3",
//   f: "44khz_16bit_stereo",
//   ssm: false,
// });

const button = document.getElementById("button");
const audio = document.getElementById("audio");

const toggleButton = () => {
  button.disabled = !button.disabled;
  console.log(button.disabled);
};

const voiceSpeech = (jokeString) => {
  VoiceRSS.speech({
    key: "65580fe1178e4924b91f0c6d43244377",
    src: jokeString,
    hl: "en-in",
    v: "Ajit",
    r: 1,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssm: false,
  });
};

const jokeUrl = "https://v2.jokeapi.dev/joke/Programming";

const getJoke = async () => {
  const res = await fetch(jokeUrl);
  const joke = await res.json();
  if (joke.type === "single") {
    jokeData = joke.joke;
    tellSingleJoke(jokeData);
  } else {
    tellDoubleJoke(joke);
  }
  toggleButton();
  console.log(joke);
};

const tellSingleJoke = (joke) => {
  console.log(joke);
  const jokeString = joke.trim(joke.replace(/ /g, ""));
  voiceSpeech(jokeString);
  toggleButton();
};

const tellDoubleJoke = ({ setup, delivery }) => {
  voiceSpeech(setup);
  if (setup.length < 50) {
    setTimeout(() => {
      voiceSpeech(delivery);
      toggleButton();
    }, 3000);
  } else {
    setTimeout(() => {
      voiceSpeech(delivery);
      toggleButton();
    }, 5500);
  }

  console.log(setup.length);
};

const fuckYou = () => {
  console.log("fuck you");
};

button.addEventListener("click", getJoke);
