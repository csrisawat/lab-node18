# lab-node18

Node.js 18 Hello World POC for Azure App Service DR to AWS (EC2).

## App

- **Name:** lab-node18
- **Runtime:** Node.js 18
- **Entry:** `index.js`
- **Port:** configurable via `PORT` env var (default 3000)

## Endpoints

| Path | Description |
|---|---|
| `/` | Hello World page with env config summary |
| `/health` | JSON health check (`{ status, uptime }`) |

## Environment Variables

| Variable | Type | Default | Description |
|---|---|---|---|
| `PORT` | Config | `3000` | Server listen port |
| `APP_NAME` | Config | `lab-node18` | Application display name |
| `DB_HOST` | Config | `localhost` | Database host |
| `DB_PASSWORD` | Secret | _(not set)_ | Database password |
| `API_KEY` | Secret | _(not set)_ | API key |

## Run

```bash
npm start
```
