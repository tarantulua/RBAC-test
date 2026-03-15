import session from 'express-session';

export type UserSession = session.Session & {
  userId?: number;
};
