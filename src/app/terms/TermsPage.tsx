import { content } from '@/config/content'
import { PROSE_CLASSES } from '@/lib/prose'
import { DocumentContact } from '@/components/pad/DocumentContact'
import { MarginIndex } from '@/components/pad/MarginIndex'
import { SectionTabs } from '@/components/pad/SectionTabs'

const sections = [
  {
    id: 'terms',
    title: content.terms.sections.terms,
    content: `
      <h3>1. קבלת התנאים</h3>
      <p>
        השימוש באתר itayost.com מהווה הסכמה מלאה לתנאי השימוש המפורטים כאן.
        אם אינך מסכים לתנאים אלה, נא להימנע משימוש באתר.
      </p>

      <h3>2. שירותים</h3>
      <p>
        ITAYOST מספקת שירותי פיתוח תוכנה, עיצוב ויעוץ טכנולוגי. כל השירותים ניתנים
        על בסיס "כפי שהם" (AS IS) ואנו שומרים על הזכות לשנות או להפסיק שירותים בכל עת.
      </p>

      <h3>3. זכויות יוצרים</h3>
      <p>
        כל התוכן באתר, לרבות טקסט, גרפיקה, לוגו, קוד ועיצוב, מוגן בזכויות יוצרים
        השייכות ל-ITAYOST. אין להעתיק, לשכפל או להפיץ תוכן כלשהו ללא אישור בכתב.
      </p>

      <h3>4. הגבלת אחריות</h3>
      <p>
        ITAYOST לא תהיה אחראית לכל נזק ישיר או עקיף הנובע משימוש באתר או בשירותים,
        לרבות אובדן רווחים, נתונים או הזדמנויות עסקיות.
      </p>

      <h3>5. שינויים בתנאים</h3>
      <p>
        אנו שומרים על הזכות לעדכן תנאים אלה בכל עת. שינויים יכנסו לתוקף מיד עם
        פרסומם באתר. המשך שימוש באתר לאחר שינויים מהווה הסכמה לתנאים המעודכנים.
      </p>
    `,
  },
  {
    id: 'privacy',
    title: content.terms.sections.privacy,
    content: `
      <p>
        מדיניות הפרטיות המלאה היא המסמך הקובע בכל מה שנוגע לאיסוף מידע, שימוש בו,
        שיתופו, אבטחתו וזכויותיכם לגביו. כדי שלא יהיו שתי גרסאות שונות, הפרטים
        מופיעים במסמך אחד בלבד.
      </p>
      <p>
        <a href="/privacy-policy">קראו את מדיניות הפרטיות המלאה</a>
      </p>
    `,
  },
  {
    id: 'cookies',
    title: content.terms.sections.cookies,
    content: `
      <p>
        השימוש ב-Cookies באתר מתואר במלואו בסעיף העוגיות של מדיניות הפרטיות, יחד עם
        האפשרויות שלכם לנהל או לחסום אותן.
      </p>
      <p>
        <a href="/privacy-policy#cookies">קראו על השימוש ב-Cookies</a>
      </p>
    `,
  },
  {
    id: 'copyright',
    title: content.terms.sections.copyright,
    content: `
      <h3>1. בעלות על תוכן</h3>
      <p>
        כל התוכן באתר itayost.com, לרבות אך לא רק טקסט, עיצוב גרפי, לוגואים,
        תמונות, קוד ותוכנה, הוא רכושה הבלעדי של ITAYOST ומוגן על ידי חוקי זכויות
        יוצרים ישראליים ובינלאומיים.
      </p>

      <h3>2. שימוש מותר</h3>
      <p>
        אתם רשאים לצפות ולהדפיס תוכן מהאתר לשימוש אישי בלבד. כל שימוש מסחרי, העתקה,
        שכפול, הפצה או שידור של תוכן כלשהו מהאתר אסורים ללא אישור בכתב מראש.
      </p>

      <h3>3. סימני מסחר</h3>
      <p>
        "ITAYOST" והלוגו שלנו הם סימני מסחר רשומים. אין להשתמש בהם ללא אישור מפורש
        בכתב.
      </p>

      <h3>4. תוכן של משתמשים</h3>
      <p>
        כל תוכן שאתם מעלים או משתפים דרך האתר (כגון הודעות בטפסי יצירת קשר) נשאר
        בבעלותכם, אך אתם מעניקים לנו רישיון להשתמש בו לצורך מתן השירות.
      </p>

      <h3>5. הפרות</h3>
      <p>
        הפרה של זכויות היוצרים שלנו עלולה לגרור צעדים משפטיים. אם אתם סבורים שתוכן
        באתר מפר את זכויות היוצרים שלכם, צרו איתנו קשר מיד.
      </p>
    `,
  },
]

export default function TermsPage() {
  return (
    <div className="pad-world">
      <section aria-labelledby="terms-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-36">
          <h1
            id="terms-heading"
            className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
          >
            {content.terms.title}
            <span className="block text-pad-yellow">{content.terms.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
            {content.terms.description}
          </p>
          <p className="mt-6 border-t border-pad-carbon-ink/30 pt-4 text-pad-carbon-ink">
            {content.terms.lastUpdated}: ספטמבר 2026
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
        heading="שאלה על התנאים?"
        note="אם משהו במסמך לא ברור, אשמח להסביר בדיוק למה הוא שם ומה הוא אומר בפועל."
        whatsAppMessage="היי, יש לי שאלה על תנאי השימוש"
        source="terms"
      />
    </div>
  )
}
