import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

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

  auth(): admin.auth.Auth {
    return this.app.auth();
  }

  async createUser(email: string, password: string, displayName: string) {
    return this.auth().createUser({ email, password, displayName });
  }

  async verifyIdToken(idToken: string) {
    return this.auth().verifyIdToken(idToken);
  }
}
