import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { NavContext } from '@ionic/react';
import { toast, loader, Page, Header, device } from '@apps';
import i18n from 'i18next';
import Main from './Main';
import './styles.scss';

const { success, warn, error } = toast;

async function onLogin(userModel, details, onSuccess) {
  const { email, password } = details;

  if (!device.isOnline()) {
    warn("Sorry, looks like you're offline.");
    return;
  }

  await loader.show({
    message: i18n.t('Please wait...'),
  });

  try {
    await userModel.logIn(email.trim(), password);

    onSuccess();
  } catch (err) {
    console.error(err);

    error(err.message);
  }

  loader.hide();
}

function LoginContainer({ userModel, onSuccess }) {
  const context = useContext(NavContext);
  const onSuccessReturn = () => {
    onSuccess && onSuccess();

    success('Successfully logged in');

    context.navigate('/home/surveys', 'root');
  };

  const onLoginWrap = details => onLogin(userModel, details, onSuccessReturn);

  return (
    <Page id="user-login">
      <Header className="ion-no-border" routerDirection="none" />
      <Main schema={userModel.loginSchema} onSubmit={onLoginWrap} />
    </Page>
  );
}

LoginContainer.propTypes = exact({
  userModel: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
});

export default LoginContainer;
