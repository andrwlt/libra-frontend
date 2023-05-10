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
          thankForYourPayment: 'Thanks for your payment',
          productWillBeSent: '{{productName}} will be sent to your email upon successful payment.',
          poweredBy: 'Powered by',
          libraLogo: 'Libra Logo',
          privacy: 'Privacy',
          terms: 'Terms',
          defaultErrorMessage:
            "Whoopsie! Looks like our dApp had one too many cups of coffee this morning. We're working on calming it down. Please try again later.",
          insufficientBalanceError: 'Oops! It seems your balance is not sufficient to process the payment.',
          contactInformation: 'Contact information',
          paymentMethod: 'Payment method',
          pay: 'Pay',
        },
      },
    },
  });

export default i18n;
