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
const fetchAboutMe = async() => {
    const responseData = await fetch("starter/data/aboutMeData.json");
    const aboutMeData = await responseData.json();
    const newElement = document.createElement('p');
    newElement.append("some Text");  
    aboutMeFragment.append(newElement);
    console.log(aboutMeFragment)
}
const elementAboutMe = document.querySelector('#aboutMe');
const aboutParagraph = document.createElement('p');
const aboutDiv = document.createElement('div');
aboutDiv.classList.add('#headshotContainer');
const aboutImage = document.createElement('img');
aboutImage.src = "starter/images/headshot.webp";
aboutImage.alt = "Headshot of me";
aboutDiv.append(aboutImage);
elementAboutMe.append(aboutParagraph);
elementAboutMe.append(aboutDiv);





//console.log(aboutMeFragment);



