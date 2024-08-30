# TradingView

### How to Run the Application

To start the TradingView application, use the following command:

```console
$ docker compose up -d
```

This command will start both the MongoDB instance and the Node.js server.

### Configuration

By default, the application will look for a `.env` file in the root directory for configuration settings.

If you want to specify a different configuration file, set the `ENV` environment variable to the path of your desired config file before starting the application.

### Accessing the Web View

Once the application is running, you can access the web view by navigating to the following URL in your web browser:

http://localhost:3000/view
