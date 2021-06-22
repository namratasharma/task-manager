import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import {dbData} from '../common/db.json';

export class TasksRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
      super(app, 'TasksRoutes');
  }

  configureRoutes() {
    this.app.route(`/tasks`)
        .get((req: express.Request, res: express.Response) => {
            const result = dbData.tasks.slice(0, 13);
            res.status(200).send(result);
        })
        .post((req: express.Request, res: express.Response) => {
            res.status(200).send(`Post to task`);
        });

    this.app.route(`/tasks/:taskId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /tasks/:taskId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.taskId}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.taskId}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.taskId}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.taskId}`);
            });

        return this.app;
    }

}
