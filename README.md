# FlacoFast

FlacoFast is a lightweight desktop app skeleton for optimizing game routes through a WireGuard tunnel to a primary VPS. The desktop stack is Tauri, Rust, Vue 3, TypeScript, Tailwind CSS, and WireGuard. The hosted stack for Coolify is a Node/Fastify API with Postgres.

## What Is Included

- Tauri desktop shell with a Rust command layer in `src-tauri`.
- Vue 3 + TypeScript UI with a fixed sidebar, dark mode, metrics cards, node cards, game profiles, history, and settings.
- Decoupled frontend services for latency, tunnel, config, node health, and history.
- Rust commands for:
  - `run_latency_test`
  - `run_jitter_test`
  - `run_packet_loss_test`
  - `connect_tunnel`
  - `disconnect_tunnel`
  - `get_tunnel_status`
  - `save_config`
  - `load_config`
  - `save_history`
  - `load_history`
  - `run_healthcheck`
- JSON persistence for config and history, with a clean path to migrate to SQLite later.
- WireGuard integration boundary that writes a client config and calls `wg-quick` on Linux/macOS or `wireguard.exe` tunnel service commands on Windows.
- Coolify-ready backend API with Postgres persistence for users, approvals, VPS nodes, and remote history.
- Admin bootstrap from environment variables.
- Docker Compose with a persistent Postgres volume.

## Project Structure

```text
src/
  app/router/
  app/providers/
  components/
    cards/
    charts/
    common/
    forms/
    games/
    layout/
    nodes/
  composables/
  pages/
  services/
  store/
  styles/
  types/
  utils/
src-tauri/
  src/
    commands/
    models/
    services/
    state/
    utils/
server/
  src/
    routes/
    auth.ts
    db.ts
    env.ts
```

## Architecture

The desktop app still runs on the user's machine. Coolify hosts only the central API and database:

```text
Desktop Tauri app -> https://your-coolify-api-domain.com/api -> Postgres volume
```

This keeps WireGuard control local to the desktop, while shared data lives remotely:

- registered users
- admin approvals
- VPS node list
- primary VPS config seeded from `.env`
- history synced from approved desktop users

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the web UI in browser mode:

```bash
pnpm run dev
```

Run the backend API locally, after creating a `.env` from `.env.example` and pointing it at Postgres:

```bash
pnpm run server:dev
```

Run the desktop app:

```bash
pnpm run tauri dev
```

This machine needs Rust installed before `pnpm run tauri dev` or `pnpm run tauri build` can work.

## Coolify Deployment

1. Create your environment variables from `.env.example`.
2. Set at minimum:
   - `POSTGRES_PASSWORD`
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `VPS_HOST`
   - `WIREGUARD_PORT`
   - `SERVER_PUBLIC_KEY`
3. Deploy with `docker-compose.yml`.
4. Keep the `flacofast_postgres_data` volume. That is what prevents losing the database.

The backend creates or updates your owner admin on startup using:

```text
ADMIN_EMAIL
ADMIN_PASSWORD
ADMIN_NAME
```

The primary VPS node is seeded from:

```text
VPS_HOST
WIREGUARD_PORT
SERVER_PUBLIC_KEY
VPS_NODE_NAME
VPS_REGION
VPS_DNS
INTERFACE_NAME
CLIENT_ADDRESS
ALLOWED_IPS
```

For the desktop build, create `.env` or `.env.local` from `.env.desktop.example` and set:

```text
VITE_API_URL=https://your-coolify-api-domain.com
```

For a temporary test domain without buying one, you can use:

```text
VITE_API_URL=https://api.186.6.82.233.sslip.io
```

Then build or run the desktop app. The Tauri app will keep local WireGuard control and use Coolify for auth, approvals, nodes, and remote history.

## WireGuard VPS Checklist

Your VPS should have:

- WireGuard installed.
- A fixed public IP or stable DNS name.
- UDP port `51820` open, or the port configured in Settings.
- A server peer with the client's public key.
- IP forwarding enabled.
- NAT configured if the VPS will be the traffic exit point.

The app currently stores:

- VPS host.
- WireGuard port.
- Server public key.
- DNS.
- Interface name.
- Client address.
- Allowed IPs.
- Node name and region.

## Next Steps

1. Add secure client private key handling. Avoid storing private keys as plain text long term.
2. Decide whether routing should be full tunnel or split tunnel per game.
3. Add privilege elevation flows for Windows/macOS/Linux WireGuard operations.
4. Replace JSON history with SQLite once metrics volume grows.
5. Add multi-node CRUD and automatic best-route selection using the score:

```text
score = pingMs * 0.6 + jitterMs * 0.3 + packetLossPct * 0.1
```

Lower score means a better route.
