
# Y'alldis - Groceries Made Easy

Y'alldis is a grocery store that aimes to create an easy and enjoyable shopping experience. Y'alldis has an easy to use web application that allows users to browse recipes and generate a grocery list. When logged in as a user, you can browse through chef curated recipes and choose your favorites. A grocery list containing the recipe ingredients will automatically be generated. After choosing all the desired recipes, a user can downloaded a PDF of their grocery list. Then, the user can bring this list to the Y'alldis storefront to easily complete their shopping. When logged in as an administrator, the administrator has additional capabilities such as the ability to add recipes, edit recipes, and delete recipes. 

### User Features

* users can browse recipes and recipe details
* users can add recipes to their list, which will automatically generate a grocery list from the recipe ingredients
* users can remove recipes from their list, which will automatically remove the associated ingredients from the grocery list
* users can download a PDF of their grocery list
* users can update their profile information

### Administrator Features

*Note: An administrator can utilize all the same features as a user plus these extra features:*

* administrators can add a new recipe
* administrators can edit a recipe
* administrators can delete a recipe
## Technologies Used

![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)







## Running The Application

#### To deploy this project you will first need to access the database using JSON server. 

1. Install JSON Server.
```bash
npm i json-server
```

2. Clone the database repository and navigate to that directory in the terminal.
```bash
git clone git@github.com:rachel-kendricks/yalldis-api.git
cd yalldis-api
```

3. Run the server.
```bash
json-server -p 8088 database.json
```


#### Now, you can run the application. 

1. Open a new tab in the termainal (cmd t).

2. Clone the database repository and navigate to that directory in the terminal.
```bash
git clone git@github.com:rachel-kendricks/yalldis.git
cd yalldis
```
3. Launch the client.
```bash
npm install
npm start
```



## Authors

- [@rachel-kendricks](https://github.com/rachel-kendricks)

