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
const pathAboutMe = "data/aboutMeData.json";
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

//PROJECTS section

//Setup to create and insert document fragment
const projectList = document.querySelector('sidebar#projectList');
const pathProjectData = "data/projectsData.json";
const projectFragment = document.createDocumentFragment();

//get JSON data and build elements for each project Card
const getProjectData = async() => {
    try {
        const response = await fetch(pathProjectData);

        //Check for errors in data fetch
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        //Parse JSON into objects
        const result = await response.json();        
        const projects = {...result};

        //loop through objects created from JSON to create new element and insert content 
        for (const project in projects) {
            //gathe data from JSON
            let id = `${projects[project].project_id ?? 'Id - TBD'}`;
            let shortDesc = `${projects[project].short_description ?? 'Description - TBD'}`;
            let projectId = document.createElement('div');
            let projectName = `${projects[project].project_name ?? 'Name - TBD'}`;
            projectId.style.backgroundImage = `url(${projects[project].card_image ?? '../images/card_placeholder_bg.webp'})`;
    
            //Insert data into new element and project fragmant
            projectId.classList.add('projectCard');
            projectId.id = id;
            let name = document.createElement('h4');
            name.textContent = projectName;
            projectId.append(name);
            let desc = document.createElement('p');
            desc.textContent = shortDesc;
            projectId.append(desc);
            projectFragment.append(projectId);
        }
        //Report errors
    }   catch(error) {
        console.error(error.message);    
    }
    //Splice dococument fragment in to Projects section 
    projectList.append(projectFragment);
}
getProjectData();


//****** Figure out Scroll bar functionality***********
//scroll Sidebar
//console.log(projectList);

function handleRightArrow(event) {
    
    
}

//const arrowRight = document.querySelector('span.arrow-right');
//arrowRight.addEventListener('click', handleRightArrow);

handleRightArrow = async(event) => {
    const scrollNavArrow = event.target.parentElement;
    const scrollProjectList = scrollNavArrow.previousElementSibling;
    console.log(scrollProjectList);
    scrollProjectList.scrollBy({top: 200, left: 200, behavior: 'auto' });
}
handleLeftArrow = async(event) => {
    const scrollNavArrow = event.target.parentElement;
    const scrollProjectList = scrollNavArrow.previousElementSibling;
    console.log(scrollProjectList);
    scrollProjectList.scrollBy({top: -200, left: -200, behavior: 'auto' });
}


const rightScrollListener = async() => {
    //const cardContainer = document.querySelector('.product-grid')
    const arrowRight = document.querySelector('span.arrow-right');
    arrowRight.addEventListener('pointerdown', handleRightArrow, {once: false});
}

const leftScrollListener = async() => {
    //const cardContainer = document.querySelector('.product-grid')
    const arrowLeft = document.querySelector('span.arrow-left');
    arrowLeft.addEventListener('pointerdown', handleLeftArrow, {once: false});
}

rightScrollListener();
leftScrollListener();






//Populate SpotlightTiltes
const projectSpotlight = document.querySelector('div#projectSpotlight');
const spotlightTitles = document.querySelector('div#spotlightTitles');
const spotlightFragment = document.createDocumentFragment();

//get JSON data and build elements for selected project Spotlight
const getSpotlightData = async(i = 'project_personal') => {
    try {
        const response = await fetch(pathProjectData);

        //Check for errors in data fetch
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        //Parse JSON into objects
        const result = await response.json();        
        const projects = {...result};

        // Determine which project to extract from JSON
        for (const [key, value] of Object.entries(projects)) {
            if (i === `${projects[key].project_id}`) {
                k = key;
            }
        }
        //Populate element data 
        projectSpotlight.style.backgroundImage = `url(${projects[k].spotlight_image ?? '../images/spotlight_placeholder_bg.webp'})`;
        let spotlightName = document.createElement('h3');
        spotlightName.textContent = `${projects[k].project_name ?? 'Name - TBD'}`;
        let spotlightDesc = document.createElement('p');
        spotlightDesc.textContent = `${projects[k].long_description ?? 'Description - TBD'}`;
        let spotlightUrl = document.createElement('a');
        let url = `${projects[k].url}`;
        spotlightUrl.setAttribute('href', `${projects[k].url ?? '#contactContainer'}`);
        spotlightUrl.textContent = 'Click here to see more...';
        
        spotlightFragment.append(spotlightName);
        spotlightFragment.append(spotlightDesc)
        spotlightFragment.append(spotlightUrl);

        //Report errors
    }   catch(error) {
        console.error(error.message);    
    }

    //Clear and append fragment to Spotlight Titles   
    spotlightTitles.replaceChildren();
    spotlightTitles.append(spotlightFragment);
}
//Execute populate Potlight title
getSpotlightData();


//Event listener for spotlight project
const projectListener = async() => {
    const projectContainer = document.querySelector('sidebar#projectList')
    projectContainer.addEventListener('pointerdown', handleClick)
}

//Determines project clicked and executes getSpotlightData using that ID
const handleClick = async(event) => {
    const projectCard = event.target.closest('.projectCard');
    const selectedCard = projectCard.id;
    getSpotlightData(selectedCard);
}

//Execute event handler
projectListener();


//CONTACT CONTAiNER


// show a message with a type of the input
function showMessage(input, message, type) {
    //console.log(input, message, type);
	// get the small element and set the message
    let msg = ''
    if (input.id === 'contactEmail') {
        msg = document.querySelector('div#emailError');
    } else if (input.id === 'contactMessage') {
        msg = document.querySelector('div#messageError');
    } else {
        msg = '';
    }   
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

function validateMessage(input, requiredMsg, invalidMsg, exceedLengthMsg, msgLengthOk) {
    //console.log(input, requiredMsg, invalidMsg, exceedLengthMsg, msgLengthOk);
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate message format
	const messageRegex =
		/[a-zA-Z0-9@._-]/;

	const message = input.value.trim();
    console.log(message);
	if (!messageRegex.test(message)) {
		return showError(input, invalidMsg);
    }
    
    if (!msgLengthOk) {
        return showError(input, exceedLengthMsg);
    }
	return true;
}



const messageText = document.querySelector('textarea');
const counter = document.querySelector('div#charactersLeft');
const maxLength = 300;
let withinMsgLength = true;

//console.log(messageText, counter, maxLength );

messageText.addEventListener('input', () => {
    let length = messageText.value.length;
    counter.textContent = `Characters: ${length} / ${maxLength}`;
    if (length > maxLength) {
        withinMsgLength = false;
    } else {
        withinMsgLength = true;
    }
    return withinMsgLength;
})


const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const MESSAGE_REQUIRED = "Please type your message";
const MESSAGE_INVALID = "Please limit text to: upper and lowercase letters, numbers and '@', '.', '_', '-' . ";
const MESSAGE_EXCEEDED_LENGTH = "Message is too long - maximum length 300 characters";

const form = document.querySelector("#formSection");
form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
	let emailValid = validateEmail(form.elements["contactEmail"], EMAIL_REQUIRED, EMAIL_INVALID);
    //console.log(emailValid);
	let messageValid = validateMessage(form.elements["contactMessage"], MESSAGE_REQUIRED, MESSAGE_INVALID, MESSAGE_EXCEEDED_LENGTH, withinMsgLength);
    //console.log(messageValid);
	// if valid, submit the form.
	if (emailValid && messageValid) {
		alert("Demo only. No form was posted.");
	}
});

 
