# 🛒 Shopping List App

A household shopping list app backed by [Fibery](https://fibery.io), hosted on Netlify with a serverless proxy to handle CORS.

## 🔗 Links

- **App:** https://lambent-souffle-c9a0d9.netlify.app/
- **Manage items:** https://lambent-souffle-c9a0d9.netlify.app/manage

## 🛠️ Stack

| Layer | Tool |
|---|---|
| Database | Fibery (workspace: `dudley-house`) |
| Hosting | Netlify (with serverless function proxy) |
| Source control | GitHub |

## 🗄️ Fibery Structure

**Shopping Items**
`itemName`, `category`, `unitPrice`, `defaultQuantity`, `currentQuantity`, `active`, `shopped`

**Purchased**
`shoppingItem` (relation → Shopping Items), `creationDate` (auto)

## ⚙️ How It Works

1. The shopping list loads all active items from Fibery via the Netlify proxy
2. Ticking an item sets `shopped = true` in Fibery
3. `+` / `−` buttons update `currentQuantity` in Fibery
4. **New Shop** — creates `Purchased` records for all ticked items, then resets `shopped` and `currentQuantity` back to `defaultQuantity`
5. The **Manage** page lets you add, edit, deactivate, or reactivate items

## 📦 Current Data

- 62 items across 4 categories: Freezer, Cupboard, Household, Weekly
- Prices are estimates — to be updated as actual shopping is done
- Estimated monthly total: ~£218

## ⚠️ Known Issues / TODO

- [ ] **Fix weekly ×4 monthly total** — `catTotal` in `index.html` needs to multiply Weekly category by 4; update chip/header to use `monthlyTotal`
- [x] **Move API token to environment variable** — token is currently hardcoded in `fibery.js`; add `FIBERY_TOKEN` to Netlify site settings, update code to use `process.env.FIBERY_TOKEN`, then regenerate the token in Fibery
- [ ] **Add Date Purchased field** — add field to `Purchased` table in Fibery, then update code to store the tick timestamp and pass it through on New Shop
