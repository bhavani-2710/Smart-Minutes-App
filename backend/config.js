import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "smart-minutes-58648",
      clientEmail:
        "firebase-adminsdk-fbsvc@smart-minutes-58648.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDmixb8olJwX3xv\nUOK2Z4PxeRjTeAcX3bfmC0ovLWbOrfwq2mqX18hBV5Zgbwu3bZpCpsSoz1MyMlwx\nESbMPfu0oAk0WVNMBFIs0jtYIKw91+tGmqhsCj8adqKPk2oImxDQ1M6SnJJpwrkr\nHfHhz1NfiPnkoxz7P2Bpqin82faU+4tSu8BM/cDpxtVMiA/i/F4OZEd1oVxQNQwW\ncRw6dYaMr/nsTKtUN6nSPUX2Vgzfki615Q7ni54sVOmY4cikEsXmNoujvpNWoJy9\nnAKdWUw213n86MtpkwmREgasgTjC/FTSva1kGFlMwX7IBc0aZMt8DfTv43yhFn9Y\nPN7zBBQzAgMBAAECggEAB8godvpIW8MFXBaNXd3W+NF/HTLp07boDGD+LeMo8LoJ\nDy3p4i/mR7pb+Our/Wg63ZwWeveV6ysDAfmpEcTX2GF8iLf+f/biCoxFdN8+y87x\ngfkaIpzNQ33p/9Gt3GuA4PkF81ygnpGe7CMpyoGpN/TThpGw7+l+6MzVzP390kqD\noKMvdtCKYKPUL5dyUOr3RJpgTyqP7VqKFS+jckbVcLmJmfc5vPxSsowBcpDMtnJe\n4LWOVDImxJCrrG3V9EwsHJkfHAg9qxpdqWA1oV8wFeqxXWbgqdnTR3WZ4XCnkL/u\nr9IIDHd0lPJfa4OcVT1l5zxjGBxzytvwJPFZyqmNHQKBgQD7x0hju59PJ3uUhEBY\n4xgT3pMdxVqh28pK4avuSC4fT664efI0CkQ2R8+Mb3/BQ/pKdiftNFB30NRBLRWe\neaZ+LylAe2INudgMBBAlqkRlFlNuGGdqYpaNah4tr+YH4IaRxcDoa8He0mX2QU5O\nq+g8nSZLGe0Udms/1X2/DLy3PwKBgQDqaKij/RZ7CNebf+YhxTTeq+n594nRZaWW\nl/84BjCF0ja9dqe5+qdmUyC2FdfJbcHSuhXtBEdJJVnc4+X3HbyQdGMs0f2zpmJy\neUHqOqOiM5P25adi/Mjbb9peS64Sk3qXUQbkHoaw5hAdvuWlkEBJv7juRGpVp0bR\noCkF7/W6DQKBgF5ej29yP3/3mIZOG6A1Xiz0W8fo1NOeAfCXLU4el8r8nsxeSL3g\nqzh9KfnFQOk7hXCrYMOzvAVsrGHReCzyA8l/+8JDfLkQUz4Nt8+mRgRtnc/CLeDe\nGvfeMnmFWH7TVR0GNgvnd78AtV7bk3JBVMaDUHsNuKLWz9QZPQyCxakZAoGAZN/z\nKtcgVIQinOV2eLPwI58hypOPOJCgqOTyTP7E5OHo8rHcTjmiznMZkaJmwWU9Ut0H\n0H7V2pF7UYa1kRm36wZbI4+euS/yD8dE6XKgto2xsD92QC/+lAhXldrFp3LV/8Y7\ny/GjDv+Ckfpzw0MHl3UtNUQ16nRZEp706HwyaAUCgYAE3HmFj23HQIVkXPj0ecaD\nPbZuyfXxfON/yj6eGwGqKKHhZFaafUuvqVlEGzSwJD1YHvK4dU/i+zi31l6Rmpez\nWRdyumDDUNxe499hZTVEuTx4V6pdWhu9B56UlUGywWikq9f4nIiMnWUV99nc8KK8\nlT+/9b15J3F7+WyqzHQrKw==\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n"
        ),
    }),
  });
}
const firestore = admin.firestore();
const fieldValues = admin.firestore.FieldValue;

export {firestore, fieldValues};
