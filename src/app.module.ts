import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    //MongooseModule.forRoot(process.env.DATABASE_URL), 
    MongooseModule.forRoot('mongodb+srv://dgdunica:TREMEND*123@cluster0.p7nodqu.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule
  ],
})
export class AppModule {}
