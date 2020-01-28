/* eslint-disable prefer-const */
import { Request, Response } from 'express';
import { UserModel } from '../schemas/user';
import { formatOutput } from '../utils/orderApiUtilFormat';

const halson = require('halson');

export const getUser = (req: Request, res: Response) => {
  const username = req.params.username;
  UserModel.findOne({ username: username }, (error: any, user: UserModel) => {
    if (!user) return res.status(404).send();
    if (error) console.log(error);

    user = user.toJSON();
    user._id = user._id.toString();
    user = halson(user).addLink('self', `/users/${user._id}`);

    return formatOutput(res, user, 200, 'user');
  });
};

export const addUser = (req: Request, res: Response) => {
  const newUser = new UserModel(req.body);

  newUser.save((error, user) => {
    if (error) console.log(error);
    user = halson(user.toJSON()).addLink('self', `/users/${user.id}`);
    return formatOutput(res, user, 201, 'user');
  });
};

export let updateUser = (req: Request, res: Response) => {
  const username = req.params.username;

  UserModel.findOne({ username: username }, (error, user) => {
    if (!user) return res.status(404).send;

    if (error) console.log(error);

    user.username = req.body.username || user.username;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.phone = req.body.phone || user.phone;
    user.userStatus = req.body.userStatus || user.userStatus;

    user.save(error => {
      if (error) console.log(error);
      res.status(204).send();
    });
  });
};

export const removeUser = (req: Request, res: Response) => {
  const username = req.params.username;

  UserModel.findOne({ username: username }, (error, user) => {
    if (!user) return res.status(404).send();
    if (error) console.log(error);

    user.remove(error => {
      if (error) console.log(error);
      res.status(204).send();
    });
  });
};
