import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { Directory } from 'src/entities/directory.entity';
import { TodoItem } from 'src/entities/todoItem.entity';
import { User } from 'src/entities/user.entity';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'ensolvers-challenge',
      });
      sequelize.addModels([TodoItem, Directory, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
