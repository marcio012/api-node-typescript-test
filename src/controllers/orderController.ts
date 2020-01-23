import { Request, Response } from 'express';
import * as _ from 'lodash';
import Order from '../models/order';
import { OrderStatus } from '../models/orderStatus';
import { formatOutput } from '../utils/orderApiUtilFormat';

const halson = require('halson');

let orders: Array<Order> = [];

export const getOrder = (req: Request, res: Response) => {
  const id = req.params.id;
  let order: Order | undefined | null = orders.find(obj => obj.id === Number(id));
  if (order) order = halson(order).addLink('self', `/store/orders/${order.id}`);
  const httpStatusCode = order ? 200 : 404;
  return formatOutput(res, order, httpStatusCode, 'order');
};

export const getAllOrders = (req: Request, res: Response) => {
  const limit = req.query.limit || orders.length;
  const offset = req.query.offset || 0;
  let filterOrders = _(orders)
    .drop(offset)
    .take(limit)
    .value();

  filterOrders = filterOrders.map(order => {
    return halson(order)
      .addLink('self', `/store/orders/${order.id}`)
      .addLink('user', {
        href: `/users/${order.userId}`,
      });
  });

  return formatOutput(res, filterOrders, 200, 'order');
};

export const addOrder = (req: Request, res: Response) => {
  let order: Order = {
    // generic random value from 1 to 100 only for tests so far
    id: Math.floor(Math.random() * 100) + 1,
    userId: req.body.userId,
    quantity: req.body.quantity,
    shipDate: req.body.shipDate,
    status: OrderStatus.Placed,
    complete: false,
  };
  orders.push(order);

  order = halson(order)
    .addLink('self', `/store/orders/${order.id}`)
    .addLink('user', {
      href: `users/${order.userId}`,
    });

  return formatOutput(res, order, 201, 'order');
};

export const removeOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const orderIndex = orders.findIndex(item => item.id === id);

  if (orderIndex === -1) {
    return res.status(404).send();
  }

  orders = orders.filter(item => item.id !== id);

  return formatOutput(res, {}, 204);
};

export const getInventory = (req: Request, res: Response) => {
  const status = req.query.status;
  let inventoryOrders = orders;
  if (status) {
    inventoryOrders = inventoryOrders.filter(item => item.status === status);
  }
  const grouppedOrders = _.groupBy(inventoryOrders, 'userId');

  return formatOutput(res, grouppedOrders, 200, 'inventory');
};
