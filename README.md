# README # 

## Purpose: ## 

From Udacity: “In this project, you'll create a JavaScript file that will take external data and use it to populate a web page fully.  The HTML framework is in place.  The CSS for a responsive site is also in place.  Your job will be to write JavaScript to add and manipulate the DOM and add in some additional code to do some client-side form validation.”
JavaScript and WEB APIs are used extensively in this project to create the desired interactive webpage.  As in real-world situations, the data is incomplete.  Error checking and default data are used to prevent code failure and ‘undefined’ data on the page.

## Sections of the Portfolio Page: ##

### Header ###

The Header tops the page with the name of the developer and a navigation menu directing the reader to the other sections of the page.  ‘Header and ‘nav’ classes are added to the elements, and the developer’s name is inserted.

### About Me ###

This section gives a short biography of the developer and a portrait.  The About Me data is fetched from a .json file containing the necessary details.  The biography and portrait are inserted into the container using new paragraph and image elements. 

### Projects ###

The project section includes three subsections: Sidebar, Scrolling, and Spotlight.

 - Each project is represented in the sidebar as an icon, displaying the project name, and when the mouse hovers over it, a short description.  The information and images about the project are fetched from a .json file.   As code cycles through the data file, a new project element is created and inserted into a fragment.  The fragment is inserted when all data has been collected.

 - The sidebar icons can be scrolled using the right/left (up/down) arrows.  Event listeners are used to determine the direction the sidebar is scrolled.

 - When a project icon in the sidebar is selected, a larger version – Spotlight - of it is displayed.   Using a larger picture, the project’s name, a more detailed description, and a mock link to more in-depth information.   The first project in the list is used as the default spotlighted project.  When a different project is selected, its data and image replace the previously selected projects.  An event listener is used to trigger the change and determine which project is spotlighted.
 
### Contact Me ###

The Contact Me section contains user input boxes for email and messages.  The content entered in both is checked for specific formats and characters.  When the Submit button is clicked, error messages are displayed if the conditions are violated.  Additionally, the message content is checked in real-time for the number of characters entered.  The count will turn red if the maximum is exceeded.  Event listeners are also used to trigger the content validation and corresponding errors.


