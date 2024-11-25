import { useState } from 'react';
import clsx from 'clsx';
import {
  keyOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
  mailOutline,
} from 'ionicons/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans as T } from 'react-i18next';
import { TypeOf } from 'zod';
import { Main, Button } from '@flumens';
import { zodResolver } from '@hookform/resolvers/zod';
import { IonIcon, IonRouterLink } from '@ionic/react';
import config from 'common/config';
import { UserModel } from 'models/user';
import ControlledInput from '../common/Components/ControlledInput';

type Details = TypeOf<typeof UserModel.registerSchema>;

type Props = {
  onSubmit: SubmitHandler<Details>;
};

const RegisterMain = ({ onSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const { formState, handleSubmit, control } = useForm<Details>({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(UserModel.registerSchema),
  });

  return (
    <Main>
      <h1 className="my-10 text-center">
        <T>Create a free account</T>
      </h1>

      <div className="mx-auto max-w-md px-3">
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Fake onSubmit on Enter */}
          <input type="submit" className="hidden" />

          <div className="rounded-list">
            <ControlledInput
              control={control}
              name="firstName"
              prefix={<IonIcon icon={personOutline} className="size-5" />}
              placeholder="First Name"
            />
            <ControlledInput
              control={control}
              name="secondName"
              prefix={<IonIcon icon={personOutline} className="size-5" />}
              placeholder="Last Name"
            />
            <ControlledInput
              control={control}
              name="email"
              prefix={<IonIcon icon={mailOutline} className="size-5" />}
              type="email"
              placeholder="Email"
            />
            <ControlledInput
              control={control}
              name="password"
              prefix={<IonIcon icon={keyOutline} className="size-5" />}
              suffix={
                <IonIcon
                  icon={showPassword ? eyeOutline : eyeOffOutline}
                  className="size-5 opacity-50"
                  onClick={togglePassword}
                />
              }
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
          </div>

          <div className="mt-4 px-5 text-sm">
            <T>
              By clicking Sign Up, you agree to our{' '}
              <IonRouterLink href={`${config.backend.url}/privacy-notice`}>
                Privacy Policy
              </IonRouterLink>{' '}
              and{' '}
              <IonRouterLink href={`${config.backend.url}/terms_of_use`}>
                Terms and Conditions
              </IonRouterLink>
            </T>
          </div>

          <Button
            className={clsx('mx-auto mt-8', !formState.isValid && 'opacity-50')}
            color="primary"
            onPress={() => handleSubmit(onSubmit)()}
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-10 text-center">
          <T>I am already a member</T>.{' '}
          <IonRouterLink routerLink="/user/login">
            <T>Sign In</T>
          </IonRouterLink>
        </div>
      </div>
    </Main>
  );
};

export default RegisterMain;
