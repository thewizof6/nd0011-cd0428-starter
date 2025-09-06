const bodyClass = document.querySelector('body');
bodyClass.classList.add('body');
const headerElement = document.querySelector('header');
headerElement.classList.add('header');
headerElement.firstElementChild.textContent = 'Mississippi Flash';
const headerNav = document.querySelector('nav');
headerNav.classList.add('nav');
const mainElement = document.querySelector('main');
mainElement.classList.add('main');

const aboutMeFragment = document.createDocumentFragment()
const elementAboutMe = document.querySelector('div#aboutMe');




const pathAboutMe = "starter/data/aboutMeData.json";

const getAboutMe = async() => {
    try {
        const response = await fetch(pathAboutMe);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();        
        const about = {...result};
        const aboutParagraph = document.createElement('p');
        aboutParagraph.textContent = result.aboutMe;
        //console.log(about.aboutMe);
        const imgDiv = document.createElement('div');
        const aboutImage = document.createElement('img');
        aboutImage.src = about.headshot;
        aboutImage.alt = "Headshot of me";
        elementAboutMe.append(aboutParagraph);
        imgDiv.append(aboutImage);
        elementAboutMe.append(imgDiv);
        //console.log(aboutMeFragment);
  
   
    
    }   catch(error) {
        console.error(error.message);
    }

}
getAboutMe();
//elementAboutMe.append(aboutMeFragment);
//console.log(aboutMeFragment);
console.log(elementAboutMe);
/* function successCallBack(result) {
    console.log(`Success! \n ${result}`);
}
function errorCallback(error) {
    console.log(`Error: ${error}`);
}
 */
/* const dataAboutMe = getData(pathAboutMe).then(successCallBack, errorCallback);
console.log(dataAboutMe);
 */

/* 
const elementAboutMe = document.querySelector('#aboutMe');
const aboutParagraph = document.createElement('p');
const aboutDiv = document.createElement('div');
aboutDiv.classList.add('#headshotContainer');

aboutImage.src = dataAboutMe.headShot;
aboutImage.alt = "Headshot of me";
aboutDiv.append(aboutImage);
elementAboutMe.append(aboutParagraph);

 */




//console.log(aboutMeFragment);



