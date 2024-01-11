import {NL_NL_MESSAGES} from './nl-nl';
import {EN_GB_MESSAGES} from './en-gb';
import {Messages} from '../../interfaces/messages';

export const DEFAULT_MESSAGES: Messages = {
  ...NL_NL_MESSAGES,
  ...EN_GB_MESSAGES,
};
