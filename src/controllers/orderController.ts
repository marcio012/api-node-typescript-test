import { Request, Response } from 'express';
import _ from 'lodash';
import { OrderModel } from '../schemas/order';
import { UserModel } from '../schemas/user';
import { formatOutput } from '../utils/orderApiUtilFormat';

const halson = require('halson');

export const getOrder = (req: Request, res: Response) => {
  const id = req.params.id;
  OrderModel.findById(id, (err, order: OrderModel) => {
    if (!order) return res.status(404).send();

    if (err) console.log(err);

    order = halson(order.toJSON()).addLink('self', `/store/orders/${order.id}`);
    return formatOutput(res, order, 200, 'order');
  });
};

export const getAllOrders = (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 0;
  const offset = Number(req.query.offset) || 0;

  OrderModel.find({}, null, { skip: offset, limit: limit }).then(orders => {
    if (orders) {
      orders = orders.map(order => {
        return halson(order.toJSON())
          .addLink('self', `/store/orders/${order.id}`)
          .addLink('user', {
            href: `/users/${order.userId}`,
          });
      });
    }
    return formatOutput(res, orders, 200, 'order');
  });
};

export const addOrder = (req: Request, res: Response) => {
  const userId = req.body.userId;

  UserModel.findById(userId, (err, user) => {
    if (!user) return res.status(404).send();

    if (err) console.log(err);

    const newOrder = new OrderModel(req.body);

    newOrder.save((err, order) => {
      order = halson(order.toJSON())
        .addLink('self', `/store/orders/${order.id}`)
        .addLink('user', {
          href: `users/${order.userId}`,
        });

      if (err) console.log(err);

      return formatOutput(res, order, 201, 'order');
    });
  });
};

export const removeOrder = (req: Request, res: Response) => {
  const id = req.params.id;
  OrderModel.findById(id, (error, order) => {
    if (!order) return res.status(404).send();

    if (error) {
      console.log(error);
    } else {
      order.remove(error => {
        console.log(error);
        res.status(204).send(error);
      });
    }
  });
};

export const getInventory = (req: Request, res: Response) => {
  const status = req.query.status;
  OrderModel.find({ status: status }, (err, orders: OrderModel | undefined | any) => {
    if (err) console.log(err);

    orders = _.groupBy(orders, 'userId');
    return formatOutput(res, orders, 200, 'inventory');
  });
};
