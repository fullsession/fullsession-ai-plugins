# Privacy policy: AI Assistant Integrations section

New section for https://www.fullsession.io/privacy-policy, written in the existing policy's style. Place it after "Disclosure of Your Personal Data".

Every statement matches the implementation as of October 2026 (FServiceProvider `src/mcp`): 1-hour access tokens and 30-day refresh tokens, access re-checked on every refresh, masked identity in session lists, full identity for single-session and single-visitor requests, no replay recordings sent, and minimal request logging. Update this section if any of that changes.

---

## AI Assistant Integrations

FullSession offers integrations with third-party AI assistants, such as ChatGPT (OpenAI) and Claude (Anthropic) ("AI Assistants"). These integrations let You ask questions about Your FullSession data from within an AI Assistant. An integration is only active when You, or a user of Your account, choose to connect it.

### Connecting an AI Assistant

You connect an AI Assistant by signing in to FullSession and approving access. Your FullSession password is never shared with the AI Assistant. The AI Assistant receives an access token that is limited to the sites Your FullSession account can access. Access tokens expire after one hour and are renewed automatically while the connection remains active; access stops if Your FullSession account is removed. You can disconnect at any time from the AI Assistant's settings.

### What data is shared

When You ask a question, the AI Assistant requests the relevant information from FullSession, and FullSession returns it to the AI Assistant to answer You. Depending on the question, this may include:

- Aggregated analytics, such as page rankings, funnel conversion rates, trends and dashboard figures;
- Session information, such as the time, duration, device, browser, country, pages visited, interaction and error signals, and a link to the session replay in FullSession;
- Information about the visitors of Your website as recorded by FullSession. In lists of sessions, visitor email addresses and names are partially masked (for example, j***@example.com). When You ask about a specific session or a specific visitor, their full identifying information, location and custom fields You have configured are returned;
- Content recorded as part of a session, such as custom event data, feedback responses and error messages, as it was recorded.

Session replay recordings themselves are not sent to the AI Assistant; replays open in FullSession.

### Changes made through an AI Assistant

You may ask an AI Assistant to create, update or delete items in Your FullSession account, such as segments, funnels, saved heatmaps, dashboards and charts. These actions are performed on Your behalf and only when You request them; AI Assistants such as ChatGPT ask for Your confirmation before they are carried out.

### Processing by AI Assistant providers

Information returned to an AI Assistant is processed by the AI Assistant's provider under that provider's own terms and privacy policy, including any data retention and model-training settings of Your AI Assistant account. FullSession does not control how AI Assistant providers process this information. We encourage You to review the privacy policy of any AI Assistant You connect.

### Your website's visitors

Where the information returned concerns visitors to Your website, FullSession processes it on Your behalf as a processor, as described in the "Scope" section of this Privacy Policy. You are responsible for informing Your website's visitors, where required, that their data may be accessed through AI Assistants that You connect.

### Retention

FullSession stores the information needed to operate a connection, such as connection identifiers, tokens and the account and sites they relate to. We also keep basic technical logs of requests made by AI Assistants, such as the time and the service endpoint, and of sign-ins, for security, troubleshooting and abuse prevention. Your conversation with the AI Assistant is not sent to FullSession; FullSession only receives the specific data requests needed to answer Your questions. When You ask the AI Assistant to draft a segment or funnel, the description of what You want is sent to FullSession and processed by FullSession's AI features to create the draft. This information is retained in line with the "Retention of Your Personal Data" section.

