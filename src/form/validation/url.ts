import { string } from 'yup';

import { makeRequiredErrorMessage } from './messages';

const urlPatternValidationError = 'Must be a valid URL';

const URL_PATTERN =
  /(^(https:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$)|(^http(s)?:\/\/localhost:[0-9]+$)/;

export const urlValidation = string()
  .required(makeRequiredErrorMessage('URL'))
  .matches(URL_PATTERN, urlPatternValidationError);
