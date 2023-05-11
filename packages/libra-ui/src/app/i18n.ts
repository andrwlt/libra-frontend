import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          emailHelpText: '{{productName}} will be sent to your email upon successful payment.',
          thankForYourPayment: 'Thanks for Your Purchase!',
          productWillBeSent: 'Get ready! Your {{productName}} is zooming its way to your inbox.',
          poweredBy: 'Powered by',
          libraLogo: 'Libra Logo',
          privacy: 'Privacy',
          terms: 'Terms',
          defaultErrorMessage: "Oops! Something went wrong. Please contact help@golibra.xyz to get the supports.",
          insufficientBalanceError: 'Oops! It seems your balance is not sufficient to process the payment.',
          contactInformation: 'Contact information',
          paymentMethod: 'Payment method',
          pay: 'Pay',
        },
      },
    },
  });

export default i18n;
