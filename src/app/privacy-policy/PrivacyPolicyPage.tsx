import { content } from '@/config/content'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'
import { PROSE_CLASSES } from '@/lib/prose'
import { DocumentContact } from '@/components/pad/DocumentContact'
import { MarginIndex } from '@/components/pad/MarginIndex'
import { SectionTabs } from '@/components/pad/SectionTabs'

const sections = [
  {
    id: 'collection',
    title: content.privacyPolicy.sections.collection,
    content: `
      <h3>1. איזה מידע אנו אוספים?</h3>
      <p>
        אנו אוספים מידע שאתם מספקים לנו בצורה פעילה, כולל:
      </p>
      <ul>
        <li><strong>פרטים אישיים:</strong> שם מלא, כתובת אימייל, מספר טלפון</li>
        <li><strong>פרטי פרויקט:</strong> תיאור הפרויקט, דרישות טכניות, תקציב משוער</li>
        <li><strong>פרטי חברה:</strong> שם החברה, תחום העיסוק, אתר אינטרנט</li>
        <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, נתוני גלישה</li>
      </ul>

      <h3>2. כיצד אנו אוספים מידע?</h3>
      <ul>
        <li>טפסי יצירת קשר ובקשות הצעת מחיר באתר</li>
        <li>תקשורת בדואר אלקטרוני, WhatsApp או טלפון</li>
        <li>Google Analytics לצורך ניתוח תעבורת האתר</li>
        <li>Cookies ועוגיות גלישה</li>
      </ul>

      <h3>3. מידע שאנו לא אוספים</h3>
      <p>
        אנו <strong>לא</strong> אוספים:
      </p>
      <ul>
        <li>פרטי כרטיסי אשראי או מידע פיננסי רגיש</li>
        <li>מספרי תעודת זהות או דרכון</li>
        <li>מידע רפואי או מידע רגיש אחר</li>
        <li>מידע על קטינים מתחת לגיל 18</li>
      </ul>
    `,
  },
  {
    id: 'usage',
    title: content.privacyPolicy.sections.usage,
    content: `
      <h3>1. שימוש במידע לצורך מתן שירות</h3>
      <p>
        אנו משתמשים במידע שנאסף כדי:
      </p>
      <ul>
        <li>לספק את השירותים המבוקשים (פיתוח, עיצוב, ייעוץ)</li>
        <li>לתקשר איתכם בנוגע לפרויקטים ושאלות טכניות</li>
        <li>לשלוח הצעות מחיר ומסמכי עבודה</li>
        <li>לנהל חשבונות ופרויקטים בצורה יעילה</li>
      </ul>

      <h3>2. שיפור השירות וחווית המשתמש</h3>
      <ul>
        <li>ניתוח נתוני שימוש באתר להבנת צרכי המשתמשים</li>
        <li>אופטימיזציה של ביצועי האתר ותפקודו</li>
        <li>זיהוי ותיקון תקלות טכניות</li>
        <li>פיתוח תכונות וכלים חדשים</li>
      </ul>

      <h3>3. תקשורת שיווקית (באישורכם בלבד)</h3>
      <ul>
        <li>עדכונים על שירותים חדשים ומבצעים מיוחדים</li>
        <li>טיפים ומאמרים בנושאי פיתוח וטכנולוגיה</li>
        <li>הזמנות לאירועים ווורקשופים</li>
      </ul>
      <p>
        <strong>חשוב:</strong> ניתן להסיר את עצמכם מרשימת התפוצה השיווקית בכל עת באמצעות
        קישור "הסרה מרשימת תפוצה" בכל דואר אלקטרוני.
      </p>

      <h3>4. חובות משפטיות</h3>
      <p>
        במקרים נדירים, אנו עשויים להשתמש במידע כדי לעמוד בחובות חוקיות, למנוע הונאה או
        להגן על זכויותינו המשפטיות.
      </p>
    `,
  },
  {
    id: 'sharing',
    title: content.privacyPolicy.sections.sharing,
    content: `
      <h3>1. מדיניות אי-שיתוף</h3>
      <p>
        <strong>אנו לא מוכרים או משכירים את המידע האישי שלכם לצדדים שלישיים - לעולם.</strong>
      </p>
      <p>
        הפרטיות שלכם היא בראש סדר העדיפויות שלנו, ואנו מתחייבים לא לחשוף, למכור או
        לשתף את המידע שלכם למטרות מסחריות.
      </p>

      <h3>2. מקרים בהם אנו עשויים לשתף מידע</h3>
      <p>
        אנו עשויים לשתף מידע רק במקרים הבאים:
      </p>
      <ul>
        <li><strong>ספקי שירות:</strong> אחסון ענן (Vercel, AWS), כלי אנליטיקס (Google Analytics),
        מערכות דואר אלקטרוני - כל הספקים חתומים על הסכמי סודיות</li>
        <li><strong>דרישות חוקיות:</strong> כאשר נדרש על פי חוק, צו שיפוטי או רשות ממשלתית</li>
        <li><strong>הגנה משפטית:</strong> כדי להגן על זכויותינו, רכושנו או ביטחון המשתמשים</li>
        <li><strong>באישורכם המפורש:</strong> כאשר אתם מבקשים מאיתנו לשתף מידע עם צד שלישי ספציפי</li>
      </ul>

      <h3>3. ספקי שירות מהימנים</h3>
      <p>
        הספקים איתם אנו עובדים:
      </p>
      <ul>
        <li><strong>Vercel:</strong> אחסון ו-hosting של האתר (תקני אבטחה SOC 2)</li>
        <li><strong>Google Analytics:</strong> ניתוח תעבורה אנונימי (עומד בתקני GDPR)</li>
        <li><strong>Google Workspace:</strong> דואר אלקטרוני ושירותי ענן</li>
      </ul>

      <h3>4. העברת מידע בינלאומית</h3>
      <p>
        חלק מהשרתים ושירותי הענן שלנו ממוקמים בארצות הברית ובאירופה. אנו מוודאים שכל
        העברת מידע בינלאומית עומדת בתקני הגנת הפרטיות הבינלאומיים (GDPR, Privacy Shield).
      </p>
    `,
  },
  {
    id: 'security',
    title: content.privacyPolicy.sections.security,
    content: `
      <h3>1. אמצעי אבטחה טכניים</h3>
      <ul>
        <li><strong>הצפנת SSL/TLS:</strong> כל התקשורת עם האתר מוצפנת (HTTPS)</li>
        <li><strong>הצפנת נתונים:</strong> מסדי נתונים מוצפנים במנוחה ובתנועה</li>
        <li><strong>גישה מוגבלת:</strong> ItayOst הוא עסק של אדם אחד. הגישה למידע היא שלי בלבד, ולספקי התשתית שמפורטים בסעיף שיתוף מידע</li>
        <li><strong>אימות דו-שלבי:</strong> מופעל בחשבונות הניהול והתשתית שתומכים בו</li>
        <li><strong>סיסמאות:</strong> סיסמאות ייחודיות המנוהלות במנהל סיסמאות</li>
      </ul>

      <h3>2. אמצעי אבטחה ארגוניים</h3>
      <p>
        אין לי עובדים ואין צוות נוסף שנחשף למידע שלכם. כאשר פרויקט מחייב שיתוף של
        קבלן משנה, זה נעשה רק בידיעתכם ומול התחייבות לסודיות.
      </p>

      <h3>3. גיבויים</h3>
      <ul>
        <li>גיבויים מנוהלים בידי ספקי התשתית (Vercel, Supabase) לפי מדיניות הגיבוי שלהם</li>
        <li>הנתונים מוצפנים במנוחה ובתנועה אצל הספקים</li>
      </ul>

      <h3>4. הגבלות והתראות</h3>
      <p>
        למרות שאנו נוקטים באמצעי אבטחה מתקדמים, <strong>אין אבטחה מושלמת באינטרנט</strong>.
        אנו ממליצים גם לכם לנקוט באמצעי זהירות:
      </p>
      <ul>
        <li>השתמשו בסיסמאות חזקות וייחודיות</li>
        <li>אל תשתפו פרטי התחברות עם אחרים</li>
        <li>התנתקו מחשבונות לאחר השימוש במחשבים ציבוריים</li>
        <li>היו ערניים להודעות דיוג (Phishing)</li>
      </ul>

      <h3>5. דיווח על פרצות אבטחה</h3>
      <p>
        במקרה של חשש לפריצת אבטחה או פרצת מידע, אנו מתחייבים:
      </p>
      <ul>
        <li>לחקור את האירוע ללא דיחוי</li>
        <li>להודיע למשתמשים המושפעים בהקדם האפשרי לאחר שהאירוע מתברר</li>
        <li>לנקוט בצעדים מתקנים לסגירת הפרצה</li>
        <li>לדווח לרשויות הרלוונטיות במידת הצורך ולפי הדין</li>
      </ul>
    `,
  },
  {
    id: 'rights',
    title: content.privacyPolicy.sections.rights,
    content: `
      <h3>1. זכות לגישה</h3>
      <p>
        יש לכם זכות לדעת אילו פרטים אישיים אנו מחזיקים עליכם. אתם יכולים לבקש עותק של
        המידע האישי שלכם בכל עת.
      </p>

      <h3>2. זכות לתיקון</h3>
      <p>
        אם המידע שלכם אינו מדויק או לא שלם, אתם יכולים לבקש לתקן או לעדכן אותו. אנחנו
        נפעל לעדכן את המידע בהקדם האפשרי, ולכל היותר בתוך פרק הזמן הקבוע בדין.
      </p>

      <h3>3. זכות למחיקה (Right to be Forgotten)</h3>
      <p>
        אתם יכולים לבקש למחוק את המידע האישי שלכם מהמערכות שלנו. אנו נמחק את המידע תוך
        30 יום, למעט במקרים בהם אנו נדרשים לשמר אותו על פי חוק.
      </p>
      <p>
        <strong>חריגים:</strong> מידע הנדרש לצורכי חשבונאות, מסמכים משפטיים, או הסכמים
        חוזיים עשוי להישמר לתקופה הנדרשת בחוק.
      </p>

      <h3>4. זכות להתנגד</h3>
      <ul>
        <li>אתם יכולים להתנגד לשימוש במידע שלכם למטרות שיווקיות בכל עת</li>
        <li>אתם יכולים לבטל את ההסכמה לקבלת ניוזלטר ועדכונים</li>
        <li>אתם יכולים לחסום Cookies דרך הדפדפן שלכם</li>
      </ul>

      <h3>5. זכות לניידות</h3>
      <p>
        אתם יכולים לבקש להעביר את המידע שלכם לספק שירות אחר. נספק לכם את הנתונים
        בפורמט מובנה ונפוץ (JSON, CSV).
      </p>

      <h3>6. זכות להגבלת עיבוד</h3>
      <p>
        במקרים מסוימים, אתם יכולים לבקש להגביל את השימוש במידע שלכם, למשל במהלך
        בדיקת דיוק הנתונים.
      </p>

      <h3>7. איך להפעיל את הזכויות שלכם?</h3>
      <p>
        כדי להפעיל כל אחת מהזכויות לעיל, פנו אלינו באחת מהדרכים הבאות:
      </p>
      <ul>
        <li><strong>אימייל:</strong> itay@itayost.com</li>
        <li><strong>טלפון:</strong> 054-499-4417</li>
        <li><strong>WhatsApp:</strong> 054-499-4417</li>
      </ul>
      <p>
        אנו מתחייבים להגיב לבקשות בתוך פרק הזמן הקבוע בדין, ולהשלים את הפעולה
        המבוקשת תוך <strong>30 יום</strong>.
      </p>
    `,
  },
  {
    id: 'cookies',
    title: content.privacyPolicy.sections.cookies,
    content: `
      <h3>1. מה הם Cookies?</h3>
      <p>
        Cookies (עוגיות) הם קבצי טקסט קטנים המאוחסנים במכשיר שלכם בעת גלישה באתר. הם
        מאפשרים לאתר "לזכור" את פעולותיכם והעדפותיכם לאורך זמן.
      </p>

      <h3>2. סוגי Cookies שאנו משתמשים בהם</h3>

      <h4>Cookies הכרחיים</h4>
      <p>
        נדרשים לתפקוד בסיסי של האתר. אי אפשר להשבית אותם מבלי לפגוע בחוויית השימוש.
      </p>
      <ul>
        <li>זכירת העדפות שפה ונגישות</li>
        <li>שמירה על אבטחת הגלישה</li>
        <li>זיהוי משתמשים מחוברים</li>
      </ul>

      <h4>Cookies אנליטיים (Google Analytics)</h4>
      <p>
        עוזרים לנו להבין איך משתמשים באתר ומאפשרים לנו לשפר אותו.
      </p>
      <ul>
        <li>מספר מבקרים ודפי צפייה</li>
        <li>זמן שהייה ודפדוף באתר</li>
        <li>מקור התנועה (גוגל, פייסבוק, ישיר)</li>
        <li><strong>כל הנתונים אנונימיים</strong> - אנו לא מזהים משתמשים ספציפיים</li>
      </ul>

      <h4>Cookies פונקציונליים</h4>
      <ul>
        <li>זכירת העדפות עיצוב (למשל: מצב כהה/בהיר)</li>
        <li>מילוי טפסים אוטומטי</li>
        <li>שמירת פריטים בעגלת קניות</li>
      </ul>

      <h3>3. Cookies של צדדים שלישיים</h3>
      <p>
        אנו משתמשים בשירותים חיצוניים שעשויים להציב Cookies משלהם:
      </p>
      <ul>
        <li><strong>Google Analytics:</strong> ניתוח תעבורה ושיפור האתר</li>
        <li><strong>Google Fonts:</strong> טעינת גופנים (לא אוסף נתונים אישיים)</li>
      </ul>

      <h3>4. כיצד לנהל Cookies?</h3>
      <p>
        אתם יכולים לשלוט ב-Cookies דרך הדפדפן שלכם:
      </p>
      <ul>
        <li><strong>Chrome:</strong> הגדרות → פרטיות ואבטחה → Cookies ונתוני אתרים אחרים</li>
        <li><strong>Firefox:</strong> אפשרויות → פרטיות ואבטחה → Cookies ונתוני אתרים</li>
        <li><strong>Safari:</strong> העדפות → פרטיות → ניהול נתוני אתרים</li>
        <li><strong>Edge:</strong> הגדרות → קוקיז והרשאות אתרים</li>
      </ul>
      <p>
        <strong>שימו לב:</strong> חסימת Cookies מסוימים עלולה להשפיע על תפקוד האתר ועל
        חוויית השימוש שלכם.
      </p>

      <h3>5. משך זמן שמירת Cookies</h3>
      <ul>
        <li><strong>Cookies session:</strong> נמחקים בסגירת הדפדפן</li>
        <li><strong>Cookies קבועים:</strong> נשמרים עד 2 שנים (תלוי בסוג)</li>
      </ul>
    `,
  },
  {
    id: 'contact',
    title: content.privacyPolicy.sections.contact,
    content: `
      <h3>1. שאלות על מדיניות הפרטיות</h3>
      <p>
        אם יש לכם שאלות, הבהרות או חששות לגבי מדיניות הפרטיות שלנו, אנחנו כאן לעזור.
      </p>

      <h3>2. דרכי יצירת קשר</h3>
      <div>
        <ul>
          <li>
            <span>אימייל:</span>
            <a href="mailto:itay@itayost.com">
              itay@itayost.com
            </a>
          </li>
          <li>
            <span>טלפון:</span>
            <a href="${PHONE_TEL_HREF}">
              054-499-4417
            </a>
          </li>
          <li>
            <span>WhatsApp:</span>
            <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer">
              054-499-4417
            </a>
          </li>
          <li>
            <span>כתובת:</span>
            <span>רמת גן, ישראל</span>
          </li>
        </ul>
      </div>

      <h3>3. זמני תגובה</h3>
      <ul>
        <li>פניות רגילות - בדרך כלל תוך יום או שניים</li>
        <li>בקשות למימוש זכויות (מחיקה, גישה, תיקון) - בתוך פרק הזמן הקבוע בדין</li>
        <li>תקלות אבטחה - טיפול ללא דיחוי</li>
      </ul>

      <h3>4. תלונות לרשויות</h3>
      <p>
        אם אינכם מרוצים מהטיפול שלנו בנושאי פרטיות, יש לכם זכות להגיש תלונה לרשות
        להגנת הפרטיות בישראל:
      </p>
      <div>
        <p><strong>רשות להגנת הפרטיות</strong></p>
        <p>אתר: <a href="https://www.gov.il/he/departments/the_privacy_protection_authority" target="_blank" rel="noopener noreferrer">www.gov.il/privacy</a></p>
        <p>טלפון: 02-6467000</p>
        <p>דואר: 2 רחוב קפלן, ירושלים</p>
      </div>

      <h3>5. עדכונים למדיניות הפרטיות</h3>
      <p>
        אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. שינויים משמעותיים יפורסמו
        באתר ונשלח הודעה למשתמשים רשומים.
      </p>
      <p>
        <strong>עדכון אחרון:</strong> ספטמבר 2026
      </p>
    `,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="pad-world">
      <section aria-labelledby="privacy-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-36">
          <h1
            id="privacy-heading"
            className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
          >
            {content.privacyPolicy.title}
            <span className="block text-pad-yellow">{content.privacyPolicy.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
            {content.privacyPolicy.description}
          </p>
          <p className="mt-6 border-t border-pad-carbon-ink/30 pt-4 text-pad-carbon-ink">
            {content.privacyPolicy.lastUpdated}: ספטמבר 2026
          </p>
        </div>
      </section>

      <SectionTabs
        ariaLabel="סעיפי המסמך"
        className="lg:hidden"
        tabs={sections.map((section) => ({ id: section.id, label: section.title }))}
      />

      {/* The document on the pad: body on the rules, index pinned in the margin */}
      <div className="pad-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[17rem_minmax(0,36rem)] lg:gap-x-14 lg:py-20">
          <article className="relative min-w-0 lg:col-start-2">
            <span aria-hidden="true" className="absolute inset-y-0 -start-6 hidden w-px bg-pad-red/50 lg:block" />
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-label={section.title}
                className="mb-16 scroll-mt-32 last:mb-0"
              >
                <h2 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-4xl font-bold leading-none text-pad-ink lg:text-5xl">
                  {section.title}
                </h2>
                <div className={`mt-6 ${PROSE_CLASSES}`} dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </article>

          <aside className="hidden lg:col-start-1 lg:row-start-1 lg:block">
            <MarginIndex
              title="סעיפי המסמך"
              items={sections.map((section) => ({ id: section.id, title: section.title }))}
            />
          </aside>
        </div>
      </div>

      <DocumentContact
        heading="שאלה על המידע שלכם?"
        note="כל בקשה לגישה, תיקון או מחיקה של מידע מטופלת על ידי ישירות. כתבו לי ואחזור אליכם."
        whatsAppMessage="היי, יש לי שאלה על מדיניות הפרטיות"
        source="privacy_policy"
      />
    </div>
  )
}
