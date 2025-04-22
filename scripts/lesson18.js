/*
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();
*/

/*
fetch(
  'https://supersimplebackend.dev/greeting'
).then((response) => {
  return response.text();
}).then((text) => {
  console.log(text);
});
*/

/*
async function getGreet() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const text = await response.text();
  console.log(text);
}
getGreet();
*/

/*
async function postGreet() {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify ({
      name : 'KallepallyUma'
    })
  }); 
  
  const text = await response.text();
  console.log(text);
}
postGreet();
*/

/*
async function getAmazon() {
  try{
    const response = await fetch('https://amazon.com');
    const text = await response.text();
    console.log(text);
  }catch(error)
  {
    console.log("CORS error. Your request was blocked by the backend");
  } 
}

getAmazon();
*/

async function postGreet() {
  try{
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      }
    });

    if(response.status >= 400){
      throw response;
    }
    const text = await response.text();
    console.log(text);
  }
  catch(error) {
    if(error.status === 400) {
      const err = await error.json();
      console.log(err);
    } else {
      console.log('Network error. Please try again later.');
    }
  }
  
}
postGreet();