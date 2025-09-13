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

const tl = new ScrollTimeline({
  source: projectList,
});

function moveRight() {
    projectList.scroll({left: -100});
}

const arrowRight = document.querySelector('span.arrow-right');
arrowRight.append('after');
arrowRight.addEventListener('pointerdown', moveRight());



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
/*         //Populate element data 
        //const Name = `${projects[k].project_name}`;
        //const LongDesc = `${projects[k].long_description}`;
        //const url = `${projects[k].url}`;
        let projectName = Name;
        let longDesc = LongDesc;
        let bgUrl = url;
 */        projectSpotlight.style.backgroundImage = `url(${projects[k].spotlight_image ?? '../images/spotlight_placeholder_bg.webp'})`;
        let spotlightName = document.createElement('h3');
        spotlightName.textContent = `${projects[k].project_name ?? 'Name - TBD'}`;
        let spotlightDesc = document.createElement('p');
        spotlightDesc.textContent = `${projects[k].long_description ?? 'Description - TBD'}`;
        let spotlightUrl = document.createElement('a');
        spotlightUrl.textContent = `${projects[k].url ?? 'Link - TBD'}`;

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


