import { useContext } from 'react';
import CONFIG from 'common/config';
import * as Yup from 'yup';
import {
  DrupalUserModel,
  device,
  useToast,
  useLoader,
  useAlert,
  DrupalUserModelAttrs,
} from '@flumens';
import { NavContext } from '@ionic/react';
import { genericStore } from './store';

export interface Attrs extends DrupalUserModelAttrs {
  firstName: string;
  secondName: string;
  email: string;
  /**
   * @deprecated
   */
  password?: string;
}

const defaults: Attrs = {
  firstName: '',
  secondName: '',
  email: '',
};

export class UserModel extends DrupalUserModel {
  attrs: Attrs = DrupalUserModel.extendAttrs(this.attrs, defaults);

  registerSchema = Yup.object().shape({
    email: Yup.string().email('email is not valid').required('Please fill in'),
    password: Yup.string().required('Please fill in'),
    fullName: Yup.string().required('Please fill in'),
    identificationExperience: Yup.string().required('Please fill in'),
  });

  constructor(options: any) {
    super(options);

    const checkForValidation = () => {
      if (this.isLoggedIn() && !this.attrs.verified) {
        console.log('User: refreshing profile for validation');
        this.refreshProfile();
      }
    };
    this.ready?.then(checkForValidation);
  }

  async checkActivation() {
    if (!this.isLoggedIn()) return false;

    if (!this.attrs.verified) {
      try {
        await this.refreshProfile();
      } catch (e) {
        // do nothing
      }

      if (!this.attrs.verified) return false;
    }

    return true;
  }

  async resendVerificationEmail() {
    if (!this.isLoggedIn() || this.attrs.verified) return false;

    await this._sendVerificationEmail();

    return true;
  }

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const userModel = new UserModel({
  cid: 'user',
  store: genericStore,
  config: CONFIG.backend,
});

export const useUserStatusCheck = () => {
  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const loader = useLoader();
  const alert = useAlert();

  const check = async () => {
    if (!device.isOnline) {
      toast.warn('Looks like you are offline!');
      return false;
    }

    if (!userModel.isLoggedIn()) {
      navigate(`/user/login`);
      return false;
    }

    if (!userModel.attrs.verified) {
      await loader.show('Please wait...');
      const isVerified = await userModel.checkActivation();
      loader.hide();

      if (!isVerified) {
        const resendVerificationEmail = async () => {
          await loader.show('Please wait...');
          try {
            await userModel.resendVerificationEmail();
            toast.success(
              'A new verification email was successfully sent now. If you did not receive the email, then check your Spam or Junk email folders.'
            );
          } catch (err: any) {
            toast.error(err);
          }
          loader.hide();
        };

        alert({
          header: "Looks like your email hasn't been verified yet.",
          message: 'Should we resend the verification email?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Resend',
              handler: resendVerificationEmail,
            },
          ],
        });

        return false;
      }
    }

    return true;
  };

  return check;
};

function migrateDataToAppVersion2() {
  try {
    const oldUserRaw = localStorage.getItem('bloominalgae-app-user');
    if (oldUserRaw) {
      console.log('Migrating user');

      const oldUser = JSON.parse(oldUserRaw);
      userModel.attrs.firstName = oldUser.firstname;
      userModel.attrs.secondName = oldUser.secondname;
      userModel.attrs.indiciaUserId = oldUser.drupalID;
      userModel.attrs.password = oldUser.password;
      userModel.attrs.email = oldUser.email; // has to be last - record auto sync might kick in
      userModel.save();

      localStorage.removeItem('bloominalgae-app-user');
      console.log('Migrating user done', userModel.attrs);
    }
  } catch (e) {
    console.error(e);
  }
}
userModel.ready?.then(migrateDataToAppVersion2);

export default userModel;
