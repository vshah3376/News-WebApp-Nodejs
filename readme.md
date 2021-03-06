# News Summarization Website

<img alt="Python" src="https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/> <img alt="NumPy" src="https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white" /> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/> 
<img alt="Flask" src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"/>



We have developed a news summarization website that displays summaries of news articles. Our project aims to be a one stop website where visitors can browse news articles, receive recommendations, check categories and read summaries.. We aim to continue developing our application in the future and add other features and optimize them as well. <br> 

A separate script get article links from NewsAPI, scrapes the article content, summarizes it and stores relevant content in mongoDB database which is then accessed by the website. There is also a script for on-demand summarization. Available in the [Summarizer module](https://github.com/bhuvnesh7/News-WebApp-Summarizer). Scripts can also be found in the summarizer folder of this repo. <br>

This web app is developed with Node.js, Python 3.8 and MongoDB.
The web app is a blog CMS. Everything is dynamic. You don't need to edit any code manually.

### Features:

* **Self-implemented summarizer based on TextRank**
* Posting articles  
* Highlighted articles  
* Slideshow of  articles  
* Popular articles  
* Most viewed articles  
* Recent articles  
* Breaking news articles  
* On-demand summarization
* Categories and Subcategories  
* Search of articles by article title and keywords
* Contact page with Google recaptcha  
* About page  
* REST API for fetching the articles  
* Push Notification for visitors  
* Advanced Admin Panel dashboard  

<!-- ## Project directory structure

```
|-- .gitignore  
|-- directoryList.md  
|-- index.js  
|-- package-lock.json  
|-- package.json  
|-- Procfile  
|-- models  
|---|-- about.js  
|---|-- admin.js  
|---|-- article.js  
|---|-- breaknews.js  
|---|-- category.js  
|---|-- contact.js  
|---|-- db.js  
|---|-- highlighted.js  
|---|-- index.js  
|---|-- info.js  
|---|-- newsletter-email.js  
|---|-- newsletter.js  
|---|-- popular.js  
|---|-- slideshow.js  
|---|-- subcategory.js  
|---|-- videos.js  
|---|-- webpush.js  
|-- public  
|---|-- publickey.txt  
|---|-- worker.js  
|---|-- css  
|---|   |-- admin.css  
|---|   |-- bootstrap.min.css  
|---|   |-- styles.css  
|---|-- icons  
|---|   |-- css  
|---|-- images  
|---|-- scripts  
|---|-- uploads  
|-- routes  
|---|-- about.js  
|---|-- api.js  
|---|-- article.js  
|---|-- category.js  
|---|-- home.js  
|---|-- index.js  
|---|-- newsletter.js  
|---|-- webpush.js  
|---|-- admin  
|-------|-- about.js  
|-------|-- account.js  
|-------|-- articles.js  
|-------|-- authenticate.js  
|-------|-- breaknews.js  
|-------|-- categories.js  
|-------|-- contacts.js  
|-------|-- highlight.js  
|-------|-- home.js  
|-------|-- index.js  
|-------|-- login.js  
|-------|-- newsletter-sub.js  
|-------|-- newsletter.js  
|-------|-- pagination.js  
|-------|-- passport-config.js  
|-------|-- popular.js  
|-------|-- setting.js  
|-------|-- slideshow.js  
|-------|-- subcategories.js  
|-------|-- videos.js  
|-- views  
----|-- 404.pug  
----|-- about.pug  
----|-- article.pug  
----|-- category.pug  
----|-- contact.pug  
----|-- footer.pug  
----|-- header.pug  
----|-- index.pug  
----|-- sidebar.pug  
----|-- admin  
--------|-- about.pug  
--------|-- account.pug  
--------|-- articles.pug  
--------|-- breaknews.pug  
--------|-- categories.pug  
--------|-- contact.pug  
--------|-- header.pug  
--------|-- highlight.pug  
--------|-- index.pug  
--------|-- login.pug  
--------|-- newsletter-sub.pug  
--------|-- newsletter.pug  
--------|-- popular.pug  
--------|-- setting.pug  
--------|-- sidebar.pug  
--------|-- slideshow.pug  
--------|-- subcategories.pug  
--------|-- videos.pug  
``` -->

### Getting Started

Use exported DB files from the 'db' folder and import it your database called 'magazine'.  
You can do the same thing manually, but you have to be careful of using the right document properties names.
For example, in the Admin document there is no page to register admin account. you need to add it manually or import admin.json file to your database in admin collection.



If you imported it:

admin username: Demo  
admin Email: demo@example.com  
admin Password: demo  


### TextRank Paper
[*Rada Mihalcea and Paul Tarau, TextRank: Bringing Order into Texts, in Proceedings of the Conference on Empirical Methods in Natural Language Processing (EMNLP 2004), Barcelona, Spain, July 2004.*] (https://web.eecs.umich.edu/~mihalcea/papers/mihalcea.emnlp04.pdf) <br>

Jupyter Notebook contains algorithm implementation and comparison with Gensim's summarizer. Comparable performance is achieved. 

### Tech Stack
* Frontend-HTML,CSS,JavaScript
* Backend-Node.js,Express,Python
* Database-Mongodb
* API-https://newsapi.org/
* News Summarization-Algorithm based on TextRank  

### Prerequisites and Installing

1.Nodes.js installer-
https://nodejs.org/en/download/  <br>
2.Install all modules from the package.json file by typing:  
npm install from CMD on the project directory path

```  
npm install
```  

Also check Python requirements in the summarizer folder for running the summarizer script and on-demand summarization Flask API.

### How to use the application:
[User Guide](https://docs.google.com/document/d/1ZeWh1GbxrI-MK58yBUUnjPnIoVxtL4sxsJUSp7aOWIc/edit?usp=sharing)


------------------------------------------

<h3 align="center"><b>Developed by <a href="https://github.com/nishigthb">Nishi</a>,<a href="https://github.com/vshah3376"> Vatsal</a> and <a href="https://github.com/bhuvnesh7">Bhuvnesh.</a></b></h1>

<!-- Change web push publicVapidKey, privateVapidKey and Email from index.js. Sample code:  

```  
const publicVapidKey = "<PublicKey>";  
const privateVapidKey  = "<PrivateKey>;  
webpush.setVapidDetails('mailto:<YourEmail>', publicVapidKey, privateVapidKey);
```   -->
<!-- #### deployment

Use mongoDB as a cloud. Example: MongoDB Atlas  
Use a cloud server. Example: Heroku  

Change the db url in /models/db.js to your own db url connection  

```  
await mongoose.connect('<mongodb://127.0.0.1:27017/magazine>', { useNewUrlParser: true, useUnifiedTopology: true });  
```  
Change all the session store url values to your DB url connection in all pages at directory /admin/*
```
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/magazine',
    })
}));
``` -->

<!-- Change Google recaptcha Secret key to your own at path /routes/home.js  

```
const secretKey = '<SecretKey>';
```
Change email verifier module API key to your own at path /routes/newsletter.js, Get the key [Here](https://emailverification.whoisxmlapi.com/)  

```
let verifier = new Verifier("<YourKey>");
``` -->
