## Build Status
[![Build Status](https://travis-ci.org/wiztemple/kommunity.svg?branch=develop)](https://travis-ci.org/wiztemple/kommunity)
[![Coverage Status](https://coveralls.io/repos/github/wiztemple/kommunity/badge.svg?branch=develop)](https://coveralls.io/github/wiztemple/kommunity?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0d6d7f87376a3d79a7cf/maintainability)](https://codeclimate.com/github/wiztemple/kommunity/maintainability)(https://codeclimate.com/github/wiztemple/kommunity/test_coverage)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)


# Kommunity
kommunity is a platform where people can ask questions and provide answers. A light weight StackOverflow with a Quora feel. :speech_balloon: :thought_balloon: :man: :woman: :boy: :girl: :pencil2:

## Features
* Users can create an account and log in :bust_in_silhouette: :busts_in_silhouette: 
* Users can post questions :outbox_tray:
* Users can delete the questions they post :x:
* Users can post answers :pencil: :outbox_tray:
* Users can view answers to questions :neutral_face: :eyes:
* Users can accept an answer out of all the answers to his/her question as the preferred answer :point_right: :heavy_check_mark:
* Users can upvote or downvote an answer :+1: :-1:
* Users can comment on an answer :speech_balloon:
* Users can fetch all questions he/she has ever asked on the platform :date:
* Users can search for questions on the platform :mag: :mag_right:
* Users can view questions with the most answers :eyes:


## Endpoints
| Request | Endpoint | Action |
| ------- | -------- | ------ |
| `POST` | _/api/v1/questions_ | Create question
| `GET`  | _/api/v1/questions_ | Get all questions
| `GET`  | _/api/v1/questions/:id_ | Get a single question
| `PUT`  | _/api/v1/questions/:id_ | Edit a question
| `POST` | _/api/v1/questions/:id/answer_ | Post answer to a question
| `DELETE` | _/api/v1/questions/:id_ | Delete a question


## Getting Started
Instructions to get the project running successfully on your terminal

### Prerequisites
You need to have these installed before cloning the project
* [Nodejs](https://nodejs.org/en/download/)

### Technologies Used
* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com)
* [Mocha](https://mochajs.org)
* [Chai](www.chaijs.com)
* [istanbul](https://istanbul.js.org)

## Style Guide
 :smile: [BEM — Block Element Modifier](http://getbem.com/introduction/)

 :smile: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/)


### How To Install
* Clone from github

 _```git clone https://github.com/wiztemple/kommunity.git```_
  _```cd kommunity```_
* Install dependencies
  _```npm install```_


### How To Run
  * _```npm run dev```_

### How To Test
  * _```npm test```_

### Test the endpoints hosted on Heroku
  * [https://kommunity-app.herokuapp.com](https://kommunity-app.herokuapp.com)

## Acknowledgments
:clap: :clap: :clap: :clap: :+1: :+1: :smile:
* [Andela](http://andela.com) 
* [Stackoverflow](stackoverflow.com)
* [Medium](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)
* [Dribbble](https://dribbble.com)

## Author
:large_blue_circle: :persevere: [Ukaegbu Sullivan Wisdom](http://github.com/wiztemple)

## License
This project is licensed under the **MIT** License