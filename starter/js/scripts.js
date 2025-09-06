//HEADER updates

//add class to body
const bodyClass = document.querySelector('body');
bodyClass.classList.add('body');

//add class to header and populate header element
const headerElement = document.querySelector('header');
headerElement.classList.add('header');
headerElement.firstElementChild.textContent = 'Mississippi Flash';

//add class to mavigatio menu
const headerNav = document.querySelector('nav');
headerNav.classList.add('nav');

//MAIN updates

//add call to main
const mainElement = document.querySelector('main');
mainElement.classList.add('main');

//Populate ABOUTME Container
const elementAboutMe = document.querySelector('div#aboutMe');
const pathAboutMe = "starter/data/aboutMeData.json";
//fetch aboutMeData.json
const getAboutMe = async() => {
    try {
        const response = await fetch(pathAboutMe);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();        
        const about = {...result};
        //create and populate aboutMe element
        const aboutParagraph = document.createElement('p');
        aboutParagraph.textContent = result.aboutMe;
        //create and populate portrait 
        const imgDiv = document.createElement('div');
        const aboutImage = document.createElement('img');
        aboutImage.src = about.headshot;
        aboutImage.alt = "Headshot of me";
        //append new element to aboutMe Section
        elementAboutMe.append(aboutParagraph);
        imgDiv.append(aboutImage);
        elementAboutMe.append(imgDiv);

    }   catch(error) {
        console.error(error.message);
    }

}
getAboutMe();



