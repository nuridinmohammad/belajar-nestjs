import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class Connection {
  getName(): string {
    return null;
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'MYSQL';
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string {
    return 'MONGODB';
  }
}

export function createConnection(configService: ConfigService): Connection {
  if (configService.get('DATABASE') === 'mysql') {
    return new MySQLConnection();
  } else {
    return new MongoDBConnection();
  }
}
