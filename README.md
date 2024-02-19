# Northcoders News API

## Getting Started

To run this project locally, you'll need to set up a few environment variables which are necessary for connecting to the databases.

The project uses environment variables to manage configuration and secrets. 
Since `.env.*` files are ignored via `.gitignore`, you will need to create your own.


1. **Development Environment Variables:**

   - Navigate to the `/be-nc-news` directory.
   - Create a file named `env.development`.
   - Inside the `env.development` file, add the following line to set the database name for development:
     ```
     PGDATABASE=nc_news
     ```
   - This will configure the application to connect to the `nc_news` database during development.

2. **Test Environment Variables:**

   - In the `/be-nc-news` directory, create a file named `env.test`.
   - Inside the `env.test` file, add the following line to set the database name for testing:
     ```
     PGDATABASE=nc_news_test
     ```
   - This will configure the application to connect to the `nc_news_test` database when running tests.

Make sure to not include these `.env` files in your version control system. Add `env.*` to your `.gitignore` file to prevent any environment configuration files from being accidentally committed and pushed to the repository.

By following these instructions, developers can clone your project and set up their local environment to connect to the appropriate databases for development and testing.


