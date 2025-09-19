//*****************BODY ELEMENT MODIFICATIONS**************

//add class to body element
const bodyClass = document.querySelector('body');
bodyClass.classList.add('body');


//*****************HEADER ELEMENT MODIFICATIONS**************

//add class to header element populate header
const headerElement = document.querySelector('header');
headerElement.classList.add('header');
headerElement.firstElementChild.textContent = 'Tupelo Mississippi Flash';

//add class to navigation menu element
const headerNav = document.querySelector('nav');
headerNav.classList.add('nav');


//*****************MAIN ELEMENT MODIFICATIONS**************

//add class to main element
const mainElement = document.querySelector('main');
mainElement.classList.add('main');


//****Populate ABOUTME Container****

//Define constants
const elementAboutMe = document.querySelector('div#aboutMe');
const pathAboutMe = "data/aboutMeData.json";

//Fetch data and populate About Me information
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
        aboutParagraph.textContent = '\"Son my name is Beauregard Rippy. I come to you from Tupelo Mississippi.\
        I write songs that\'ll sing like a bird, I play licks on my guitar like you ain\'t never heard.\
        But I\'m down on my luck and things are just a little slack. I gotta quarter in my pocket and a shirt on my back.\
        But you buy me some supper and give me a place I can sleep.  I\'ll sing you some songs that\'ll rock your head to sleep.\
        I got talent boy. Said back home they call me the Tupelo Mississippi Flash\"\
        \n ©1968, Jerry Reed "Tupelo Mississippi Flash"';
        
        //create and populate portrait 
        const imgDiv = document.createElement('div');
        const aboutImage = document.createElement('img');
        aboutImage.src = about.headshot;
        aboutImage.alt = "Headshot of me";

        //append new element to aboutMe Section
        elementAboutMe.append(aboutParagraph);
        imgDiv.append(aboutImage);
        elementAboutMe.append(imgDiv);

        //Report errors
    }   catch(error) {
        console.error(error.message);
    }
}
//Execute About ME changes
getAboutMe();

//******PROJECT ELEMENT MONDIFICATIONS***********************

//Define constants
const projectList = document.querySelector('sidebar#projectList');
const pathProjectData = "data/projectsData.json";
const projectFragment = document.createDocumentFragment();

//Fetch JSON data and build elements for each project Card
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
    
            //Insert data into new element and  new elements into project fragmant
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
    //Splice document fragment into Projects section 
    projectList.append(projectFragment);
}
//Execute Projects element modifications
getProjectData();


//****** SCROLLBAR FUNCTIONALITY FOR PROJECTS SIDEBAR***********

//Scroll right/left event handlers - move one project box at a time
handleRightArrow = async(event) => {
    const scrollNavArrow = event.target.parentElement;
    const scrollProjectList = scrollNavArrow.previousElementSibling;
    scrollProjectList.scrollBy({top: 200, left: 200, behavior: 'auto' });
}
handleLeftArrow = async(event) => {
    const scrollNavArrow = event.target.parentElement;
    const scrollProjectList = scrollNavArrow.previousElementSibling;
    scrollProjectList.scrollBy({top: -200, left: -200, behavior: 'auto' });
}

//NAV Arrow event listeners to execure scrolling
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

//Execute scrolling event listeners 
rightScrollListener();
leftScrollListener();

//***********PROJECT SPOTLIGHT ELEMENT MODIFICATIONS******* 

//Define constants
const projectSpotlight = document.querySelector('div#projectSpotlight');
const spotlightTitles = document.querySelector('div#spotlightTitles');
const spotlightFragment = document.createDocumentFragment();

//Fetch JSON data and build elements for selected project Spotlight
//Default Project is ID = project_personal
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
        projectSpotlight.style.backgroundImage = 
            `url(${projects[k].spotlight_image ?? '../images/spotlight_placeholder_bg.webp'})`;
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

    //Clear and append fragment to chenge Spotlight Titles   
    spotlightTitles.replaceChildren();
    spotlightTitles.append(spotlightFragment);
}

//Execute populate Spotlight title - using default project_id
getSpotlightData();

//Event listener for spotlight project changes
const projectListener = async() => {
    const projectContainer = document.querySelector('sidebar#projectList')
    projectContainer.addEventListener('pointerdown', handleClick)
}

//Determines project clicked and executes getSpotlightData to change spotlighted project
const handleClick = async(event) => {
    const projectCard = event.target.closest('.projectCard');
    const selectedCard = projectCard.id;
    getSpotlightData(selectedCard);
}

//Execute event handler
projectListener();

//*****************CONTACT CONTAINER MODIFICATIONS********

//Define constants
const messageText = document.querySelector('textarea');
const counter = document.querySelector('div#charactersLeft');
const maxLength = 300;
const form = document.querySelector("#formSection");
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const MESSAGE_REQUIRED = "Please type your message";
const MESSAGE_INVALID = "Please limit text to: upper and lowercase letters, numbers and '@', '.', '_', '-' . ";
const MESSAGE_EXCEEDED_LENGTH = "Message is too long - maximum length 300 characters";
let withinMsgLength = true;


//Takes inpt from showError() and showSucess()
//Determines UI location, inserts messages into UI page
function showMessage(input, message, type) {
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

//Functions showError() and showSuccess():
//Input from hasValue(), validateEmail() or validateMessage()
//Output used by showMessage()
function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

//Functions hasValue(), validateEmail() and validateMessage():
//validates content and format 
//Passing results to showError() or showSuccess()
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
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate message format
	const messageRegex = /[^a-zA-Z0-9@._-\s]/;

	const message = input.value.trim();
    console.log(messageRegex.test(message))
	if (messageRegex.test(message)) {
		return showError(input, invalidMsg);
    }
    
    if (!msgLengthOk) {
        return showError(input, exceedLengthMsg);
    }
	return true;
}

//Event listener that monitors and updates message size real-time
//Message length valid T/F used by validateMessage()
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

//Event listener to validate the content of the entries in the 'Contact Me' form
form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	//Validate entries in the form
	let emailValid = validateEmail(form.elements["contactEmail"], EMAIL_REQUIRED, EMAIL_INVALID);
	let messageValid = validateMessage(form.elements["contactMessage"], MESSAGE_REQUIRED, MESSAGE_INVALID, MESSAGE_EXCEEDED_LENGTH, withinMsgLength);

	//if both are valid, submit the form.
	if (emailValid && messageValid) {
		alert("Demo only. No form was posted.");
	}
});

 
