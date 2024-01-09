export class SpotifyUserDto {
    provider: 'spotify';
    id: string;
    username: string;
    displayName: string;
    profileUrl: string;
    photos: string[];
    country: string;
    followers: number;
    product: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    expires_in: number;

  
    constructor(data: {
      provider: 'spotify';
      id: string;
      username: string;
      displayName: string;
      profileUrl: string;
      photos: string[];
      country: string;
      followers: number;
      product: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      expires_in: number;
    }) {
      this.provider = data.provider;
      this.id = data.id;
      this.username = data.username;
      this.displayName = data.displayName;
      this.profileUrl = data.profileUrl;
      this.photos = data.photos;
      this.country = data.country;
      this.followers = data.followers;
      this.product = data.product;
      this.email = data.email;
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      this.expires_in = data.expires_in;
    }
  }
  