# LegacyVault Frontend

Production-oriented Next.js frontend for the supplied LegacyVault backend.

## Backend source of truth inspected

The supplied backend source and Postman collection were inspected before creating the API layer.

Confirmed:
- Base URL: `http://localhost:3000/api`
- JWT: `Authorization: Bearer <token>`
- Signup/login return `{ status, data: { user, token } }`
- Vault fields: `category`, `title`, `content`, `is_always_visible`
- Categories: `password | document | instruction | asset`
- Trusted contact fields: `contact_email`, `relationship_label`
- Access request fields: `target_owner_id`, `reason`
- Vote body: `{ decision: "approve" | "deny" }`
- Request statuses: `pending | approved | rejected | expired`
- Activity response: `{ status: "success", data: [...] }`

## Important backend limitation

There is no endpoint to search/select users by email or ID. Therefore the emergency-request form accepts a legitimate `target_owner_id` UUID instead of inventing an owner-search endpoint.

The backend also returns incoming/to-vote request objects with Sequelize nested associations. The frontend uses those returned objects and does not create a fabricated request-details endpoint.

## Run

1. Copy `.env.local.example` to `.env.local`.
2. Ensure the backend is running at `http://localhost:3000`.
3. Run:

```bash
npm install
npm run dev
```

Then open `http://localhost:3001` if Next chooses that port, or the port printed by the dev server.

## API contract

| Feature | Method | Endpoint | Auth | Request |
|---|---|---|---|---|
| Signup | POST | `/auth/signup` | No | `{ email, password }` |
| Login | POST | `/auth/login` | No | `{ email, password }` |
| Logout | POST | `/auth/logout` | Yes | — |
| Quorum | PUT | `/auth/quorum-threshold` | Yes | `{ quorum_threshold }` |
| Vault list | GET | `/vault-items` | Yes | — |
| Shared vault | GET | `/vault-items/shared/:owner_id` | Yes | — |
| Create vault | POST | `/vault-items` | Yes | `{ category, title, content, is_always_visible }` |
| Update vault | PUT | `/vault-items/:id` | Yes | Any supported vault field |
| Delete vault | DELETE | `/vault-items/:id` | Yes | — |
| Contacts | GET | `/trusted-contacts` | Yes | — |
| Add contact | POST | `/trusted-contacts` | Yes | `{ contact_email, relationship_label }` |
| Remove contact | DELETE | `/trusted-contacts/:id` | Yes | — |
| Create request | POST | `/access-requests` | Yes | `{ target_owner_id, reason }` |
| Incoming | GET | `/access-requests/incoming` | Yes | — |
| To vote | GET | `/access-requests/to-vote` | Yes | — |
| Vote | POST | `/votes/request/:request_id` | Yes | `{ decision }` |
| Activity | GET | `/activity-logs` | Yes | — |

## Security notes

- No vault content is logged by the frontend.
- Password-category content is masked in the vault card.
- Authorization remains backend-controlled.
- Sensitive content is not placed in URLs.
- API calls attach the JWT from the browser session.
