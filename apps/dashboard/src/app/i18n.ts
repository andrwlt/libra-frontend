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
          create: 'Create',
          dashboard: 'Dashboard',
          back: 'Back',
          next: 'Next',
          save: 'Save',
          logo: 'Logo',
          defaultErrorMessage: 'Something went wrong!',
          getExtensionsFailed: 'Get Extensions Failed',
          payments: 'Payments',
          checkoutLabel: 'Checkout',
          copied: 'Copied',
          copy: 'Copy',
          orShareItOn: 'or share it on',
          loading: 'Loading...',
          sessionExpired: 'Session is expired. Please login again!',
          checkouts: 'Checkouts',
          developers: 'Developers',
          webhooks: 'Webhooks',
          apiKeys: 'API Keys',
          cancel: 'Cancel',
          description: 'Description',
          helpCenter: 'Help Center',
          whatNew: 'What’s New',
          disable: 'Disable',
          enable: 'Enable',
          edit: 'Edit',
          delete: 'Delete',
          update: 'Update',
          reveal: 'Reveal',
          hide: 'Hide',
          close: 'Close',

          auth: {
            needCreatePolkadotAccount:
              'You need a Polkadot account to sign up and start using Libra. Please open the extension and create one.',
          },

          message: {
            leavingPageWarningTitle: 'Leave page with unsaved changes?',
            leavingPageWarningContent: 'Leaving this page will delete all unsaved changes.',
            confirmLeavingPage: 'Leave Page',
            stay: 'Stay',
          },

          paging: {
            previous: 'Previous',
            next: 'Next',
          },

          webhook: {
            create: 'Create Webhook',
            update: 'Update Webhook',
            listen: 'Listen to Libra events',
            endpointUrl: 'Endpoint URL',
            selectEventsTitle: 'Select Events to listen to',
            selectEvents: 'Select events',
            selectEventToSend: 'Select events to send',
            selectAllEvents: 'Select all events',
            chargeCreated: 'Charge created',
            chargeSucceeded: 'Charge succeeded',
            chargeFailed: 'Charge failed',
            form: {
              descriptionPlaceholder: 'An optional description of what this webhook is used for',
              eventsAreRequired: 'Please select events to listen to',
              invalidUrl: 'Invalid URL: An explicit scheme (such as https) must be provided',
            },

            webhookCreatedSuccessfully: 'Webhook Created Successfully',
            webhookUpdatedSuccessfully: 'Webhook Updated Successfully',
            webhookDeletedSuccessfully: 'Webhook Deleted Successfully',
            webhookDisabledSuccessfully: 'Webhook Disabled Successfully',
            webhookEnabledSuccessfully: 'Webhook Enabled Successfully',
            deleteWebhookWarning: 'Are you sure to delete this webhook?',
            disableWebhookWarning: 'Are you sure to disable this webhook?',
            enableWebhookWarning: 'Are you sure to enable this webhook?',
          },

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
            succeeded: 'Succeeded',
            pending: 'Pending',
            failed: 'Failed',
            allStatus: 'All',
            noPaymentHasCheckoutTitle: `It's happening…`,
            noPaymentHasCheckoutSubTitle: 'Promote your checkout and start earning your first {{asset}}.',
          },

          checkout: {
            createCheckout: 'Create checkout',
            updateCheckout: 'Update Checkout',
            newCheckout: 'Create a new checkout',
            product: 'Product',
            branding: 'Branding',
            afterPayment: 'After Payment',
            preview: 'Preview',

            redirectUrlLabel: 'Redirect customers to your website.',
            redirectUrlPlaceholder: 'Your website URL',
            invalidUrl: 'Invalid URL',

            brandNameIsRequired: 'Brand name is required!',
            brandNamePlaceholderOnboarding: 'Eg. John Brand, Libra, ...',
            brandNamePlaceholder: 'Name of your brand',
            brandNameLabelOnboarding: 'What is your brand name',
            brandNameLabel: 'Name',
            pricePlaceholderOnboarding: 'Eg. 1 DOT, 10 USDT, ...',
            pricePlaceholder: 'Price of your product or service',
            brandLogo: 'Brand logo',
            productPriceIsRequired: 'Product price is required!',
            productPriceMustBeNumber: 'Product price must be a number!',
            productNameLabelOnboarding: 'What product do you want to sell?',
            productNameLabel: 'Name',
            productNamePlaceholderOnboarding: 'Eg. Meditation course, a book, ...',
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
            checkoutDeletedSuccessfully: 'Checkout Deleted Successfully',
            deleteCheckoutWarning: 'Are you sure to delete this checkout?',
            emptyTitle: 'Launching your crypto business has never been simpler',
            emptyText:
              'Checkout allows you to sell your digital products within minutes and receive payments directly to your wallet.',
            createCheckoutNow: 'Create checkout now',
            showConfirmationPage: 'Show confirmation page',
            notShowConfirmationPage: `Don't Show confirmation page`,
            replaceDefaultMess: 'Replace default with custom message',
            thankForYourPayment: 'Thanks for your payment',
            orderWillBeSent: 'An order summary will be sent to your email within minutes',
            websiteWillBeShow: 'Your website will be shown after payment',
          },

          footer: {
            poweredBy: 'Powered by',
            libraLogo: 'Libra Logo',
            privacy: 'Privacy',
            terms: 'Terms',
          },

          imageUploader: {
            fileTypeWarning: 'You can only upload SVG/PNG/JPG file!',
            fileSizeWarning: 'Image must smaller than 2MB!',
          },

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
