import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import {dbData} from '../common/db.json';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
      super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route(`/users`)
        .get((req: express.Request, res: express.Response) => {
            const result = dbData.users;
            res.status(200).send(result);
        })
        .post((req: express.Request, res: express.Response) => {
            const resultantTaskList = [...dbData.users, req.query];
            res.status(200).send(resultantTaskList);
    });

    this.app.route(`/users/authenticate`)
        .post((req: express.Request, res: express.Response) => {
            const { username, password } = req.body;
            const user = dbData.users.find(x => x.username === username && x.password === password);
            if (!user) {
              res.status(403).send('Username or password is incorrect');
            } else {
              res.status(200).send({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
          }
    });

    this.app.route(`/users/:userId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: express.Request, res: express.Response) => {
                const taskId = req.params.userId;
                const index = dbData.tasks.findIndex(x => x.id === taskId);
                dbData.tasks[index].status = req.query.status.toString();
                res.status(200).send(dbData.tasks);
            })
            .patch((req: express.Request, res: express.Response) => {
                const taskId = req.params.userId;
                const index = dbData.tasks.findIndex(x => x.id === taskId);
                for (var i in dbData.tasks[index]) {
                  dbData.tasks[index][i] = req.query[i].toString();
                }
                res.status(200).send(dbData.tasks);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });

        return this.app;
    }

}
