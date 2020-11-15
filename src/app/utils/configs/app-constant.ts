// tslint:disable-next-line:max-line-length
// export const URL_PATTERN = /^(http:\/\/|https:\/\/)(([a-zA-Z0-9_-]+).)(([a-zA-Z0-9_-]+).)([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(:[0-9]{1,5})?(\/.*)?$/;
export const URL_PATTERN = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9!()@:*%_\+.,;~#?&//=]*)$/;
export const USER_EMAIL_MAX_LEN = 50;
export const USER_FN_MAX_LEN = 50;
export const USER_LN_MAX_LEN = 50;
// export const USER_NAME_REG = /^[a-zA-Z0-9_-]{6,20}$/;
export const USER_EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const USER_PW_MIN_LEN = 10;
export const USER_PASSWORD_REG = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

export const PRODUCT_NAME_MAX_LEN = 50;
export const IMG_URL_MAX_LEN = 500;
export const PRODUCT_BRAND_MAX_LEN = 100;
export const PRODUCT_DESC_MAX_LEN = 500;
export const PRODUCT_PRICE_MIN = 0;
export const PRODUCT_QUANTITY_MIN = 0;

export const USER = 'USER';
export const ADMIN = 'ADMIN';
export const ROLES = [USER, ADMIN];
