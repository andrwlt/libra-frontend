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
          defaultErrorMessage: 'Oops! Something went wrong. Please contact help@golibra.xyz to get the supports.',
          insufficientBalanceError: 'Oops! It seems your balance is not sufficient to process the payment.',
          contactInformation: 'Contact information',
          paymentMethod: 'Payment method',
          pay: 'Pay',

          funnyQuotes: {
            0: 'We’re busy finding Satoshi, back in a flash',
            1: 'Mining your patience, rewards coming soon',
            2: 'Decentralizing your wait time, one block at a time',
            3: 'Hold on tight, we’re mining some more data',
            4: 'The network is slow, but our memes are fast',
            5: 'Calm your gas fees, we’re revving up the blockchain',
            6: 'Sit tight, our nodes are synchronizing the fun!',
            7: 'Assembling your crypto crew, just a moment',
            8: 'Hashing out the details, please stand by',
            9: 'Buffering blockchain magic, almost there',
            10: 'Smart contracts in progress, stay tuned',
            11: 'Patience pays, loading your crypto experience',
            12: 'Riding the blockchain wave, be right back',
            13: 'Staking your claim, just a few more moments',
            14: 'Tokenizing your patience, web3 magic in progress',
            15: 'Just a sec, we’re optimizing your crypto journey',
            16: 'Unlocking the secrets of web3, standby',
            17: 'Fasten your seatbelts, we’re diving into the metaverse',
          },
        },
      },
    },
  });

export default i18n;
