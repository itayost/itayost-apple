// Contact page copy for the Carbon Order Pad design.
// Wording is carried over from the previous contact page; the availability
// date and the warranty / payment FAQ answers were removed on 2026-09-17
// until they are confirmed. The coffee and social blocks moved out: the footer
// already carries the social links.

export const contactPage = {
  formNumber: '0155',
  title: ['בואו נדבר', 'על העסק שלכם'],
  subtitle: 'ספרו לי על העסק ומה הייתם רוצים לשפר, ואני אחזור אליכם תוך שעה עם רעיונות.',
  replyStamp: 'מענה תוך שעה',
  replyNote: 'חוזר אליכם תוך שעה בימי עבודה.',
  channelsTitle: 'או ישר אליי',
  whatsappMessage: 'היי, אשמח לתאם שיחה על פרויקט',
  channels: {
    whatsapp: { label: 'וואטסאפ', value: 'כתבו לי בוואטסאפ' },
    phone: { label: 'טלפון', value: '054-499-4417' },
    email: { label: 'אימייל', value: 'itay@itayost.com' },
  },

  form: {
    sheetTitle: 'טופס פנייה',
    heading: 'ספרו לי איך אני יכול לעזור',
    nameLabel: 'שם מלא',
    namePlaceholder: 'ישראל ישראלי',
    phoneLabel: 'טלפון',
    phonePlaceholder: '050-1234567',
    required: 'שדה חובה',
    submit: 'שלח הודעה',
    submitting: 'שולח...',
    errors: {
      nameMissing: 'נא להזין שם מלא',
      phoneMissing: 'נא להזין מספר טלפון',
      phoneInvalid: 'מספר טלפון לא תקין',
      submitFailed: 'שגיאה בשליחת הטופס',
      network: 'שגיאה בשליחת הטופס. אנא נסו שוב.',
    },
  },

  receipt: {
    label: 'העתק לקוח',
    stamp: 'התקבל',
    message: 'תודה על הפנייה! אחזור אליכם תוך שעה בימי עבודה.',
    nameLabel: 'שם',
    phoneLabel: 'טלפון',
  },

  details: {
    hoursTitle: 'שעות פעילות',
    hours: [
      { days: 'ראשון - חמישי', time: '09:00 - 21:00' },
      { days: 'שישי', time: '09:00 - 13:00' },
      { days: 'שבת', time: 'סגור' },
    ],
  },

  faqTitle: 'שאלות נפוצות',
  faq: [
    {
      q: 'כמה זמן לוקח לפתח אתר?',
      a: 'זמן הפיתוח תלוי במורכבות הפרויקט. אתר תדמית פשוט: 2-4 שבועות, אתר מסחר אלקטרוני: 6-8 שבועות, מערכת מורכבת: 2-6 חודשים.',
    },
    {
      q: 'איפה אתה נמצא?',
      a: 'אני נמצא באזור תל אביב, אבל עובד עם לקוחות מכל הארץ. ניתן לקיים פגישות פיזיות או וירטואליות.',
    },
  ],
} as const
