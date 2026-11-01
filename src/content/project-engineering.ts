import type { ProjectEngineering } from "./projects"

/**
 * How each project was built: the hard problems hit along the way, the decisions made and why,
 * and what each choice gave up. Written from each codebase, its docs and its commit history.
 */
export const projectEngineering: Record<string, ProjectEngineering> = {
  scholarium: {
    challenges: [
      { title: "Heavy lecture PDF analysis without timeouts", problem: "University lecture handouts can be over 100 pages. Processing an entire textbook PDF in a single LLM request caused socket timeouts and excessive memory consumption.", solution: "I architected an asynchronous document ingestion pipeline that splits PDFs into semantic chapter chunks, generates vector embeddings, and stores them in Supabase PostgreSQL with pgvector. Student queries search only relevant text sections with sub-second retrieval times." },
      { title: "Low-connectivity lecture hall sync", problem: "Campus network connectivity can drop intermittently while students are in lecture halls or underground classrooms.", solution: "I implemented an offline-first caching layer with Flutter and SQLite. Lecture notes, formulas, and recent course materials are cached locally on the device, synchronizing automatically in the background when connectivity resumes." },
      { title: "Multiplayer quiz room race conditions", problem: "High-intensity quiz rounds with dozens of students submitting simultaneous answers resulted in leaderboard calculation race conditions.", solution: "I designed a WebSocket room coordinator that timestamps student responses at the millisecond level, queuing answers through an atomic Redis transaction before updating the PostgreSQL leaderboard." },
    ],
    decisions: [
      { title: "Cross-platform mobile with Flutter", why: "Flutter allows our team to maintain a single performant codebase for both Android and iOS students while achieving 60fps animations and native hardware access." },
      { title: "CAS-based step-by-step math solver", why: "Instead of relying purely on generative AI which can make arithmetic errors, we paired LLMs with a formal Computer Algebra System (CAS) for rigorous, verified math solutions." },
    ],
    tradeoffs: [
      { choice: "Chunked embedding storage over full-text model injection", gained: "Instant response times and 90% cheaper token overhead.", cost: "Requires an upfront processing wait time when a student uploads a new 200-page handout." },
    ],
  },
  "mastery-lab": {
    challenges: [
      { title: "Sandboxed browser code execution without XSS risks", problem: "Allowing students to write arbitrary HTML and CSS directly in the browser poses security risks if malicious scripts escape into the host session.", solution: "I implemented a double-sandboxed iframe with strict Content Security Policies and postMessage communication, stripping dangerous scripts while allowing safe, instant visual rendering of HTML and CSS." },
      { title: "Automated DOM verification for open-ended styling", problem: "Unlike math with single answers, CSS layouts can be achieved in multiple ways. Rigid regex tests broke valid student solutions.", solution: "I built an AST-based parser that evaluates actual computed styles (getComputedStyle) on rendered elements, verifying layout behavior rather than exact literal syntax." },
    ],
    decisions: [
      { title: "Zero barrier to entry (no account required to start)", why: "Students can begin learning and running code in less than 2 seconds without forcing account signup or payment." },
      { title: "Gamified streak & XP system", why: "Daily streaks and leaderboard positions motivate consistent study and dramatically boost student lesson completion." },
    ],
    tradeoffs: [
      { choice: "Client-side compilation over remote Docker containers", gained: "Zero server compute costs and instant 0ms latency for learners.", cost: "Advanced backend language execution (e.g., Python/PHP) requires separate backend APIs." },
    ],
  },
  "springlight-commerce": {
    challenges: [
      { title: "Preventing concurrent inventory stock leakage", problem: "When multiple cashiers ring up the same fast-moving item simultaneously, naive database updates cause inventory counts to drop below zero.", solution: "I designed atomic PostgreSQL transactions using SELECT FOR UPDATE row-level locks, guaranteeing that inventory reservations are serialized and mathematically checked before order confirmation." },
    ],
    decisions: [
      { title: "Strict relational database constraints over NoSQL", why: "Inventory and sales tracking require absolute ACID compliance and foreign key integrity to eliminate discrepancy discrepancies." },
    ],
    tradeoffs: [
      { choice: "On-premise Docker deployment over complex Kubernetes", gained: "Zero cloud overhead for physical stores and simple one-command maintenance.", cost: "Manual server updates across physical branch locations." },
    ],
  },
  drivestack: {
    challenges: [
      { title: "Moving files between Google accounts", problem: "Google Drive has no “move to another account”. Ordinary files have to be downloaded and uploaded again, and Google Docs, Sheets and Slides can’t be downloaded in their native form at all.", solution: "Binary files stream straight from the source account into the destination with no temporary file, and a transform stream reports bytes moved over a WebSocket. For native Google files I grant the destination account read access, have Drive copy the file server-side, then revoke the permission in a finally block so it never lingers. Folders are rebuilt recursively, paging through children with a cursor so large trees never sit in memory." },
      { title: "Moves that survive a crash halfway", problem: "A move touches two accounts and can take minutes. If a worker died after the copy but before cleanup, a retry would copy the file again.", solution: "Every move is a persisted operation with phases, from preparing and copying through trashing the source and syncing the cache. The destination file id is saved as soon as it exists, so a retry skips straight to cleanup, and a source that is already gone counts as done." },
      { title: "Webhooks that arrive twice", problem: "Payment providers retry webhooks, and a duplicate “subscription active” event must not grant time twice.", solution: "The signature is verified over the raw body, and the webhook id is recorded in the same database transaction as its effects, so a repeat is recognised and ignored." },
    ],
    decisions: [
      { title: "Encrypt every OAuth token with AES-256-GCM", why: "Refresh tokens are the keys to people’s Drives. Stored encrypted with authentication, a database leak alone doesn’t expose them." },
      { title: "Trash the source instead of deleting it", why: "If anything goes wrong after a move, the original is still recoverable from the user’s trash." },
      { title: "Redis-backed rate limits and queues, with an in-memory fallback", why: "Limits hold across several instances in production, and the API still runs locally without Redis." },
    ],
    tradeoffs: [
      { choice: "One USD price with Dodo’s adaptive currency instead of my own NGN and USD pricing", gained: "Much less checkout and pricing code, and local currency handled by the payment provider.", cost: "Less control over the exact local price shown to Nigerian customers." },
      { choice: "Trashing rather than deleting moved files", gained: "Safety and an easy undo.", cost: "Trashed files still count against the source account’s quota until the trash is emptied." },
    ],
  },
  lemonwaresex: {
    challenges: [
      { title: "Money math without floating point", problem: "Floats can’t represent most decimal amounts exactly, and in currency conversion those tiny errors become visible pennies, especially after triangulating through a third currency.", solution: "Every calculation uses arbitrary-precision decimals at 15 internal digits, and only the final result is rounded, half-up, to the target currency’s own minor unit: zero places for yen, two for naira." },
      { title: "Two markets that quote differently", problem: "Official rates come from the European Central Bank, based in euros. Nigeria’s street rates are quoted against the US dollar, and the gap between the two is exactly what people need to see.", solution: "Official cross rates are derived through the euro, parallel-market cross rates through the dollar, and every derived rate is flagged as derived. Parallel quotes also show the premium over the official rate as a percentage." },
      { title: "Buy and sell rates that flip", problem: "With bid and ask prices, inverting a pair is not just one over the rate: the buy and sell sides swap.", solution: "Inverted lookups compute the new buy rate from the old sell rate and the new sell rate from the old buy rate, and a customer buying is priced at the dealer’s sell rate." },
    ],
    decisions: [
      { title: "Flag stale rates instead of hiding them", why: "The ECB doesn’t publish on weekends or holidays. Rates older than four days are returned with their age and marked stale, so API users decide what that means for them." },
      { title: "Providers behind a single contract", why: "Frankfurter (ECB), the parallel-market source and a fake provider for tests all implement one interface, so a new source is one class, and tests never call the internet." },
    ],
    tradeoffs: [
      { choice: "Store rates and convert from the database instead of calling a provider per request", gained: "Fast, metered API responses that don’t depend on an upstream being up.", cost: "Rates are only as fresh as the last sync, which is why every result carries its rate date and staleness." },
    ],
  },
  "course-correct": {
    challenges: [
      { title: "Paid videos that can’t just be shared", problem: "If a lesson is a public video URL, one paying student can share the course with a whole department.", solution: "Videos upload straight from the admin’s browser to Mux and are stored with a signed playback policy. The API hands enrolled students a playback URL signed with a token that expires after 24 hours, so a copied link stops working." },
      { title: "One account, one device", problem: "Even with signed videos, a shared login is a shared course.", solution: "Each login records an active device on the account and puts that device id in the token. The auth middleware rejects any token whose device isn’t the active one, so signing in on a new phone signs the old one out." },
      { title: "Access sold outside the checkout", problem: "Not every sale happens through the online checkout, and those students still need a way in.", solution: "Admins issue single-use passkeys, formatted to be read aloud and typed without confusing characters. Redeeming one marks it used and creates a 30-day enrolment in the same transaction." },
    ],
    decisions: [
      { title: "The server decides the price", why: "Checkout reads the price from admin settings and converts it to kobo itself, and payments are verified with Paystack before access is granted. The client never says how much it paid." },
      { title: "Accept overpayment, reject only underpayment", why: "A student who paid the full amount or more should never be locked out; only short payments are refused." },
      { title: "Delete Mux and Cloudinary media when a lesson is deleted", why: "Orphaned videos keep costing money every month, so cleanup is part of deleting the lesson." },
    ],
    tradeoffs: [
      { choice: "Strict single-device login", gained: "Paid accounts can’t be passed around.", cost: "Students who switch between a phone and a laptop have to sign in again each time." },
      { choice: "Mux for video instead of serving files myself", gained: "Adaptive streaming, signed playback and no video infrastructure to run.", cost: "A per-minute cost and a dependency on one provider." },
    ],
  },
  b4build: {
    challenges: [
      { title: "Long AI runs in a web page", problem: "A full plan runs nine phases and can take minutes. A normal request would time out, and the user would stare at a spinner.", solution: "The FastAPI backend streams progress with Server-Sent Events as each phase finishes, and the interface renders the plan as it arrives." },
      { title: "HTTPS everywhere on AWS", problem: "The frontend on Amplify is HTTPS, but the API sat behind a plain-HTTP load balancer, so browsers blocked every call as mixed content.", solution: "Terraform puts CloudFront in front of the load balancer, which gives the API an HTTPS URL without buying a domain, with an option to add a custom domain on the load balancer later." },
      { title: "A private database the app can still reach", problem: "RDS lives in private subnets with TLS required, so migrations couldn’t run from a laptop, and the container rejected the database certificate.", solution: "Migrations run as a one-off ECS task with its own task definition, and the Docker image ships Amazon’s global CA bundle so the TLS connection is verified rather than disabled." },
    ],
    decisions: [
      { title: "A rule-based coordinator instead of an LLM router", why: "Deciding which phase is missing next doesn’t need a model. Plain rules make routing free, fast and predictable, and models are only used where judgment is needed." },
      { title: "Every model call through one client", why: "A single LLM client enforces timeouts, retries and cost caps, and is traced in LangSmith, so no phase can quietly run up a bill." },
      { title: "No AWS keys in GitHub", why: "Deployments assume a role through GitHub OIDC, and Terraform state lives in S3 with a DynamoDB lock so two applies can’t corrupt it." },
    ],
    tradeoffs: [
      { choice: "Re-running only the phases a follow-up question affects", gained: "Fast, cheap answers to “what if I use Claude instead?”.", cost: "The impact analysis has to be right about which phases each change touches, or part of the plan goes stale." },
      { choice: "A full AWS stack (VPC, ECS Fargate, RDS, Redis)", gained: "Production-grade isolation and a realistic reference architecture.", cost: "A fixed monthly cost even when nobody is using it." },
    ],
  },
  "milky-way": {
    challenges: [
      { title: "Checkouts failing on a pooled database", problem: "Placing an order failed in production but never locally. The database pooler shares server connections between clients, so PHP’s server-side prepared statement names were sometimes already taken; the driver ignored the clash, but it aborted the transaction and the next query failed.", solution: "I switched to preparing statements in PHP, which works safely through the pooler, and checkouts went through again." },
      { title: "A 500 caused by an empty setting", problem: "The live site crashed with an argument error deep inside Laravel. The host defined SESSION_DRIVER but left it blank, and Laravel returns the blank value instead of its default, which then built an invalid driver name.", solution: "I reproduced it on the identical stack, then made every driver, store and connection setting fall back to its default when blank." },
      { title: "Paystack telling me twice", problem: "A payment is reported both by the shopper’s redirect and by Paystack’s webhook, usually close together, and a shopper may never come back at all.", solution: "The callback re-verifies the transaction with Paystack before touching the order, the webhook is checked with an HMAC-SHA512 signature, and recording a payment is idempotent, so either path can confirm it and neither doubles it." },
      { title: "Never selling stock you don’t have", problem: "Two shoppers can check out the last item at the same moment.", solution: "Placing an order locks the product rows and decrements stock inside the transaction, refusing the order if stock ran out in the meantime. Products without a stock count simply aren’t tracked." },
    ],
    decisions: [
      { title: "Preview prices on preview deployments", why: "Many products are priced on request, which made checkout impossible to test. Preview builds show a stable stand-in price marked “Preview price”, and nothing about it is saved." },
      { title: "Admins control content and colours", why: "The store owner can change homepage photos and copy, categories, delivery fees and the site’s colours without a developer." },
    ],
    tradeoffs: [
      { choice: "Laravel in a FrankenPHP container on Vercel", gained: "Push-to-deploy previews for every branch on a platform the owner already uses.", cost: "Serverless quirks like blank environment variables and pooled connections, which I had to track down and fix." },
    ],
  },
  "tender-cradle": {
    challenges: [
      { title: "Overselling under concurrent checkouts", problem: "Several parents can buy the last item in a size at the same time.", solution: "Stock has a reserved count. Checkout reserves stock with a single conditional update that only succeeds if enough unreserved stock remains, payment commits it, and a cancelled or expired order releases it." },
      { title: "Double-clicks that create two orders", problem: "A slow network or an impatient double-click can submit checkout twice.", solution: "Checkout accepts an idempotency key. A repeated request with the same key returns the first result instead of creating a second order." },
    ],
    decisions: [
      { title: "Confirm payments by webhook as well as redirect", why: "Paystack redirects the parent back and also sends a webhook. The order is confirmed by whichever arrives, so a closed tab doesn’t leave a paid order stuck as pending." },
      { title: "Amounts in kobo", why: "Prices are stored and sent as whole kobo, Paystack’s smallest unit, so no fractional naira can creep in." },
    ],
    tradeoffs: [
      { choice: "A separate Express API instead of server code inside the frontend", gained: "One backend serving the public site, parent accounts and the admin, deployable on its own.", cost: "Two apps to deploy and keep in step." },
    ],
  },
  ifaf: {
    challenges: [
      { title: "Ticket sales without a card processor", problem: "The festival sells tickets by bank transfer, which means a human has to match every receipt to real money and the same transfer could be used twice.", solution: "Each booking gets a private link where the guest uploads a receipt. An admin approves it only against the bank’s transaction reference, which the database refuses to accept twice." },
      { title: "Places that aren’t held forever", problem: "A guest can reserve and never pay, holding seats that others want.", solution: "Unpaid reservations expire on a schedule, and expiry is also enforced whenever a reservation is created, viewed or reviewed, so the count is right even if the scheduler is late. Bookings already under review don’t expire." },
    ],
    decisions: [
      { title: "QR codes generated in the browser", why: "Tickets and the check-in scanner never send ticket data to an outside QR service." },
      { title: "Receipts private to admins", why: "Bank receipts contain personal details, so they’re stored privately and served only to signed-in admins." },
    ],
    tradeoffs: [
      { choice: "Private booking links instead of customer accounts", gained: "No sign-up friction for a one-day event.", cost: "Losing the link means losing easy access, so the browser remembers each guest’s bookings on that device." },
    ],
  },
}
