# Fun 2 Learn

A full stack web application for children who want to learn the alphabet, words, colors, and numbers.

My biggest inspiration behind building this web application was my best friend, my four year old cousin with autism. As many young children nowadays, my cousin loves browsing YouTube for hours on end, intrigued by the vast amount of videos. Many times, like us all, they stumble upon learning material that might not cater to them, whether it be a video in a different language or an irrelavent subject. I wanted to create a more hands-on, fun, and interactive learning application that not only can my cousin benefit from, but young children all together. From the moment I started learning to program, I knew that I wanted to build upon and utilize my newly acquired skills to help others, and [Fun 2 Learn](https://fun-2-learn.herokuapp.com/) is just the start.

## Technologies Used

- React
- PostgreSQL
- Node.js
- Express.js
- Babel
- Webpack
- Dotenv
- Node-Fetch
- HTML5
- CSS3
- JavaScript
- Heroku

## Live Demo

Try the application live at https://fun-2-learn.herokuapp.com/

## Features

- Users can select a category of learning topics.
- Users can view the letters of the alphabet.
- Users can hear the letters of the alphabet.
- Users can view corresponding images for each letter.
- Users can view a variety of colors.
- Users can listen to the color spelling out loud.
- Users can view an image correlating to the current color.
- Users can view a range of numbers.
- Users can listen to the number spelling out loud.

## Preview


## Stretch features I'd like to implement

- Users can drag and drop letters to spell words.
- Users can select an image from a list of images based off a given color.
- Users can color in an image using a color palette.
## Development

### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:mohamadalsyouf/fun-2-learn.git
    cd fun-2-learn
    ```
  
2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Make a copy of the .env.example file.

    ```shell
    cp .env.example .env
    ```

4. Start postgreSQL

    ```shell
    sudo service postgresql start
    ```

5. Create a new database

    ```shell
    createdb fun2learn
    ```

6. Import the example database to postgreSQL

    ```shell
    npm run db:import
    ```

7. View the database (optional - if pgweb is installed)

    ```shell
    pgweb --db=fun2learn
    ```

8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser

    ```shell
    npm run dev
    ```
