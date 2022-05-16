import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuards } from './guards/local-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // TODO LOGIN avec strategy local
  @UseGuards(LocalAuthGuards)
  @Post('login')
  @HttpCode(200)
  login(@Request() req) {
    return req.user; // Passport crée automatiquement un userobjet, en fonction de la valeur renvoyée par la validate()méthode, et l'affecte à l' Requestobjet en tant que req.user
  }
}
