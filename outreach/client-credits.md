# Client Credits: natural mentions on client sites

**Backlinks review, 2026-11-18.** Client sites are the most relevant links ITAYOST can get, and the cheapest: the relationship already exists. Google's link spam policy lists "widely distributed links in the footers or templates of various sites" and keyword-rich anchor text as link schemes ([Google Search Central: spam policies](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)), so every credit below is a plain designer attribution, not a ranking play.

Itay sends every message. Nothing is added to a client site without a yes.

## Rules

1. **Brand anchor only:** "ITAYOST" or "איתי אוסטרייך". Never a keyword anchor such as "בניית אתרים" or "מערכות CRM".
2. **One credit per site.** A footer line is fine as an attribution. If the site has an "אודות" or credits page, a single mention there reads more naturally.
3. **No `rel="dofollow"`.** It is not a real attribute value (the previous kit had it). Leave `rel` off. If the client asks for `nofollow`, accept it.
4. **Never a condition** of a project, a price or a discount. Ask after delivery and accept a no.
5. **It's an exchange:** each client already has a portfolio page on itayost.com that links to their site. Say so in the ask.

## Snippets

Footer (one line):

```html
עוצב ופותח על ידי <a href="https://www.itayost.com">ITAYOST</a>
```

About or credits page:

```html
<p>האתר עוצב ופותח על ידי <a href="https://www.itayost.com">איתי אוסטרייך (ITAYOST)</a>.</p>
```

## Status (updated 2026-11-25)

Every client site found in the three Vercel teams was checked. On 2026-11-25 a centered "עוצב ופותח על ידי ITAYOST" line linking to `https://www.itayost.com` (`rel="noopener"`, no `nofollow`, no `noreferrer`) was merged into each site that lacked one, and each live footer was checked after deploy.

| Client | Live site | Credit | Status |
|---|---|---|---|
| טל נדל"ן | tanadlan.com | New line; copyright fixed to טל אזולאי | Live |
| Shepes Group | shepes-group.co.il | New line; copyright fixed to Shepes Group | Live |
| Garden of Eden | edengarden.co.il | New line | Live |
| כמה נגמר? | kama-nigmar.co.il | New line, replaced the unlinked "נבנה על ידי ItayOst" | Live |
| מזון ייעוץ מס | mta.co.il | New line | Live |
| CELLFIX | cellfix.co.il | New line | Live |
| איתי זיו | itai-ziv.co.il | New line | Live |
| המבריקן | hamavrikan.co.il | New line merged | **Not live**: the domain is attached to a different Vercel project, see notes |
| El Caballero | elcaballero.co.il | New line | Live |
| ירין מנוח | yarinmanoah.com | New line (home page; /privacy has no footer) | Live |
| פעילים + | peilimplus.co.il | New line | Live |
| המרכז לשיפור התנועה | improve-movement.co.il | New line, replaced the old "בנייה ועיצוב: ItayOst" link | Live |
| מסוב תרבות | mesobtarbut.com | New line | Live |
| Invoxa | invoxa.co.il | New line | Live |
| Nexora AI (Itay's own product) | nexoraai.co.il | New line | Live |
| The Fader Academy | thefader.co.il | Existing: "עוצב ופותח על ידי ItayOst" to `https://itayost.com` | Live, older format |
| Lola Martin | lolamartin.co.il | Existing: "נבנה על ידי ItayOst" to `https://www.itayost.com/` | Live, older format |
| FutureKids | kidcode.org.il | Existing: "בנייה ועיצוב: ItayOst" to `https://itayost.com` | Live, older format |
| נס התמר | neshatamar.com | Existing: "נבנה על ידי ItayOst" to `https://itayost.com` | Live, older format |
| ג'קו | jacko.co.il | Existing: "נבנה עם ♥ על ידי ItayOst" to `https://ItayOst.com`, no `rel` | Live, older format |
| PAZ CAPITAL | paz-capital.co.il | Existing: "נבנה ועוצב עם ♥ על ידי itayost" to `https://itayost.com` | Live, older format |

Notes:
- **hamavrikan.co.il is served by a different Vercel project** than `hamavrikan-website`, so merges to that repo do not reach the live domain (the new footer is on `hamavrikan-website.vercel.app`). To move the domain to this project, Vercel asks for these TXT records at `_vercel.hamavrikan.co.il`: `vc-domain-verify=hamavrikan.co.il,a549b299b598c3c71dbb` and `vc-domain-verify=www.hamavrikan.co.il,2e166f794861a6aa2450`. The records there now carry older codes. Removing the domain from the other project also works.
- The older-format credits use `rel="noopener noreferrer"`, which hides the referrer, so clicks from them do not show as referrals. Three point to `https://itayost.com`, which answers with a 307 (temporary) redirect; setting it to 308 in Vercel > Domains is the clearer signal.
- Active Plus 60 and HaMerhav (May) have no live site, so there is nothing to credit.

## WhatsApp messages

Each link opens WhatsApp with the message filled in; pick the contact and send. The full text is below each link so you can read it first.

### Garden of Eden

[Open in WhatsApp](https://wa.me/?text=%D7%94%D7%99%D7%99%2C%20%D7%96%D7%94%20%D7%90%D7%99%D7%AA%D7%99%2C%20%D7%A9%D7%91%D7%A0%D7%94%20%D7%90%D7%AA%20%D7%94%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA%20%D7%95%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20Garden%20of%20Eden.%0A%0A%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%93%D7%9B%D7%9F%20%D7%90%D7%AA%20%D7%AA%D7%99%D7%A7%20%D7%94%D7%A2%D7%91%D7%95%D7%93%D7%95%D7%AA%20%D7%A9%D7%9C%D7%99%2C%20%D7%95%D7%9C%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%A9%D7%9C%D7%9B%D7%9D%20%D7%99%D7%A9%20%D7%A9%D7%9D%20%D7%A2%D7%9E%D7%95%D7%93%20%D7%9E%D7%A9%D7%9C%D7%95%20%D7%A2%D7%9D%20%D7%A7%D7%99%D7%A9%D7%95%D7%A8%20%D7%90%D7%9C%D7%99%D7%9B%D7%9D%3A%20itayost.com%2Fportfolio%2Fgarden-of-eden%0A%0A%D7%A9%D7%90%D7%9C%D7%94%20%D7%A7%D7%98%D7%A0%D7%94%3A%20%D7%99%D7%94%D7%99%D7%94%20%D7%91%D7%A1%D7%93%D7%A8%20%D7%9E%D7%91%D7%97%D7%99%D7%A0%D7%AA%D7%9B%D7%9D%20%D7%A9%D7%90%D7%95%D7%A1%D7%99%D7%A3%20%D7%A9%D7%95%D7%A8%D7%94%20%D7%90%D7%97%D7%AA%20%D7%91%D7%AA%D7%97%D7%AA%D7%99%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%2C%20%22%D7%A2%D7%95%D7%A6%D7%91%20%D7%95%D7%A4%D7%95%D7%AA%D7%97%20%D7%A2%D7%9C%20%D7%99%D7%93%D7%99%20ITAYOST%22%2C%20%D7%A2%D7%9D%20%D7%A7%D7%99%D7%A9%D7%95%D7%A8%3F%20%D7%91%D7%9C%D7%99%20%D7%9C%D7%95%D7%92%D7%95%20%D7%95%D7%91%D7%9C%D7%99%20%D7%9C%D7%A9%D7%A0%D7%95%D7%AA%20%D7%A9%D7%95%D7%9D%20%D7%93%D7%91%D7%A8%20%D7%91%D7%A2%D7%99%D7%A6%D7%95%D7%91.%20%D7%90%D7%9D%20%D7%9C%D7%90%20%D7%9E%D7%AA%D7%90%D7%99%D7%9D%2C%20%D7%90%D7%99%D7%9F%20%D7%A9%D7%95%D7%9D%20%D7%91%D7%A2%D7%99%D7%94.)

היי, זה איתי, שבנה את המערכת והאתר של Garden of Eden.

אני מעדכן את תיק העבודות שלי, ולפרויקט שלכם יש שם עמוד משלו עם קישור אליכם: itayost.com/portfolio/garden-of-eden

שאלה קטנה: יהיה בסדר מבחינתכם שאוסיף שורה אחת בתחתית האתר, "עוצב ופותח על ידי ITAYOST", עם קישור? בלי לוגו ובלי לשנות שום דבר בעיצוב. אם לא מתאים, אין שום בעיה.

### טל נדל"ן

[Open in WhatsApp](https://wa.me/?text=%D7%94%D7%99%D7%99%2C%20%D7%96%D7%94%20%D7%90%D7%99%D7%AA%D7%99%2C%20%D7%A9%D7%91%D7%A0%D7%94%20%D7%9C%D7%9B%D7%9D%20%D7%90%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20%D7%98%D7%9C%20%D7%A0%D7%93%D7%9C%22%D7%9F.%0A%0A%D7%A9%D7%9E%D7%AA%D7%99%20%D7%9C%D7%91%20%D7%A9%D7%91%D7%AA%D7%97%D7%AA%D7%99%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%9B%D7%AA%D7%95%D7%91%20%22%C2%A9%202026%20ItayOst.%20%D7%9B%D7%9C%20%D7%94%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA%20%D7%A9%D7%9E%D7%95%D7%A8%D7%95%D7%AA%22.%20%D7%96%D7%95%20%D7%98%D7%A2%D7%95%D7%AA%20%D7%A9%D7%9C%D7%99%3A%20%D7%94%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA%20%D7%A9%D7%9C%D7%9B%D7%9D%2C%20%D7%95%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%A7%D7%9F%20%D7%90%D7%AA%20%D7%94%D7%A9%D7%95%D7%A8%D7%94%20%D7%9C%D7%A9%D7%9D%20%D7%94%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%9B%D7%9D.%0A%0A%D7%91%D7%90%D7%95%D7%AA%D7%94%20%D7%94%D7%96%D7%93%D7%9E%D7%A0%D7%95%D7%AA%2C%20%D7%99%D7%94%D7%99%D7%94%20%D7%91%D7%A1%D7%93%D7%A8%20%D7%9E%D7%91%D7%97%D7%99%D7%A0%D7%AA%D7%9B%D7%9D%20%D7%A9%D7%90%D7%95%D7%A1%D7%99%D7%A3%20%D7%9E%D7%AA%D7%97%D7%AA%D7%99%D7%94%20%D7%A9%D7%95%D7%A8%D7%94%20%D7%A7%D7%98%D7%A0%D7%94%2C%20%22%D7%A2%D7%95%D7%A6%D7%91%20%D7%95%D7%A4%D7%95%D7%AA%D7%97%20%D7%A2%D7%9C%20%D7%99%D7%93%D7%99%20ITAYOST%22%2C%20%D7%A2%D7%9D%20%D7%A7%D7%99%D7%A9%D7%95%D7%A8%3F%20%D7%91%D7%9C%D7%99%20%D7%9C%D7%95%D7%92%D7%95%20%D7%95%D7%91%D7%9C%D7%99%20%D7%9C%D7%A9%D7%A0%D7%95%D7%AA%20%D7%A9%D7%95%D7%9D%20%D7%93%D7%91%D7%A8%20%D7%91%D7%A2%D7%99%D7%A6%D7%95%D7%91.%20%D7%9C%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%99%D7%A9%20%D7%92%D7%9D%20%D7%A2%D7%9E%D7%95%D7%93%20%D7%91%D7%AA%D7%99%D7%A7%20%D7%94%D7%A2%D7%91%D7%95%D7%93%D7%95%D7%AA%20%D7%A9%D7%9C%D7%99%20%D7%A2%D7%9D%20%D7%A7%D7%99%D7%A9%D7%95%D7%A8%20%D7%90%D7%9C%D7%99%D7%9B%D7%9D%3A%20itayost.com%2Fportfolio%2Ftal-real-estate%0A%0A%D7%90%D7%9D%20%D7%9C%D7%90%20%D7%9E%D7%AA%D7%90%D7%99%D7%9D%2C%20%D7%90%D7%99%D7%9F%20%D7%A9%D7%95%D7%9D%20%D7%91%D7%A2%D7%99%D7%94%2C%20%D7%90%D7%AA%D7%A7%D7%9F%20%D7%A8%D7%A7%20%D7%90%D7%AA%20%D7%A9%D7%95%D7%A8%D7%AA%20%D7%94%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA.)

היי, זה איתי, שבנה לכם את האתר של טל נדל"ן.

שמתי לב שבתחתית האתר כתוב "© 2026 ItayOst. כל הזכויות שמורות". זו טעות שלי: הזכויות שלכם, ואני מתקן את השורה לשם העסק שלכם.

באותה הזדמנות, יהיה בסדר מבחינתכם שאוסיף מתחתיה שורה קטנה, "עוצב ופותח על ידי ITAYOST", עם קישור? בלי לוגו ובלי לשנות שום דבר בעיצוב. לפרויקט יש גם עמוד בתיק העבודות שלי עם קישור אליכם: itayost.com/portfolio/tal-real-estate

אם לא מתאים, אין שום בעיה, אתקן רק את שורת הזכויות.

### Shepes Group

[Open in WhatsApp](https://wa.me/?text=%D7%94%D7%99%D7%99%2C%20%D7%96%D7%94%20%D7%90%D7%99%D7%AA%D7%99%2C%20%D7%A9%D7%91%D7%A0%D7%94%20%D7%9C%D7%9B%D7%9D%20%D7%90%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20Shepes%20Group.%0A%0A%D7%A9%D7%9E%D7%AA%D7%99%20%D7%9C%D7%91%20%D7%A9%D7%91%D7%AA%D7%97%D7%AA%D7%99%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%9B%D7%AA%D7%95%D7%91%20%22%C2%A9%202026%20ItayOst.%20%D7%9B%D7%9C%20%D7%94%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA%20%D7%A9%D7%9E%D7%95%D7%A8%D7%95%D7%AA%22.%20%D7%96%D7%95%20%D7%98%D7%A2%D7%95%D7%AA%20%D7%A9%D7%9C%D7%99%3A%20%D7%94%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA%20%D7%A9%D7%9C%D7%9B%D7%9D%2C%20%D7%95%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%A7%D7%9F%20%D7%90%D7%AA%20%D7%94%D7%A9%D7%95%D7%A8%D7%94%20%D7%9C-Shepes%20Group.%0A%0A%D7%91%D7%90%D7%95%D7%AA%D7%94%20%D7%94%D7%96%D7%93%D7%9E%D7%A0%D7%95%D7%AA%2C%20%D7%99%D7%94%D7%99%D7%94%20%D7%91%D7%A1%D7%93%D7%A8%20%D7%9E%D7%91%D7%97%D7%99%D7%A0%D7%AA%D7%9B%D7%9D%20%D7%A9%D7%90%D7%95%D7%A1%D7%99%D7%A3%20%D7%9E%D7%AA%D7%97%D7%AA%D7%99%D7%94%20%D7%A9%D7%95%D7%A8%D7%94%20%D7%A7%D7%98%D7%A0%D7%94%2C%20%22%D7%A2%D7%95%D7%A6%D7%91%20%D7%95%D7%A4%D7%95%D7%AA%D7%97%20%D7%A2%D7%9C%20%D7%99%D7%93%D7%99%20ITAYOST%22%2C%20%D7%A2%D7%9D%20%D7%A7%D7%99%D7%A9%D7%95%D7%A8%3F%20%D7%91%D7%9C%D7%99%20%D7%9C%D7%95%D7%92%D7%95%20%D7%95%D7%91%D7%9C%D7%99%20%D7%9C%D7%A9%D7%A0%D7%95%D7%AA%20%D7%A9%D7%95%D7%9D%20%D7%93%D7%91%D7%A8%20%D7%91%D7%A2%D7%99%D7%A6%D7%95%D7%91.%20%D7%9C%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%99%D7%A9%20%D7%92%D7%9D%20%D7%A2%D7%9E%D7%95%D7%93%20%D7%91%D7%AA%D7%99%D7%A7%20%D7%94%D7%A2%D7%91%D7%95%D7%93%D7%95%D7%AA%20%D7%A9%D7%9C%D7%99%20%D7%A2%D7%9D%20%D7%A7%D7%99%D7%A9%D7%95%D7%A8%20%D7%90%D7%9C%D7%99%D7%9B%D7%9D%3A%20itayost.com%2Fportfolio%2Fshepes-group%0A%0A%D7%90%D7%9D%20%D7%9C%D7%90%20%D7%9E%D7%AA%D7%90%D7%99%D7%9D%2C%20%D7%90%D7%99%D7%9F%20%D7%A9%D7%95%D7%9D%20%D7%91%D7%A2%D7%99%D7%94%2C%20%D7%90%D7%AA%D7%A7%D7%9F%20%D7%A8%D7%A7%20%D7%90%D7%AA%20%D7%A9%D7%95%D7%A8%D7%AA%20%D7%94%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA.)

היי, זה איתי, שבנה לכם את האתר של Shepes Group.

שמתי לב שבתחתית האתר כתוב "© 2026 ItayOst. כל הזכויות שמורות". זו טעות שלי: הזכויות שלכם, ואני מתקן את השורה ל-Shepes Group.

באותה הזדמנות, יהיה בסדר מבחינתכם שאוסיף מתחתיה שורה קטנה, "עוצב ופותח על ידי ITAYOST", עם קישור? בלי לוגו ובלי לשנות שום דבר בעיצוב. לפרויקט יש גם עמוד בתיק העבודות שלי עם קישור אליכם: itayost.com/portfolio/shepes-group

אם לא מתאים, אין שום בעיה, אתקן רק את שורת הזכויות.

### The Fader Academy (optional: case study)

[Open in WhatsApp](https://wa.me/?text=%D7%94%D7%99%D7%99%2C%20%D7%96%D7%94%20%D7%90%D7%99%D7%AA%D7%99%2C%20%D7%A9%D7%91%D7%A0%D7%94%20%D7%9C%D7%9B%D7%9D%20%D7%90%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%90%D7%AA%20%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA%20%D7%94-CRM.%0A%0A%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%A9%D7%94%D7%A7%D7%A8%D7%93%D7%99%D7%98%20%D7%A2%D7%93%D7%99%D7%99%D7%9F%20%D7%91%D7%AA%D7%97%D7%AA%D7%99%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%2C%20%D7%AA%D7%95%D7%93%D7%94%20%D7%A2%D7%9C%20%D7%96%D7%94.%0A%0A%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%A9%D7%90%D7%95%D7%9C%20%D7%9E%D7%A9%D7%94%D7%95%2C%20%D7%A8%D7%A7%20%D7%90%D7%9D%20%D7%91%D7%90%20%D7%9C%D7%9B%D7%9D%3A%20%D7%94%D7%99%D7%99%D7%AA%D7%99%20%D7%A9%D7%9E%D7%97%20%D7%9C%D7%9B%D7%AA%D7%95%D7%91%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%9C%D7%A7%D7%95%D7%97%20%D7%A7%D7%A6%D7%A8%20%D7%A2%D7%9C%20%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA%20%D7%94-CRM%2C%20%D7%A2%D7%9D%20%D7%9E%D7%A1%D7%A4%D7%A8%D7%99%D7%9D%20%D7%90%D7%9E%D7%99%D7%AA%D7%99%D7%99%D7%9D%20%D7%9E%D7%94%D7%A9%D7%99%D7%9E%D7%95%D7%A9%20%D7%A9%D7%9C%D7%9B%D7%9D.%20%D7%A9%D7%95%D7%9D%20%D7%93%D7%91%D7%A8%20%D7%9C%D7%90%20%D7%A2%D7%95%D7%9C%D7%94%20%D7%91%D7%9C%D7%99%20%D7%90%D7%99%D7%A9%D7%95%D7%A8%20%D7%A9%D7%9C%D7%9B%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%95%D7%98%D7%94%20%D7%9E%D7%9C%D7%90%D7%94.)

היי, זה איתי, שבנה לכם את האתר ואת מערכת ה-CRM.

ראיתי שהקרדיט עדיין בתחתית האתר, תודה על זה.

רציתי לשאול משהו, רק אם בא לכם: הייתי שמח לכתוב סיפור לקוח קצר על מערכת ה-CRM, עם מספרים אמיתיים מהשימוש שלכם. שום דבר לא עולה בלי אישור שלכם על טיוטה מלאה.

(If they say yes, use the interview questions in `outreach/case-study/active-plus-60-ask.md`.)

## Status log

- 2026-11-18: kit rewritten (brand anchor, no `dofollow`, one credit per site); Fader, Lola Martin and FutureKids added. Nothing sent yet. Itay sends.
- 2026-11-24: all portfolio sites checked. Fader, Lola Martin, FutureKids and Neshatamar already link to itayost.com, so no ask is needed. Messages ready for Garden of Eden (no credit), Tal and Shepes (wrong copyright line, no link). Itay sends.
- 2026-11-25: credit line merged on 15 sites (Tal, Shepes and Garden of Eden approved by the clients; the rest on Itay's instruction) and confirmed live on 14. Hamavrikan waits on its domain moving to the right Vercel project.
