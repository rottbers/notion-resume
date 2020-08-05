# Notion resume

Allows for a resume written and managed in [Notion](https://www.notion.so/) to be hosted as a [Next.js](https://nextjs.org/) app.

Many thanks to [react-notion](https://github.com/splitbee/react-notion/) and [notion-api-worker](https://github.com/splitbee/notion-api-worker/) for making it simple to integrate. I'll echo their warning:

> _Use with caution. This is based on the private Notion API. We can not guarantee it will stay stable._

## Enviornment variables

### `NOTION_PAGE_ID`

The ID for the Notion page which should be used as resume content (e.g. `2e22de6b770e4166be301490f6ffd420`).

Can for example be found in the Notion URL when sharing the page (i.e. `www.notion.so/Resume-<NOTION_PAGE_ID>`).

### `NOTION_API_WORKER_DOMAIN`

Domain name for the [notion-api-worker](https://github.com/splitbee/notion-api-worker/) (e.g. `notion-api.splitbee.io`).

### `NOTION_API_TOKEN`

Used for auth. Only required if the notion page is private and not "shared to the web".

As stated in the [notion-api-worker docs](https://github.com/splitbee/notion-api-worker/#receiving-the-token), to obtain your token look for a cookie named `token_v2` using the browser developer tools while logged in to your notion account.

### `META_TITLE` (optional)

Used to set the page meta title (e.g. `Resume | Jane Doe`). Will default to `Resume` if left undefined.

### `META_DESCRIPTION` (optional)

Used to set the page meta description (e.g. `Happy dev looking for...`). Will default to `...` if left undefined.
