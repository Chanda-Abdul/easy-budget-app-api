# Thinkful Full Stack Capstone - Easy Budget App

## Programmer
Chanda Hubbard

# Full-Stack-Capstone
While enrolled in Thinkful's Web Development bootcamp I created this Capstone project 


[>Live URL<](https://easy-budget.chandacodes.vercel.app)


[Link to API](https://github.com/ChandaHubbard/easy-budget-app-api)

# Technology Used
React, Node.js, HTML, CSS, Vercel(Zeit), Heroku, VS Code








<!-- 

Documentation of your API.
Screenshot(s) of your app. This makes your app description much easier to understand.
A summary section. This should have a concise explanation of what your app does. Try to frame this from the standpoint of what the user does, or what the app enables for the user.
A section on the technology used. -->
<!-- 
## Motivation
<!-- 
Sometimes you just want a nice relaxing night in, while ordering dinner and watching a good movie.  There are so many restaurants and movies to choose from, and it can be very hard to make a selection.  This app was created to help users avoid the decision paralysis that happens when they need to deicde on a resturaunt to eat at, or when they need to decide on a movie to watch. First, the user will input their location and the app will show the information for a takeout restaurant nearby.  Then the user will input a movie that they like and the app will show them a recommendation and trailer for a similar movie. -->


## Summary

<!-- <b>Dinner and a Movie</b> is a responsive web app that helps users decide where to order dinner and which movie to watch for a fun night in.  Users input their location and it is sent to the [EatStreet API Endpoint](https://developers.eatstreet.com/endpoint/search) to find restaurants that provide food delivery or pickup nearby. Users will then navigate to a screen where they can input a movie that they like so that they can receive similar movie recommendations using the [TasteDive Movie API Endpoint](https://tastedive.com/read/api)  -->



## Built with:

<!-- #### <br/>APIs <br/>&nbsp;&nbsp;&nbsp; [EatStreet API](https://developers.eatstreet.com/endpoint/search)  <br/>&nbsp;&nbsp;&nbsp; [TasteDive Movie API ](https://tastedive.com/read/api)<br/>jQuery <br/>JavaScript <br/>HTML <br/>CSS <br/>   Visual Studio Code <br/>Git Hub -->



## Process

<!-- ##### [> Initial wireframes<](https://docs.google.com/document/d/16hyz31opJRNBHMy4-gDB9pLsdS5OK1MZCCaQCb7vhCo/edit?usp=sharing) -->

### Wireframe images
<!-- 
<img src="content/wireframe.png" alt="Wireframe" width="400">

##### [> Initial User Stories<](https://docs.google.com/spreadsheets/d/1FB6xBWHgIpJLK6rlRdFN-CHQ4ed_Hvct-nbLKT8k22w/edit?usp=sharing) -->

### Version MVP (Minimal Viable Product)

<!-- [>MVP<](https://chandahubbard.github.io/API%20Hack%20Capstone/index.html) -->

#### Image of MVP Title Screen

<!-- <img src="content/MVP1.png" alt="Image of MVP Title Screen" width="300">

#### Image of MVP Results Screen

<img src="content/MVP6.png" alt="Image of MVP Results Screen" width="900"> -->

### Styling with a little bit of CSS

<!-- After researching the <i>Psychology of Color</i>, I decide that I would either choose a red or orange color scheme for my styling.  Red, because it symbolizes entertainment, for the movie portion of the app. Or orange, because it symbolizes food/hunger, for the food delivery portion of the app.  I ended up with a red based color theme from Adobe called,  [Sosialisasi Speak Up 19](https://color.adobe.com/Sosialisasi-Speak-Up-19-color-theme-14114879/https://color.adobe.com/Sosialisasi-Speak-Up-19-color-theme-14114879/) , which can be viewed below.

<br/><img src="content/colortheme.png" alt="Style Title" width="600">

<img src="content/intro.png" alt="Style Title" width="400"><br/>



## Final version at different breakpoints

### Mobile

<img src="content/mobile.png" alt="Final Title Screen on Mobile Version" width="250">

### Tablet

<img src="content/tablet.png" alt="Final Title Screen on Tablet Version" width="300">

### Desktop/other

<img src="content/desktop.png" alt="Final Title Screen on Desktop Version" width="400"> -->



## Final version & User Flows
<!-- 
### Screen 1 
#### Landing Page which Navigates to a Dinner Input screen once the "Let's Go" button is clicked 
<img src="content/intro.png" alt="Intro Screen on Tablet Version" width="500" align="center">

### Screen 2
#### Dinner Input screen, where the user can provide their location and select delivery and pickup options
<img src="content/dinnerinput.png" alt="Dinner Input Screen on Tablet Version" width="500">

### Screen 3
#### Flows the user from the dinner input screen to the movie input screen once the "Find a Movie" button is clicked
<img src="content/flowtomovie.png" alt="Flow from Dinner input to Movie input Screen on Tablet Version" width="500">

### Screen 4
#### Movie input screen that allows used to provide a movie they would like to see similar recommendations for
<img src="content/movieinput.png" alt="Movie Input Screen on Tablet Version" width="500">

### Screen 5
#### Flows the user from the movie input screen to the results screen once the "View Dinner & Movie Pairing" button is clicked
<img src="content/flowtoresults.png" alt="Flow from movie input to results Screen on Tablet Version" width="500">

### Screen 6
#### Flows the user to the results screen where they can view their restaurant recommendation and their movie recommendation.
<img src="content/resultsscreen1.png" alt="Final Screen top Screen on Tablet Version" width="500">
<img src="content/resultsscreen2.png" alt="Final Screen Bottom on Tablet Version" width="500">

### Additional Screens
#### The user can then select the "restart the app" button which navigates back to screen one and clears all results or they can select the "View more recommendations" button to view screen 6 with different movie and restaurant results. -->



## Other features to implement in future versions

<!-- [ ] Figure out how to handle edge cases for movie input
<br/>
[ ] Incorporate an additional API that will let the user know which streaming service currently offers their movie selection for viewing. -->

 -->


# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.