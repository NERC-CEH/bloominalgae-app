import { useContext } from 'react';
import { TypeOf } from 'zod';
import { useToast, useLoader, Page, Header, device } from '@flumens';
import { NavContext } from '@ionic/react';
import userModel, { UserModel } from 'models/user';
import Main from './Main';

type Details = TypeOf<typeof UserModel.loginSchema>;

const LoginController = () => {
  const context = useContext(NavContext);
  const toast = useToast();
  const loader = useLoader();

  const onSuccessReturn = () => {
    toast.success('Successfully logged in');
    context.navigate('/home/surveys', 'root');
  };

  async function onLogin(details: Details) {
    const { email, password } = details;

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    await loader.show('Please wait...');

    try {
      await userModel.logIn(email.trim(), password);

      onSuccessReturn();
    } catch (err: any) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      console.error(err);
    }

    loader.hide();
  }

  return (
    <Page id="user-login">
      <Header className="ion-no-border" />
      <Main onSubmit={onLogin} />
    </Page>
  );
};

export default LoginController;
