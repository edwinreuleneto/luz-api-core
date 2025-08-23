import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

interface UserRecord {
  uid: string;
  email: string;
  displayName?: string;
}

interface DecodedIdToken {
  uid: string;
  email: string;
  [key: string]: any;
}

@Injectable()
export class FirebaseService {
  private app: any;

  constructor(private readonly configService: ConfigService) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      ?.replace(/\\n/g, '\n');

    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  auth(): any {
    return this.app.auth();
  }

  async createUser(
    email: string,
    password: string,
    displayName: string,
  ): Promise<UserRecord> {
    return await this.auth().createUser({ email, password, displayName });
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    return await this.auth().verifyIdToken(idToken);
  }
}
