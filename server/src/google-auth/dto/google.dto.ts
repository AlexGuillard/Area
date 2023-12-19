export class GoogleDto {
  message: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
    refreshToken: string;
  };
}
