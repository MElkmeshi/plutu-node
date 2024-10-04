# Plutu Node.js TypeScript SDK

A comprehensive TypeScript SDK for interacting with the Plutu payment gateway. This SDK provides easy-to-use services for various Plutu payment gateways, including Adfali, Sadad, Local Bank Cards, Tlync, and MPGS. It ensures structured response handling, robust validation, and seamless integration into your Node.js applications.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [PlutuAdfali](#plutuadfali)
  - [PlutuSadad](#plutusadad)
  - [PlutuLocalBankCards](#plutulocalbankcards)
  - [PlutuTlync](#plututlync)
  - [PlutuMpgs](#plutumpgs)
- [Express Server Setup](#express-server-setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multiple Gateways Support:** Interact with various Plutu payment gateways such as Adfali, Sadad, Local Bank Cards, Tlync, and MPGS.
- **Structured Responses:** Handle API responses consistently with structured response classes.
- **Robust Validation:** Validate input parameters to prevent invalid API calls.
- **Error Handling:** Gracefully handle API-level errors without relying on exceptions.
- **Easy Integration:** Simple and intuitive API for seamless integration into your Node.js applications.
- **Express Integration:** Example setup for handling callbacks using Express.

## Prerequisites

- **Node.js:** Version 14.x or higher.
- **npm:** Version 6.x or higher.

## Installation

Install the SDK via npm:

```bash
npm install plutu-node
```

## Configuration

Before using the SDK, set up the necessary environment variables. You can use a `.env` file for local development.

### Environment Variables

Create a `.env` file in your project's root directory and add the following variables:

```env
PLUTU_API_KEY=your_plutu_api_key
PLUTU_ACCESS_TOKEN=your_plutu_access_token
PLUTU_SECRET_KEY=your_plutu_secret_key
```

- **PLUTU_API_KEY:** Your Plutu API key.
- **PLUTU_ACCESS_TOKEN:** Your Plutu access token.
- **PLUTU_SECRET_KEY:** Your Plutu secret key for hashing.

## Usage

Import the necessary services from the SDK and utilize them in your application. Below are examples demonstrating how to use each service.

### PlutuAdfali

#### Example: Verifying and Confirming a Payment

```typescript
import { PlutuAdfali } from "plutu-node";
import dotenv from "dotenv";

dotenv.config();

async function testPlutuAdfali() {
  const mobileNumber = "0913632323";
  const amount = 10;
  const code = "1111";
  const invoiceNo = "1234";
  
  try {
    // Step 1: Verify Payment
    const verifyResponse = await PlutuAdfali.verify(mobileNumber, amount);
    
    if (verifyResponse.getOriginalResponse().isSuccessful()) {
      const processId = verifyResponse.getProcessId()!;
      console.log(`Process ID: ${processId}`);
      
      // Step 2: Confirm Payment
      const confirmResponse = await PlutuAdfali.confirm(
        processId,
        code,
        amount,
        invoiceNo
      );

      if (confirmResponse.getOriginalResponse().isSuccessful()) {
        console.log("Payment confirmed successfully");
      } else if (confirmResponse.getOriginalResponse().hasError()) {
        const errorCode = confirmResponse.getOriginalResponse().getErrorCode();
        const errorMessage = confirmResponse.getOriginalResponse().getErrorMessage();
        console.error(`Error: ${errorCode} - ${errorMessage}`);
      }
    } else if (verifyResponse.getOriginalResponse().hasError()) {
      const errorCode = verifyResponse.getOriginalResponse().getErrorCode();
      const errorMessage = verifyResponse.getOriginalResponse().getErrorMessage();
      console.error(`Verify Error ${errorCode}: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error("Unexpected Error:", error);
  }
}

testPlutuAdfali();
```

### PlutuSadad

#### Example: Verifying and Confirming a Payment

```typescript
import { PlutuSadad } from "plutu-node";
import dotenv from "dotenv";

dotenv.config();

async function testPlutuSadad() {
  const mobileNumber = "0913632323";
  const birthYear = 1990;
  const amount = 100.0;
  const code = "111111";
  const invoiceNo = "INV789";

  try {
    // Step 1: Verify Payment
    const verifyResponse = await PlutuSadad.verify(
      mobileNumber,
      birthYear,
      amount
    );

    if (verifyResponse.getOriginalResponse().isSuccessful()) {
      const receivedProcessId = verifyResponse.getProcessId()!;
      console.log(`Process ID: ${receivedProcessId}`);

      // Step 2: Confirm Payment
      const confirmResponse = await PlutuSadad.confirm(
        receivedProcessId,
        code,
        amount,
        invoiceNo
      );

      if (confirmResponse.getOriginalResponse().isSuccessful()) {
        console.log("Payment confirmed successfully");
      } else if (confirmResponse.getOriginalResponse().hasError()) {
        const errorCode = confirmResponse.getOriginalResponse().getErrorCode();
        const errorMessage = confirmResponse.getOriginalResponse().getErrorMessage();
        console.error(`Confirm Error ${errorCode}: ${errorMessage}`);
      }
    } else if (verifyResponse.getOriginalResponse().hasError()) {
      const errorCode = verifyResponse.getOriginalResponse().getErrorCode();
      const errorMessage = verifyResponse.getOriginalResponse().getErrorMessage();
      console.error(`Verify Error ${errorCode}: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error("Unexpected Error:", error);
  }
}

testPlutuSadad();
```

### PlutuLocalBankCards

#### Example: Confirming a Payment

```typescript
import { PlutuLocalBankCards } from "plutu-node";
import dotenv from "dotenv";

dotenv.config();

const returnUrl = `${process.env.APP_URL}/payment/return`;

async function testPlutuLocalBankCards() {
  const amount = 100.0;
  const invoiceNo = "INV123";

  try {
    const confirmResponse = await PlutuLocalBankCards.confirm(
      amount,
      invoiceNo,
      returnUrl,
      "en"
    );
    
    console.log(confirmResponse);
    
    if (confirmResponse.getOriginalResponse().isSuccessful()) {
      console.log("Payment confirmed successfully");
      console.log(`Redirect URL: ${confirmResponse.getRedirectUrl()}`);
      // Redirect the user to the provided URL
    } else {
      console.log(confirmResponse.getOriginalResponse().getErrorMessage());
    }
  } catch (error: any) {
    console.error("Unexpected Error:", error);
  }
}

testPlutuLocalBankCards();
```

### PlutuTlync

#### Example: Confirming a Payment

```typescript
import { PlutuTlync } from "plutu-node";
import dotenv from "dotenv";

dotenv.config();

const returnUrl = `${process.env.APP_URL}/payment/return`;

async function testPlutuTlync() {
  const mobileNumber = "0910441322";
  const amount = 150.0;
  const invoiceNo = "INV123";
  const callbackUrl = "https://webhook.site/your-webhook-url";

  try {
    const confirmResponse = await PlutuTlync.confirm(
      mobileNumber,
      amount,
      invoiceNo,
      returnUrl,
      callbackUrl,
      "en"
    );
    
    if (confirmResponse.getOriginalResponse().isSuccessful()) {
      console.log("Payment confirmed successfully");
      console.log("Redirect URL:", confirmResponse.getRedirectUrl());
      // Redirect the user to the provided URL
    } else {
      console.log(confirmResponse.getOriginalResponse().getErrorMessage());
    }
  } catch (error: any) {
    console.error("Unexpected Error:", error);
  }
}

testPlutuTlync();
```

### PlutuMpgs

#### Example: Confirming a Payment

```typescript
import { PlutuMpgs } from "plutu-node";
import dotenv from "dotenv";

dotenv.config();

const returnUrl = `${process.env.APP_URL}/payment/return`;

async function testPlutuMpgs() {
  const amount = 200.0;
  const invoiceNo = "INV456";

  try {
    const confirmResponse = await PlutuMpgs.confirm(
      amount,
      invoiceNo,
      returnUrl,
      "ar"
    );
    
    if (confirmResponse.getOriginalResponse().isSuccessful()) {
      console.log("Payment confirmed successfully");
      console.log("Redirect URL:", confirmResponse.getRedirectUrl());
      // Redirect the user to the provided URL
    } else {
      console.log(confirmResponse.getOriginalResponse().getErrorMessage());
    }
  } catch (error: any) {
    console.error("Unexpected Error:", error);
  }
}

testPlutuMpgs();
```

## Express Server Setup

To handle callbacks from the Plutu payment gateways, you can set up an Express server with appropriate routes.

### Example: Setting Up Callback Routes

```typescript
import {
  PlutuAdfali,
  PlutuSadad,
  PlutuLocalBankCards,
  PlutuTlync,
  PlutuMpgs,
} from "plutu-node";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const returnUrl = `${process.env.APP_URL}/payment/return`;

// Callback route for PlutuLocalBankCards
app.get("/payment/return", async (req, res) => {
  try {
    const check = await PlutuLocalBankCards.callbackHandler(req.query);
    res.send(check);
  } catch (e) {
    res.status(400).send({
      error: "Invalid callback hash",
    });
  }
});

// Webhook route for PlutuTlync
app.post("/payment/webhook", async (req, res) => {
  try {
    const check = await PlutuTlync.callbackHandler(req.body);
    res.send(check);
  } catch (e) {
    res.status(400).send({
      error: "Invalid callback hash",
    });
  }
});

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
```

### Explanation

- **`/payment/return`:** Handles GET requests from `PlutuLocalBankCards` , `PlutuTlync` , and `PlutuMpgs` after payment.
- **`/payment/webhook`:** Handles POST requests from `PlutuTlync` as webhooks.

Ensure your environment variables are correctly set in the `.env` file to match the `APP_URL` and Plutu credentials.

## Express Server Setup

To handle callbacks from the Plutu payment gateways, set up an Express server with appropriate routes.

### Example: Setting Up Callback Routes

```typescript
import {
  PlutuAdfali,
  PlutuSadad,
  PlutuLocalBankCards,
  PlutuTlync,
  PlutuMpgs,
} from "plutu-node";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const returnUrl = `${process.env.APP_URL}/payment/return`;

// Callback route for PlutuLocalBankCards, PlutuTlync, and PlutuMpgs
app.get("/payment/return", async (req, res) => {
  try {
    const check = await PlutuLocalBankCards.callbackHandler(req.query);
    res.send(check);
  } catch (e) {
    res.status(400).send({
      error: "Invalid callback hash",
    });
  }
});

// Webhook route for PlutuTlync
app.post("/payment/webhook", async (req, res) => {
  try {
    const check = await PlutuTlync.callbackHandler(req.body);
    res.send(check);
  } catch (e) {
    res.status(400).send({
      error: "Invalid callback hash",
    });
  }
});

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
```

### Explanation

- **`/payment/return`:** Handles GET requests from `PlutuLocalBankCards` , `PlutuTlync` , and `PlutuMpgs` after payment.
- **`/payment/webhook`:** Handles POST requests from `PlutuTlync` as webhooks.

Ensure your environment variables are correctly set in the `.env` file to match the `APP_URL` and Plutu credentials.

## Environment Variables

The SDK relies on the following environment variables for configuration. Ensure these are set in your `.env` file or your deployment environment.

```env
PLUTU_API_KEY=your_plutu_api_key
PLUTU_ACCESS_TOKEN=your_plutu_access_token
PLUTU_SECRET_KEY=your_plutu_secret_key
```

- **PLUTU_API_KEY:** Your Plutu API key.
- **PLUTU_ACCESS_TOKEN:** Your Plutu access token.
- **PLUTU_SECRET_KEY:** Your Plutu secret key used for hashing callbacks.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository:** Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/melkmeshi/plutu-node.git
   cd plutu-node
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:** Implement your feature or bug fix.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add feature XYZ"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:** Go to the original repository and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Additional Resources

- [Plutu API Documentation](https://docs.plutu.com) 
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/melkmeshi/plutu-node/issues) or contact the maintainer at elkmeshi2002@gmail.com.

---

**Happy Coding!**