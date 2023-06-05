import { Device } from '@capacitor/device';

async function getLangCodeFromDevice(languages) {
  const deviceISOkey = await Device.getLanguageCode();
  // const deviceISOkey = { value: 'pt' };

  // eslint-disable-next-line no-restricted-syntax
  for (const [languageISOKey, languageOptionsOrLabel] of languages) {
    if (languageISOKey === deviceISOkey.value)
      return languageOptionsOrLabel.default || languageISOKey;
  }

  return '';
}

export default getLangCodeFromDevice;
