import express, { Request, Response } from 'express';
import { PostController } from './controller/post.controller'; // import the post controller
import { createConnection, ReturningStatementNotSupportedError } from "typeorm";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { getLogin } from "./login";
const sessions = require('express-session');
const path = require('path');
const cookieParser = require("cookie-parser");



class Server {
  private postController: PostController;
  private app: express.Application;

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(sessions({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes() {
    //postgres://yjmqugcxzuayij:153abee270fceca0d7170c99b6336c7ebeb20247ea9110a10d72cdb2dabbf9d0@ec2-3-93-206-109.compute-1.amazonaws.com:5432/df1pn15t3pn3e5
    const databaseUrl: string = process.env.DATABASE_URL || "";
    const connectionOptions = await PostgressConnectionStringParser.parse(databaseUrl);
    console.log(JSON.stringify(connectionOptions));
    if (connectionOptions === null) {
      console.log()
      return;
    }
    await createConnection({
      type: "postgres",
      // name: connectionOptions.name,
      host: connectionOptions.host!,
      port: Number(connectionOptions.port!),
      password: connectionOptions.password!,
      database: connectionOptions.database!,
      username: connectionOptions.user!,
      entities: ["build/database/entities/**/*.js"],
      name: "blog",
      "ssl": true,
      "extra": {
        "ssl": {
          "rejectUnauthorized": false
        }
      }
    });

    this.postController = new PostController();

    this.app.get('/', function (req: Request, res: Response) {
      res.send(getLogin());
    });

    this.app.post('/auth', function (req: any, res: Response) {
      if (!process.env.USER_PASSWORD) {
        res.send("please define the USER_PASSWORD environmental variable on the server");
        return;
      }

      if (!process.env.USER_USERNAME) {
        res.send("please define the USERNAME environmental variable on the server");
        return;
      }
      console.log(`login ${req.body.password} ${process.env.USER_PASSWORD}`);
      console.log(`password ${process.env.USER_USERNAME} ${req.body.username}`);

      if (!req.body || !req.body.username || !req.body.password) {
        res.send("didn't get right data.  Please try again");
        return;
      }

      if (process.env.USER_PASSWORD === req.body.password && process.env.USER_USERNAME === req.body.username) {
        console.log(`sessionaaa: ${JSON.stringify(req.session)}`);
        req.session.userId = req.body.username;
        req.session.loggedIn = true;


        res.redirect('/api/posts');
        res.send("did not find username and or password");
        return;
      } else {
        console.log("didn't find username");
        return;
      }
    });

    this.app.use(`/api/posts/`, this.postController.router); // Configure the new routes of the controller post
  }

  /**
   * Used to start the server
   */
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
