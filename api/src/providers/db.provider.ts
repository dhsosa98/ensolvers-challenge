import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { Directory } from 'src/entities/directory.entity';
import { TodoItem } from 'src/entities/todoItem.entity';
import { User } from 'src/entities/user.entity';
import mysql from 'mysql2';
import { Device } from 'src/entities/device.entity';
import { Notification } from 'src/entities/notification.entity';
import { UserNotification } from 'src/entities/userNotification.entity';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialectModule: mysql,
        dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'ensolvers-challenge',
        pool: {
          max: 3,
          min: 0,
          idle: 10000,
        },
      });
      sequelize.addModels([TodoItem, Directory, User, Device, Notification, UserNotification]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
