# PastelFlow Image Editor

A cute, workflow-styled image editor powered by Gemini 2.5 Flash Image.

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your Google Gemini API Key:
    ```env
    API_KEY=your_actual_api_key_here
    ```

## Local Development

Run the development server:

```bash
npm run dev
```

## Deploy to Vercel

1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and create a new project.
3.  Import your GitHub repository.
4.  In the Vercel project settings, add an Environment Variable:
    *   **Key**: `API_KEY`
    *   **Value**: Your Google Gemini API Key
5.  Deploy!
