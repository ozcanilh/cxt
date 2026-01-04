const axios = require('axios');
const fs = require('fs');
const path = require('path');

const reportPath =
  process.env.MOCHAWESOME_REPORT_PATH ||
  path.resolve(__dirname, '../cypress/reports/html/index.json');
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

// Get environment information
const runBy = process.env.GITHUB_ACTOR || process.env.USER || 'Unknown';
const browser = process.env.BROWSER || 'chrome';
const viewport = process.env.VIEWPORT || '1280x720';

if (!slackWebhookUrl) {
  console.log('⚠️  SLACK_WEBHOOK_URL not found. Skipping Slack notification.');
  process.exit(0);
}

if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  const totalTests = report.stats.tests;
  const passTests = report.stats.passes;
  const failTests = report.stats.failures;
  const skipTests = report.stats.pending;
  const passPercent = Math.floor(report.stats.passPercent) + '%';
  const duration = (report.stats.duration / 1000 / 60).toFixed(2) + ' min';
  const messageEmoji = failTests > 0 ? ':warning:' : ':white_check_mark:';
  const statusText = failTests > 0 ? 'FAILED' : 'PASSED';

  const message = {
    text:
      `*SauceDemo Cypress Test Results ${messageEmoji}*\n` +
      `*Status:* ${statusText} | ` +
      `*Total:* ${totalTests} | ` +
      `*Passed:* ${passTests} | ` +
      `*Failed:* ${failTests} | ` +
      `*Skipped:* ${skipTests} | ` +
      `*Pass %:* ${passPercent} | ` +
      `*Duration:* ${duration}\n` +
      `*Browser:* ${browser} | ` +
      `*Viewport:* ${viewport} | ` +
      `*Run By:* ${runBy}`,
    mrkdwn: true,
  };

  const body = {
    channel: '#engineering-tests-results',
    username: 'SauceDemo Test Bot',
    text: message.text,
    icon_emoji: ':robot_face:',
  };

  axios
    .post(slackWebhookUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      console.log('✅ Message sent to Slack successfully.');
    })
    .catch((error) => {
      console.error('❌ Error sending message to Slack:', error.message);
      process.exit(1);
    });
} else {
  console.error('❌ Mochawesome report not found at:', reportPath);
  process.exit(1);
}

