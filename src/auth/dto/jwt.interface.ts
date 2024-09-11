import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  role: string;
  id: number;
  email: string;
}
