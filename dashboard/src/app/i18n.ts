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
          dashboard: 'Dashboard',
          back: 'Back',
          next: 'Next',
          save: 'save',
          logo: 'Logo',
          defaultErrorMessage: 'Something went wrong!',
          getExtensionsFailed: 'Get Extensions Failed',
          payments: 'Payments',
          checkoutLabel: 'Checkout',
          copied: 'Copied',
          copy: 'Copy',
          orShareItOn: 'or share it on',
          loading: 'Loading...',
          sessionExpried: 'Session is expried. Please login again!',

          asset: {
            wnd: 'WND',
            dot: 'DOT',
          },

          signIn: {
            continueToLibra: 'Continue to Libra',
            continueWithWallet: ' Continue with wallet',
            newToLibra: 'New to Libra?',
            tryNow: 'Try now',
            login: 'Login',
            logout: 'Log Out',
            selectAnAccount: 'Select an account',
          },

          onboarding: {
            connectWallet: 'Connect wallet',
            creatingCheckoutPage: 'Creating your checkout page...',
            congratulation: 'Congratulation! Your checkout page is ready now!',
            useUrl: 'Please use the url bellow to start selling your product.',
          },

          payment: {
            hasCheckoutSubtitle:
              'To accept payments from your customers, you need to share your checkout link with your customers first.',
            hasNoCheckoutSubtitle: 'To accept payments from your customers, you need to create a checkout first.',
            getCheckoutLinks: 'Get checkout links',
            paymentWillShowHere: 'Your received payments will show here',
          },

          checkout: {
            createCheckout: 'Create checkout',
            startSellingProduct: 'Start selling your product',
            toStartSellingProduct:
              'To start selling your product, first you need to create checkout page to receive payments from customers.',
            newCheckout: 'New checkout',
            product: 'Product',
            branding: 'Branding',
            afterPayment: 'After Payment',
            preview: 'Preview',
            leavingPageWarningTitle: 'Leave page with unsaved changes?',
            leavingPageWarningContent: 'Leaving this page will delete all unsaved changes.',
            confirmLeavingPage: 'Leave Page',
            stay: 'Stay',

            redirectUrlLabel: 'Redirect URL',
            redirectUrlPlaceholder: 'Your website URL',
            invalidUrl: 'Invalid URL',

            brandNameIsRequired: 'Brand name is required!',
            brandNamePlaceholderOnboading: 'Eg. John Brand, Libra, ...',
            brandNamePlaceholder: 'Name of your brand',
            brandNameLabelOnboading: 'What is your brand name',
            brandNameLabel: 'Name',
            pricePlaceholderOnboading: 'Eg. 1 DOT, 10 USDT, ...',
            pricePlaceholder: 'Price of your product or service',
            brandLogo: 'Brand logo',
            productPriceIsRequired: 'Product price is required!',
            productPriceMustBeNumber: 'Product price must be a number!',
            productNameLabelOnboading: 'What product do you want to sell?',
            productNameLabel: 'Name',
            productNamePlaceholderOnboading: 'Eg. Meditation course, a book, ...',
            productNamePlaceholder: 'Name of your product or service',
            productNameIsRequired: 'Product name is required!',
            whatIsPrice: 'What is price of your product?',
            productImage: 'Product image',
            description: 'Description',
            descriptionPlaceholder: 'Description about your product or service',
            asset: 'Asset',
            greatJob: `Great job! You're almost done.`,
            toCreateCheckoutLink: `To create your checkout link, please connect your wallet as sign up your Libra account. This will allow you to
            access all the features and benefits of our platform.`,
            contactInformation: 'Contact information',
            paymentMethod: 'Payment method',
            pay: 'Pay',
            checkoutCreatedSuccessfully: 'Checkout Created Successfully',
            checkoutUpdatedSuccessfully: 'Checkout Updated Successfully',
          },

          footer: {
            poweredBy: 'Powered by',
            libraLogo: 'Libra Logo',
            privacy: 'Privacy',
            terms: 'Terms',
          },
        },
      },
    },
  });

export default i18n;
