---
slug: /minisvault-api-reference
sidebar_label: Minis Vault
---

# MinisVault API Reference

**Version:** 1.0  
**Base URL:** `https://api.minisvault.example/api/v1`  
**Protocol:** HTTPS  
**Format:** JSON

MinisVault API stores a collector's acrylic paints and miniatures. Every resource belongs to the authenticated user. This reference covers the two operations in the v1 contract:


| Operation           | Method and path           |
| ------------------- | ------------------------- |
| List acrylic paints | `GET /api/v1/paints`      |
| Add a miniature     | `POST /api/v1/miniatures` |


---

## Authentication

Send a signed JWT in the `Authorization` header on every request.

```http
Authorization: Bearer <token>
Accept: application/json
```


| Claim   | Meaning                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| `sub`   | User id. The API uses this value as `user_id` and never accepts an owner id from the request body.                 |
| `scope` | Space-separated permissions. Read operations require `inventory:read`. Write operations require `inventory:write`. |
| `exp`   | Expiry, as a Unix timestamp. Expired tokens are rejected.                                                          |



| Status             | Condition                                                                      |
| ------------------ | ------------------------------------------------------------------------------ |
| `401 Unauthorized` | The header is missing, the token cannot be verified, or the token has expired. |
| `403 Forbidden`    | The token is valid and the required scope is absent.                           |


---



## Conventions

- Resource ids are opaque strings (`pnt_…`, `min_…`, `usr_…`). Clients treat them as identifiers, not as structured data.
- Timestamps are UTC, ISO 8601, with a `Z` suffix. Dates are `YYYY-MM-DD`.
- Property names in JSON are camelCase. Column names in the database are snake_case.
- List responses are paginated. `page` defaults to `0` and `size` defaults to `20`. `size` cannot exceed `100`.
- A successful create returns `201 Created` and a `Location` header pointing at the new resource.
- Clients cannot set `id`, `ownerId`, `createdAt`, or `updatedAt`. The server assigns those fields.

---



## List acrylic paints

Returns the authenticated user's acrylic paints. Results can be narrowed by brand.

```http
GET /api/v1/paints
```



### Headers


| Header          | Required | Value                                             |
| --------------- | -------- | ------------------------------------------------- |
| `Authorization` | Yes      | `Bearer <token>` with the `inventory:read` scope. |
| `Accept`        | Yes      | `application/json`                                |




### Query parameters


| Name    | Required | Type    | Description                                                                                                                                             |
| ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `brand` | No       | string  | Case-insensitive brand name. Known values: `Citadel`, `Vallejo`, `Army Painter`, `AK Interactive`, `Scale75`. Omit the parameter to return every brand. |
| `type`  | No       | string  | Paint medium. This operation returns acrylic paints only. Any other value produces an empty `data` array and a `200` status.                            |
| `page`  | No       | integer | Zero-based page index. Default: `0`.                                                                                                                    |
| `size`  | No       | integer | Page size. Default: `20`. Maximum: `100`.                                                                                                               |


The server always applies `user_id = <sub>` and `type = 'acrylic'`. When `brand` is present it also applies a case-insensitive match on `brand`.

### Request body

None.

### Example request

```http
GET /api/v1/paints?brand=Citadel&type=acrylic&page=0&size=20 HTTP/1.1
Host: api.minisvault.example
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfM2Y4YTEiLCJzY29wZSI6ImludmVudG9yeTpyZWFkIn0.signature
Accept: application/json
```



### Response — `200 OK`

```json
{
  "data": [
    {
      "id": "pnt_8c21a4",
      "name": "Macragge Blue",
      "brand": "Citadel",
      "range": "Base",
      "type": "acrylic",
      "colorCode": "21-08",
      "hex": "#0F3D7A",
      "finish": "matte",
      "volumeMl": 12,
      "quantity": 2,
      "status": "in-stock",
      "acquiredOn": "2026-03-14"
    },
    {
      "id": "pnt_19fe02",
      "name": "Game Color Magic Blue",
      "brand": "Vallejo",
      "range": "Game Color",
      "type": "acrylic",
      "colorCode": "72.021",
      "hex": "#1B4F9C",
      "finish": "matte",
      "volumeMl": 18,
      "quantity": 1,
      "status": "low",
      "acquiredOn": "2026-07-02"
    },
    {
      "id": "pnt_c4e81b",
      "name": "French Blue",
      "brand": "AK Interactive",
      "range": "3rd Generation",
      "type": "acrylic",
      "colorCode": "AK11186",
      "hex": "#3E6BA8",
      "finish": "matte",
      "volumeMl": 17,
      "quantity": 2,
      "status": "in-stock",
      "acquiredOn": "2026-08-21"
    }
  ],
  "page": {
    "number": 0,
    "size": 20,
    "totalElements": 3,
    "totalPages": 1
  }
}
```



### Response fields


| Field                | Type    | Description                                                               |
| -------------------- | ------- | ------------------------------------------------------------------------- |
| `data`               | array   | Acrylic paints owned by the caller. Empty when none match.                |
| `data[].id`          | string  | Paint id.                                                                 |
| `data[].name`        | string  | Display name.                                                             |
| `data[].brand`       | string  | Manufacturer brand.                                                       |
| `data[].range`       | string  | Product line within the brand. Maps to `paints.range_name`.               |
| `data[].type`        | string  | Always `acrylic` on this operation.                                       |
| `data[].colorCode`   | string  | Manufacturer color code. Maps to `paints.color_code`.                     |
| `data[].hex`         | string  | Color as `#RRGGBB`.                                                       |
| `data[].finish`      | string  | `matte`, `satin`, `gloss`, or `metallic`.                                 |
| `data[].volumeMl`    | number  | Bottle volume in millilitres. Maps to `paints.volume_ml`.                 |
| `data[].quantity`    | integer | Bottles on hand. `0` or greater.                                          |
| `data[].status`      | string  | `in-stock`, `low`, or `empty`.                                            |
| `data[].acquiredOn`  | string  | Date the bottle was acquired, `YYYY-MM-DD`. Maps to `paints.acquired_on`. |
| `page.number`        | integer | Page index returned.                                                      |
| `page.size`          | integer | Page size applied.                                                        |
| `page.totalElements` | integer | Matching paints across all pages.                                         |
| `page.totalPages`    | integer | Page count for the current filter.                                        |




### Errors


| Status             | When                                           |
| ------------------ | ---------------------------------------------- |
| `401 Unauthorized` | The token is missing or invalid.               |
| `403 Forbidden`    | The token is valid and lacks `inventory:read`. |


---



## Add a miniature

Creates a miniature for the authenticated user.

```http
POST /api/v1/miniatures
```



### Headers


| Header          | Required | Value                                              |
| --------------- | -------- | -------------------------------------------------- |
| `Authorization` | Yes      | `Bearer <token>` with the `inventory:write` scope. |
| `Content-Type`  | Yes      | `application/json`                                 |
| `Accept`        | Yes      | `application/json`                                 |




### Request body

```json
{
  "name": "Primaris Captain",
  "faction": "Ultramarines",
  "gameSystem": "Warhammer 40,000",
  "manufacturer": "Games Workshop",
  "scale": "28mm",
  "status": "unpainted",
  "quantity": 1,
  "notes": "Boxed, still on sprue."
}
```


| Field          | Required | Type    | Constraints                                              |
| -------------- | -------- | ------- | -------------------------------------------------------- |
| `name`         | Yes      | string  | 1–120 characters.                                        |
| `faction`      | Yes      | string  | 1–80 characters.                                         |
| `status`       | Yes      | string  | `unpainted`, `in-progress`, or `completed`.              |
| `gameSystem`   | No       | string  | Maximum 80 characters. Maps to `miniatures.game_system`. |
| `manufacturer` | No       | string  | Maximum 80 characters.                                   |
| `scale`        | No       | string  | Maximum 20 characters.                                   |
| `quantity`     | No       | integer | Defaults to `1`. Minimum `1`.                            |
| `notes`        | No       | string  | Maximum 500 characters.                                  |


`user_id` is copied from the token's `sub` claim. A body that includes `id`, `ownerId`, `createdAt`, or `updatedAt` does not override the values the server generates.

### Example request

```http
POST /api/v1/miniatures HTTP/1.1
Host: api.minisvault.example
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfM2Y4YTEiLCJzY29wZSI6ImludmVudG9yeTp3cml0ZSJ9.signature
Content-Type: application/json
Accept: application/json

{
  "name": "Primaris Captain",
  "faction": "Ultramarines",
  "gameSystem": "Warhammer 40,000",
  "manufacturer": "Games Workshop",
  "scale": "28mm",
  "status": "unpainted",
  "quantity": 1,
  "notes": "Boxed, still on sprue."
}
```



### Response — `201 Created`

```http
Location: /api/v1/miniatures/min_4ab91c
```

```json
{
  "id": "min_4ab91c",
  "name": "Primaris Captain",
  "faction": "Ultramarines",
  "gameSystem": "Warhammer 40,000",
  "manufacturer": "Games Workshop",
  "scale": "28mm",
  "status": "unpainted",
  "quantity": 1,
  "notes": "Boxed, still on sprue.",
  "ownerId": "usr_3f8a1",
  "createdAt": "2026-10-10T16:05:00Z",
  "updatedAt": "2026-10-10T16:05:00Z"
}
```


| Field       | Type   | Description                                                                             |
| ----------- | ------ | --------------------------------------------------------------------------------------- |
| `id`        | string | Miniature id assigned by the server.                                                    |
| `ownerId`   | string | User id from the token. Maps to `miniatures.user_id`.                                   |
| `createdAt` | string | Creation time, UTC. Maps to `miniatures.created_at`.                                    |
| `updatedAt` | string | Last update time, UTC. Equal to `createdAt` on create. Maps to `miniatures.updated_at`. |


The remaining fields echo the stored request values, including defaults.

### Errors


| Status             | When                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `400 Bad Request`  | A required field is missing, `status` is not one of the allowed values, or `quantity` is below `1`. |
| `401 Unauthorized` | The token is missing or invalid.                                                                    |
| `403 Forbidden`    | The token is valid and lacks `inventory:write`.                                                     |


A validation failure returns this body:

```json
{
  "error": "validation_failed",
  "message": "Request body failed validation.",
  "details": [
    {
      "field": "status",
      "message": "Must be one of: unpainted, in-progress, completed."
    }
  ]
}
```


| Field               | Type   | Description                                                         |
| ------------------- | ------ | ------------------------------------------------------------------- |
| `error`             | string | Machine-readable code. Validation failures use `validation_failed`. |
| `message`           | string | Short explanation safe to log.                                      |
| `details`           | array  | One entry per invalid field.                                        |
| `details[].field`   | string | JSON property that failed.                                          |
| `details[].message` | string | Reason that field was rejected.                                     |


---



## Data model

PostgreSQL stores inventory rows. Each paint and each miniature references `users.id`. The API exposes camelCase JSON; the columns below are the stored names.

### `users`

```sql
CREATE TABLE users (
    id          VARCHAR(16) PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);
```



### `paints`

Used by `GET /api/v1/paints`. The list query is restricted to the caller's rows and to `type = 'acrylic'`.

```sql
CREATE TABLE paints (
    id            VARCHAR(16)  PRIMARY KEY,
    user_id       VARCHAR(16)  NOT NULL REFERENCES users(id),
    name          VARCHAR(120) NOT NULL,
    brand         VARCHAR(40)  NOT NULL,
    range_name    VARCHAR(60)  NOT NULL,
    type          VARCHAR(20)  NOT NULL CHECK (type IN ('acrylic', 'enamel', 'oil', 'contrast', 'wash')),
    color_code    VARCHAR(20),
    hex           CHAR(7),
    finish        VARCHAR(20)  NOT NULL CHECK (finish IN ('matte', 'satin', 'gloss', 'metallic')),
    volume_ml     NUMERIC(5,1) NOT NULL,
    quantity      INTEGER      NOT NULL CHECK (quantity >= 0),
    status        VARCHAR(20)  NOT NULL CHECK (status IN ('in-stock', 'low', 'empty')),
    acquired_on   DATE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_paints_user_brand ON paints (user_id, brand);
```


| Column                     | JSON field   | Notes                                       |
| -------------------------- | ------------ | ------------------------------------------- |
| `range_name`               | `range`      |                                             |
| `color_code`               | `colorCode`  |                                             |
| `volume_ml`                | `volumeMl`   |                                             |
| `acquired_on`              | `acquiredOn` |                                             |
| `user_id`                  | —            | Filter only. Omitted from the paint object. |
| `created_at`, `updated_at` | —            | Stored, omitted from the list payload.      |


Filter applied by the handler:

```sql
WHERE user_id = :subject
  AND type = 'acrylic'
  AND lower(brand) = lower(:brand)  -- only when brand is supplied
```



### `miniatures`

Used by `POST /api/v1/miniatures`.

```sql
CREATE TABLE miniatures (
    id            VARCHAR(16)  PRIMARY KEY,
    user_id       VARCHAR(16)  NOT NULL REFERENCES users(id),
    name          VARCHAR(120) NOT NULL,
    faction       VARCHAR(80)  NOT NULL,
    game_system   VARCHAR(80),
    manufacturer  VARCHAR(80),
    scale         VARCHAR(20),
    status        VARCHAR(20)  NOT NULL CHECK (status IN ('unpainted', 'in-progress', 'completed')),
    quantity      INTEGER      NOT NULL DEFAULT 1 CHECK (quantity >= 1),
    notes         VARCHAR(500),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_miniatures_user_status ON miniatures (user_id, status);
```


| Column        | JSON field   |
| ------------- | ------------ |
| `user_id`     | `ownerId`    |
| `game_system` | `gameSystem` |
| `created_at`  | `createdAt`  |
| `updated_at`  | `updatedAt`  |


