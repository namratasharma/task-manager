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
            const loggedInUser = req.query.userId;
            const roleOfUser = req.query.userRole;
            var result = [];

            if(roleOfUser === 'admin') {
              console.log("hello")
              result = dbData.tasks;
            } else {
              result =  dbData.tasks.filter(el=> el.assignedTo.toString() == loggedInUser);
            }
            res.status(200).send(result);
        })
        .post((req: express.Request, res: express.Response) => {
            const resultantTaskList = [...dbData.tasks, req.query];
            res.status(200).send(resultantTaskList);
        });

    this.app.route(`/tasks/:taskId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.taskId}`);
            })
            .put((req: express.Request, res: express.Response) => {
                const taskId = req.params.taskId;
                const index = dbData.tasks.findIndex(x => x.id === taskId);
                dbData.tasks[index].status = req.query.status.toString();
                res.status(200).send(dbData.tasks);
            })
            .patch((req: express.Request, res: express.Response) => {
                const taskId = req.params.taskId;
                const index = dbData.tasks.findIndex(x => x.id === taskId);
                for (var i in dbData.tasks[index]) {
                  dbData.tasks[index][i] = req.query[i].toString();
                }
                res.status(200).send(dbData.tasks);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.taskId}`);
            });

        return this.app;
    }

}
