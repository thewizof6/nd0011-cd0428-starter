const myRequest = new Request("starter/data/aboutMeData.json");
const data = '';

fetch(myRequest)
    .then((response) => response.json);

    console.log(JSON.parse(data));

        