import { Device } from '@capacitor/device';

const getMacroLanguage = code => code.split('-')[0]; // check only the first part in fr-FR

async function getLangCodeFromDevice(languages) {
  const { value: deviceLanguage } = await Device.getLanguageCode();

  const byLanguageCode = language =>
    getMacroLanguage(language) === getMacroLanguage(deviceLanguage);

  return languages.find(byLanguageCode);
}

export default getLangCodeFromDevice;
