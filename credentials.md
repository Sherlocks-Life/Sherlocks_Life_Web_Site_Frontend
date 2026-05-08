# EmailJS Credentials & Setup Guide

This file documents how to set up EmailJS so that the Contact Form sends emails
directly to `akhilthadaka97@gmail.com` without any backend server.

---

## Step 1: Create a Free EmailJS Account

1. Go to **[https://www.emailjs.com](https://www.emailjs.com)** and sign up for a free account.
2. The free tier allows **200 emails/month** — more than enough to start.

---

## Step 2: Add an Email Service (Gmail)

1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**.
2. Choose **Gmail**.
3. Click **Connect Account** and authorize with `akhilthadaka97@gmail.com`.
4. Give it a name (e.g., `Sherlocks Contact`) and click **Create Service**.
5. Copy the **Service ID** — it looks like: `service_abc123`

---

## Step 3: Create an Email Template

1. In the dashboard, go to **Email Templates** → **Create New Template**.
2. Set up the template like this:

   | Field        | Value                                      |
   |--------------|--------------------------------------------|
   | **To Email** | `akhilthadaka97@gmail.com`                 |
   | **Subject**  | `New Contact from Sherlock's Life – {{from_name}}` |
   | **Reply To** | `{{reply_to}}`                             |

3. **Template Body** (paste this):

```
Hello Akhil,

You have received a new message from the Sherlock's Life Contact Form.

👤 Name:    {{from_name}}
📧 Email:   {{reply_to}}

📝 Message:
{{message}}

---
Sent via Sherlock's Life Contact Form
```

4. Click **Save** and then copy the **Template ID** — it looks like: `template_xyz789`

---

## Step 4: Get Your Public Key

1. In the dashboard, go to **Account** → **General** tab.
2. Copy your **Public Key** — it looks like: `AbCdEfGhIjKlMnOpQ`

---

## Step 5: Update the Code

Open the file:
```
src/components/ui/ContactModal.jsx
```

Find these 3 lines near the top and replace the placeholder values:

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← Paste your Service ID here
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← Paste your Template ID here
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← Paste your Public Key here
```

**Example after filling in:**
```js
const EMAILJS_SERVICE_ID  = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY  = 'AbCdEfGhIjKlMnOpQ';
```

---

## Template Variable Mapping

The form inputs use `name` attributes that match the EmailJS template variables:

| Input Field | `name` Attribute | Template Variable |
|-------------|-----------------|-------------------|
| Name        | `from_name`     | `{{from_name}}`   |
| Email       | `reply_to`      | `{{reply_to}}`    |
| Message     | `message`       | `{{message}}`     |

> [!IMPORTANT]
> These `name` attributes in the HTML form **must exactly match** the `{{variable}}` names in your EmailJS template. Do not rename them.

---

## Security Note

> [!WARNING]
> Your EmailJS **Public Key** is safe to use in frontend code — it is designed to be public.
> However, never put your EmailJS **Private Key** or any backend secrets in the frontend code.
> If you want to restrict which domains can send emails, configure the **Allowed Origins** in your EmailJS account dashboard.
