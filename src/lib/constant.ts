// will user https on production environment
export const COOKIE_OPTIONS = { httpOnly: false, secure: import.meta.env.PROD };

export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const LOGOUT_PATH = '/logout';
