# Mailscheduler

This repository contains a Node.js application for sending periodic emails using a cron job. The application reads HTML email templates from a directory, fills in dynamic content, and sends the emails at specified intervals. It is designed to be run in a Docker container.

## Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- [Docker](https://www.docker.com/)
- Node.js (if you want to run the application locally for development)

## Getting Started

To get started, follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone <repository-url>
   ```

2. Change to the project directory:

   ```shell
   cd mailscheduler
   ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```
   CRON_SCHEDULE=0 0 * * *
   SMTP_HOST=<SMTP_HOST>
   SMTP_PORT=<SMTP_PORT>
   SMTP_USER=<SMTP_USER>
   SMTP_PASS=<SMTP_PASS>
   EMAIL_FROM=<FROM_EMAIL>
   EMAIL_TO=<TO_EMAIL>
   EMAIL_SUBJECT=<EMAIL_SUBJECT>
   ```

   Replace `<SMTP_HOST>`, `<SMTP_PORT>`, `<SMTP_USER>`, `<SMTP_PASS>`, `<FROM_EMAIL>`, `<TO_EMAIL>`, and `<EMAIL_SUBJECT>` with your email server and email configuration.

4. Create a `templates` directory in the project root and place your HTML email templates (with a `.html` file extension) in this directory. You can use placeholders that will be replaced with dynamic content when emails are sent:

    * `{{timestamp}}`: This placeholder will be replaced with the current date and time in the format `DD.MM.YYYY 18:00:00``

     * `{{id}}`: This placeholder will be replaced with a unique identifier generated based on the current date and time in the format `YYMMDDmmss``

5. Build the Docker container:

   ```shell
   docker build -t mailscheduler .
   ```

6. Run the Docker container:

   ```shell
   docker run -d mailscheduler
   ```

The application will now send emails based on the specified cron schedule.

## Application Structure

- `index.js`: The main application file that schedules and sends emails.
- `Dockerfile`: The Docker configuration file to build the container.
- `templates/`: A directory for storing HTML email templates.
- `.env`: Environment variables configuration file.

## Configuration

You can customize the behavior of the application by modifying the environment variables in the `.env` file:

- `CRON_SCHEDULE`: The cron schedule for sending emails.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: SMTP server configuration for sending emails.
- `EMAIL_FROM`: The sender's email address.
- `EMAIL_TO`: The recipient's email address.
- `EMAIL_SUBJECT`: The subject of the email.

## Adding Email Templates

To add email templates, place HTML files in the `templates/` directory. The application will randomly select a template from this directory when sending emails.

## Development

If you want to run the application locally for development, follow these steps:

1. Install Node.js dependencies:

   ```shell
   npm install
   ```

2. Create a `.env` file and configure the environment variables as described above.

3. Run the application:

   ```shell
   node index.js
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.