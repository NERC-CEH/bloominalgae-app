import Log from 'helpers/log';
import config from 'config';
import { Model } from '@apps';
import { genericStore } from './store';

class UserModel extends Model {}

const defaults = {};

Log('UserModel: initializing');
const userModel = new UserModel(genericStore, 'user', defaults, config.backend);
export { userModel as default, UserModel };
