# Fun 2 Learn

A full stack web application for children who want to learn the alphabet, words, colors, and numbers.

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

- Users can search for similar artists.
- Users can view a list of similar artists with music videos
- Users can add an artist to their list of liked artists.
- Users can view a list of their Liked Artists.
- Users can delete an artist from their Liked Artists list.

## Preview


## Stretch features I'd like to implement

- Users can create a playlist to add artists to.
- Users can add a note for each liked artist.
- Users can edit a liked artist's YouTube URL.

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
