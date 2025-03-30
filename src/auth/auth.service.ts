import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { authDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: authDto) {
    // 1. Generate the password hash

    const hash = await argon.hash(dto.password);
    try {
      // 2 .Save the new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },

        // But this also returns everything like hash, but I don't like to select hash which is not very secure
        // In fact, this is not very recommended --> should use transformers (?)
        // select: {
        //   email: true,
        //   id: true,
        //   createdAt: true,
        // },
      });
      // A dirty solution
      // delete user.hash;

      // // 3. Return the saved user
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      // Check if error is from prisma
      if (error instanceof PrismaClientKnownRequestError) {
        {
          // Prisma docs has all these exceptions well documented
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }
      }
      throw error;
    }
  }
  // sign in use the same dto as signup
  async signin(dto: authDto) {
    // find the existing email

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // Guards conditions for not finding users

    if (!user) throw new ForbiddenException('Credentials incorrect!');

    // Compare password

    const pwMatches = await argon.verify(user.hash, dto.password);
    /// Guards conditosn for incorrect passwords

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    // returns users
    // don't need to delete when add signToken
    // delete user.hash;
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return { access_token: token };
    // return this.jwt.signAsync(payload, {
    //   expiresIn: '15m',
    //   secret: secret,
    // });
  }
}
